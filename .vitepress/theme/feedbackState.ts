import { ref, computed } from 'vue'
import { supabase } from './supabaseClient'
import type { User } from '@supabase/supabase-js'

export interface FeedbackItem {
  id: string
  user_id: string
  email: string
  full_name: string
  avatar_url?: string | null
  rating: number
  comments?: string | null
  created_at: string
  updated_at: string
}

export type SortMode = 'name' | 'date' | 'rating'

export const currentUser = ref<User | null>(null)
export const feedbackList = ref<FeedbackItem[]>([])
export const isAuthLoading = ref<boolean>(false)
export const isDataLoading = ref<boolean>(false)
export const isSubmitting = ref<boolean>(false)
export const isDeleting = ref<boolean>(false)

export const ratingInput = ref<number>(5)
export const commentsInput = ref<string>('')
export const isEditing = ref<boolean>(false)
export const searchQuery = ref<string>('')
export const sortOption = ref<SortMode>('date')
export const statusMessage = ref<{ text: string; type: 'success' | 'error' } | null>(null)

let hasInitialized = false
let realtimeChannel: any = null

export const userFeedback = computed(() => {
  if (!currentUser.value) return null
  return feedbackList.value.find(item => item.user_id === currentUser.value?.id) || null
})

export const filteredFeedbackList = computed(() => {
  let list = [...feedbackList.value]

  // Filter
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase()
    list = list.filter(item => 
      item.full_name?.toLowerCase().includes(q) ||
      item.email?.toLowerCase().includes(q) ||
      item.comments?.toLowerCase().includes(q)
    )
  }

  // Sort
  if (sortOption.value === 'name') {
    list.sort((a, b) => (a.full_name || a.email).localeCompare(b.full_name || b.email))
  } else if (sortOption.value === 'rating') {
    list.sort((a, b) => b.rating - a.rating || new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
  } else {
    // date: newest first
    list.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
  }

  return list
})

export async function initFeedbackState() {
  if (typeof window === 'undefined') return
  if (hasInitialized) return
  hasInitialized = true

  // Get current session
  try {
    isAuthLoading.value = true
    const { data: { session } } = await supabase.auth.getSession()
    currentUser.value = session?.user || null

    if (currentUser.value) {
      syncInputsFromExisting()
    }
  } catch (err) {
    console.error('Error fetching initial auth session:', err)
  } finally {
    isAuthLoading.value = false
  }

  // Auth listener
  supabase.auth.onAuthStateChange((_event, session) => {
    currentUser.value = session?.user || null
    syncInputsFromExisting()
  })

  // Fetch initial feedback
  await fetchFeedback()

  // Subscribe to Realtime changes
  setupRealtimeSubscription()
}

export function syncInputsFromExisting() {
  const existing = userFeedback.value
  if (existing) {
    ratingInput.value = existing.rating
    commentsInput.value = existing.comments || ''
  } else {
    ratingInput.value = 5
    commentsInput.value = ''
    isEditing.value = false
  }
}

export async function fetchFeedback() {
  try {
    isDataLoading.value = true
    const { data, error } = await supabase
      .from('presentation_feedback')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    feedbackList.value = data || []
    syncInputsFromExisting()
  } catch (err: any) {
    console.error('Error fetching feedback:', err)
  } finally {
    isDataLoading.value = false
  }
}

function setupRealtimeSubscription() {
  if (realtimeChannel) return

  realtimeChannel = supabase
    .channel('public:presentation_feedback')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'presentation_feedback' },
      (payload) => {
        if (payload.eventType === 'INSERT') {
          const newItem = payload.new as FeedbackItem
          if (!feedbackList.value.some(f => f.id === newItem.id)) {
            feedbackList.value.unshift(newItem)
          }
        } else if (payload.eventType === 'UPDATE') {
          const updatedItem = payload.new as FeedbackItem
          const idx = feedbackList.value.findIndex(f => f.id === updatedItem.id)
          if (idx !== -1) {
            feedbackList.value[idx] = updatedItem
          }
        } else if (payload.eventType === 'DELETE') {
          const oldItem = payload.old as FeedbackItem
          feedbackList.value = feedbackList.value.filter(f => f.id !== oldItem.id)
        }
      }
    )
    .subscribe()
}

export async function loginWithGoogle() {
  if (typeof window === 'undefined') return
  try {
    statusMessage.value = null
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin + '/resources'
      }
    })
    if (error) throw error
  } catch (err: any) {
    console.error('Google login error:', err)
    statusMessage.value = { text: err.message || 'Failed to login with Google', type: 'error' }
  }
}

export async function logout() {
  try {
    statusMessage.value = null
    await supabase.auth.signOut()
    currentUser.value = null
    isEditing.value = false
    ratingInput.value = 5
    commentsInput.value = ''
    statusMessage.value = { text: 'Signed out successfully.', type: 'success' }
  } catch (err: any) {
    console.error('Logout error:', err)
    statusMessage.value = { text: err.message || 'Error signing out', type: 'error' }
  }
}

export async function submitFeedback() {
  if (!currentUser.value) {
    statusMessage.value = { text: 'You must be logged in with Google to submit feedback.', type: 'error' }
    return
  }

  const user = currentUser.value
  const fullName = user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0] || 'Anonymous'
  const avatarUrl = user.user_metadata?.avatar_url || user.user_metadata?.picture || null
  const email = user.email || ''

  try {
    isSubmitting.value = true
    statusMessage.value = null

    const existing = userFeedback.value
    if (existing) {
      // UPDATE
      const { data, error } = await supabase
        .from('presentation_feedback')
        .update({
          rating: ratingInput.value,
          comments: commentsInput.value.trim(),
          full_name: fullName,
          avatar_url: avatarUrl,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id)
        .select()
        .single()

      if (error) throw error
      
      const idx = feedbackList.value.findIndex(f => f.id === existing.id)
      if (idx !== -1 && data) {
        feedbackList.value[idx] = data
      }
      isEditing.value = false
      statusMessage.value = { text: '✨ Your feedback has been updated successfully in Supabase!', type: 'success' }
    } else {
      // INSERT
      const { data, error } = await supabase
        .from('presentation_feedback')
        .insert({
          user_id: user.id,
          email: email,
          full_name: fullName,
          avatar_url: avatarUrl,
          rating: ratingInput.value,
          comments: commentsInput.value.trim(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select()
        .single()

      if (error) throw error

      if (data) {
        feedbackList.value.unshift(data)
      }
      isEditing.value = false
      statusMessage.value = { text: '🎉 Your review has been saved to the live database!', type: 'success' }
    }
  } catch (err: any) {
    console.error('Error saving feedback:', err)
    statusMessage.value = { text: err.message || 'Failed to save feedback to database.', type: 'error' }
  } finally {
    isSubmitting.value = false
  }
}

export async function deleteFeedback() {
  if (!currentUser.value || !userFeedback.value) return
  if (!window.confirm('Are you sure you want to permanently delete your feedback from the database?')) {
    return
  }

  try {
    isDeleting.value = true
    statusMessage.value = null
    const existing = userFeedback.value

    const { error } = await supabase
      .from('presentation_feedback')
      .delete()
      .eq('user_id', currentUser.value.id)

    if (error) throw error

    feedbackList.value = feedbackList.value.filter(f => f.id !== existing.id)
    ratingInput.value = 5
    commentsInput.value = ''
    isEditing.value = false
    statusMessage.value = { text: '🗑️ Your review has been deleted from Supabase.', type: 'success' }
  } catch (err: any) {
    console.error('Error deleting feedback:', err)
    statusMessage.value = { text: err.message || 'Failed to delete review.', type: 'error' }
  } finally {
    isDeleting.value = false
  }
}

export function formatDateTime(isoString: string): string {
  if (!isoString) return ''
  try {
    const d = new Date(isoString)
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
  } catch {
    return isoString
  }
}
