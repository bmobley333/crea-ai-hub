<template>
  <Teleport to="body">
    <div v-if="isOpen" class="fb-modal-overlay" @click.self="handleClose">
      <div class="fb-modal-container" role="dialog" aria-modal="true">
        <!-- Header -->
        <div class="fb-modal-header">
          <div class="fb-modal-title-box">
            <span class="fb-modal-badge">LIVE PERSISTENT DATABASE</span>
            <h3 class="fb-modal-title">🔐 Google OAuth 2.0 & Supabase Database Demo</h3>
          </div>
          <button type="button" class="fb-close-btn" @click="handleClose" title="Close modal (Esc)">
            ✕
          </button>
        </div>

        <!-- Body -->
        <div class="fb-modal-body">
          <!-- Architecture Banner -->
          <div class="fb-arch-banner">
            <div class="fb-arch-icon">⚡</div>
            <div class="fb-arch-text">
              <h4>Real-Time Postgres DB & Secure Google OAuth 2.0</h4>
              <p>
                This live demonstration connects directly to a cloud PostgreSQL database hosted on Supabase with Row Level Security (RLS). 
                <strong>Read access is open to all attendees</strong>, while <strong>submitting, editing, or deleting entries requires authenticated Google OAuth identity</strong>.
              </p>
            </div>
          </div>

          <!-- Status / Error Notification -->
          <div v-if="statusMessage" :class="['fb-status-alert', statusMessage.type]">
            <span>{{ statusMessage.text }}</span>
            <button type="button" class="fb-status-close" @click="statusMessage = null">✕</button>
          </div>

          <!-- Auth Bar -->
          <div class="fb-auth-box">
            <div v-if="!currentUser" class="fb-unauth-row">
              <div class="fb-auth-info">
                <span class="fb-lock-icon">🔒</span>
                <div>
                  <strong>Guest Mode (Read-Only)</strong>
                  <p>Sign in with your Google account to submit a rating and test database mutations.</p>
                </div>
              </div>
              <button 
                type="button" 
                class="google-signin-btn" 
                @click="loginWithGoogle"
                :disabled="isAuthLoading"
              >
                <svg class="google-icon" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
                <span>Sign in with Google</span>
              </button>
            </div>

            <div v-else class="fb-auth-user-row">
              <div class="fb-user-badge">
                <img 
                  v-if="userAvatar" 
                  :src="userAvatar" 
                  :alt="userName" 
                  class="fb-user-avatar"
                  referrerpolicy="no-referrer"
                />
                <div v-else class="fb-user-avatar-fallback">{{ userName.charAt(0).toUpperCase() }}</div>
                <div class="fb-user-details">
                  <div class="fb-user-name-row">
                    <span class="fb-user-name">{{ userName }}</span>
                    <span class="fb-auth-tag">Authenticated</span>
                  </div>
                  <span class="fb-user-email">{{ userEmail }}</span>
                </div>
              </div>
              <button type="button" class="fb-signout-btn" @click="logout" title="Sign out of Google">
                🚪 Sign Out
              </button>
            </div>
          </div>

          <!-- Active User Submission / Rating Form (When Logged In) -->
          <div v-if="currentUser" class="fb-action-section">
            <!-- Case A: User has already submitted and is NOT editing -->
            <div v-if="userFeedback && !isEditing" class="fb-user-existing-card">
              <div class="fb-existing-header">
                <div class="fb-existing-title">
                  <span class="fb-check-badge">✅ YOUR REVIEW</span>
                  <h4>You rated this presentation {{ userFeedback.rating }} / 5 Stars</h4>
                </div>
                <div class="fb-existing-actions">
                  <button type="button" class="fb-edit-btn" @click="startEditing">
                    ✏️ Edit Review
                  </button>
                  <button type="button" class="fb-delete-btn" @click="deleteFeedback" :disabled="isDeleting">
                    🗑️ {{ isDeleting ? 'Deleting...' : 'Delete' }}
                  </button>
                </div>
              </div>

              <div class="fb-existing-stars">
                <span v-for="star in 5" :key="star" class="fb-star-static" :class="{ filled: star <= userFeedback.rating }">
                  ★
                </span>
                <span class="fb-star-text">{{ getRatingLabel(userFeedback.rating) }}</span>
              </div>

              <p v-if="userFeedback.comments" class="fb-existing-comment">
                "{{ userFeedback.comments }}"
              </p>
              <div class="fb-existing-timestamp">
                <span>🕒 Last Saved: {{ formatDateTime(userFeedback.updated_at || userFeedback.created_at) }}</span>
              </div>
            </div>

            <!-- Case B: Form to Create or Edit Feedback -->
            <div v-else class="fb-form-card">
              <div class="fb-form-header">
                <h4>{{ userFeedback ? '✏️ Edit Your Presentation Review' : '⭐ Rate & Review: "Taking AI to the Next Level"' }}</h4>
                <span class="fb-form-author">Presenter: Blake Mobley (2026 CREA IT Conference)</span>
              </div>

              <!-- Interactive Star Selector -->
              <div class="fb-rating-group">
                <label class="fb-field-label">Your Rating (1 to 5 Stars):</label>
                <div class="fb-star-picker">
                  <div class="fb-stars-interactive">
                    <button
                      v-for="star in 5"
                      :key="star"
                      type="button"
                      class="fb-star-btn"
                      :class="{ active: star <= (hoverRating || ratingInput) }"
                      @mouseenter="hoverRating = star"
                      @mouseleave="hoverRating = 0"
                      @click="ratingInput = star"
                      :title="star + ' Stars'"
                    >
                      ★
                    </button>
                  </div>
                  <span class="fb-rating-desc">{{ getRatingLabel(hoverRating || ratingInput) }}</span>
                </div>
              </div>

              <!-- Comments Textarea -->
              <div class="fb-comments-group">
                <label class="fb-field-label" for="fb-comments-input">Comments & Feedback (Optional):</label>
                <textarea
                  id="fb-comments-input"
                  v-model="commentsInput"
                  class="fb-comments-textarea"
                  rows="3"
                  placeholder="Share your thoughts on the presentation, AI architecture, air-gap strategies, or live demos..."
                  maxlength="1000"
                ></textarea>
                <div class="fb-char-count">{{ commentsInput.length }} / 1000</div>
              </div>

              <!-- Form Buttons -->
              <div class="fb-form-buttons">
                <button
                  type="button"
                  class="fb-submit-btn"
                  @click="submitFeedback"
                  :disabled="isSubmitting"
                >
                  <span v-if="isSubmitting">💾 Saving to Database...</span>
                  <span v-else-if="userFeedback">💾 Update Review</span>
                  <span v-else>💾 Submit Feedback & Save to Supabase</span>
                </button>
                <button
                  v-if="userFeedback && isEditing"
                  type="button"
                  class="fb-cancel-btn"
                  @click="cancelEditing"
                >
                  ✕ Cancel
                </button>
              </div>
            </div>
          </div>

          <!-- Community Reviews Table / Feed -->
          <div class="fb-community-section">
            <div class="fb-community-header">
              <div class="fb-community-title-row">
                <h4 class="fb-community-title">👥 Community Reviews & Feedback</h4>
                <span class="fb-count-pill">{{ filteredFeedbackList.length }} Review{{ filteredFeedbackList.length === 1 ? '' : 's' }}</span>
              </div>

              <!-- Search & Sort Controls -->
              <div class="fb-controls-bar">
                <div class="fb-search-box">
                  <span class="fb-search-icon">🔍</span>
                  <input
                    type="text"
                    v-model="searchQuery"
                    class="fb-search-input"
                    placeholder="Search by name, email, or comment..."
                  />
                  <button v-if="searchQuery" type="button" class="fb-search-clear" @click="searchQuery = ''">✕</button>
                </div>

                <!-- Dyslexia-Friendly Multi-Option Pill Switch -->
                <div class="fb-pill-switch">
                  <button
                    type="button"
                    class="fb-pill-btn"
                    :class="{ active: sortOption === 'date' }"
                    @click="sortOption = 'date'"
                  >
                    🕒 Newest
                  </button>
                  <button
                    type="button"
                    class="fb-pill-btn"
                    :class="{ active: sortOption === 'name' }"
                    @click="sortOption = 'name'"
                  >
                    🔤 Name (A-Z)
                  </button>
                  <button
                    type="button"
                    class="fb-pill-btn"
                    :class="{ active: sortOption === 'rating' }"
                    @click="sortOption = 'rating'"
                  >
                    ⭐ Rating
                  </button>
                </div>
              </div>
            </div>

            <!-- Loading State -->
            <div v-if="isDataLoading" class="fb-loading-box">
              <span class="fb-spinner"></span>
              <span>Loading feedback from Supabase...</span>
            </div>

            <!-- Empty State -->
            <div v-else-if="filteredFeedbackList.length === 0" class="fb-empty-box">
              <span class="fb-empty-icon">📝</span>
              <p v-if="searchQuery">No reviews matched your search "{{ searchQuery }}".</p>
              <p v-else>No reviews submitted yet. Sign in with Google above to be the first!</p>
            </div>

            <!-- Review Cards Grid -->
            <div v-else class="fb-cards-grid">
              <div
                v-for="item in filteredFeedbackList"
                :key="item.id"
                class="fb-card"
                :class="{ 'is-own-card': currentUser && item.user_id === currentUser.id }"
              >
                <div class="fb-card-top">
                  <div class="fb-card-author">
                    <img 
                      v-if="item.avatar_url" 
                      :src="item.avatar_url" 
                      :alt="item.full_name" 
                      class="fb-card-avatar"
                      referrerpolicy="no-referrer"
                    />
                    <div v-else class="fb-card-avatar-fallback">{{ (item.full_name || 'U').charAt(0).toUpperCase() }}</div>
                    <div class="fb-card-meta">
                      <div class="fb-card-name-row">
                        <span class="fb-card-name">{{ item.full_name }}</span>
                        <span v-if="currentUser && item.user_id === currentUser.id" class="fb-you-badge">YOU</span>
                      </div>
                      <span class="fb-card-email">{{ item.email }}</span>
                    </div>
                  </div>

                  <!-- Star Rating Badge -->
                  <div class="fb-card-rating">
                    <span class="fb-stars-visual">
                      <span v-for="star in 5" :key="star" :class="{ lit: star <= item.rating }">★</span>
                    </span>
                    <span class="fb-rating-num">{{ item.rating }}/5</span>
                  </div>
                </div>

                <!-- Comment Content -->
                <p v-if="item.comments" class="fb-card-comment">
                  "{{ item.comments }}"
                </p>
                <p v-else class="fb-card-comment empty-comment">
                  <em>(No written comment provided)</em>
                </p>

                <!-- Card Footer -->
                <div class="fb-card-footer">
                  <span class="fb-card-time">🕒 {{ formatDateTime(item.updated_at || item.created_at) }}</span>
                  <div v-if="currentUser && item.user_id === currentUser.id" class="fb-card-inline-actions">
                    <button type="button" class="fb-inline-edit-btn" @click="startEditing" title="Edit your review">✏️ Edit</button>
                    <button type="button" class="fb-inline-delete-btn" @click="deleteFeedback" title="Delete your review">🗑️ Delete</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted, watch } from 'vue'
import { activeDemo, closeDemo } from './demoState'
import { 
  currentUser, 
  userFeedback, 
  filteredFeedbackList, 
  ratingInput, 
  commentsInput, 
  isEditing, 
  searchQuery, 
  sortOption, 
  isAuthLoading, 
  isDataLoading, 
  isSubmitting, 
  isDeleting, 
  statusMessage,
  initFeedbackState, 
  loginWithGoogle, 
  logout, 
  submitFeedback, 
  deleteFeedback, 
  formatDateTime 
} from './feedbackState'

const hoverRating = ref<number>(0)

const isOpen = computed(() => activeDemo.value === 'oauth-db-demo')

const userName = computed(() => {
  if (!currentUser.value) return ''
  const meta = currentUser.value.user_metadata
  return meta?.full_name || meta?.name || currentUser.value.email?.split('@')[0] || 'Authenticated User'
})

const userEmail = computed(() => currentUser.value?.email || '')
const userAvatar = computed(() => currentUser.value?.user_metadata?.avatar_url || currentUser.value?.user_metadata?.picture || null)

function getRatingLabel(rating: number): string {
  switch (rating) {
    case 1: return '⭐ 1 - Needs Work'
    case 2: return '⭐⭐ 2 - Fair'
    case 3: return '⭐⭐⭐ 3 - Good'
    case 4: return '⭐⭐⭐⭐ 4 - Very Good'
    case 5: return '⭐⭐⭐⭐⭐ 5 - Outstanding / S-Tier'
    default: return ''
  }
}

function startEditing() {
  if (userFeedback.value) {
    ratingInput.value = userFeedback.value.rating
    commentsInput.value = userFeedback.value.comments || ''
  }
  isEditing.value = true
}

function cancelEditing() {
  if (userFeedback.value) {
    ratingInput.value = userFeedback.value.rating
    commentsInput.value = userFeedback.value.comments || ''
  }
  isEditing.value = false
}

function handleClose() {
  closeDemo()
}

function handleKeyDown(e: KeyboardEvent) {
  if (e.key === 'Escape' && isOpen.value) {
    handleClose()
  }
}

onMounted(() => {
  initFeedbackState()
  if (typeof window !== 'undefined') {
    window.addEventListener('keydown', handleKeyDown)
  }
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('keydown', handleKeyDown)
  }
})

watch(isOpen, (newVal) => {
  if (newVal) {
    initFeedbackState()
  }
})
</script>

<style scoped>
.fb-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(2, 6, 23, 0.88);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.5rem;
  overflow-y: auto;
}

.fb-modal-container {
  background: #0f172a;
  border: 1.5px solid #38bdf8;
  border-radius: 16px;
  width: 100%;
  max-width: 1050px;
  max-height: 92vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 35px rgba(56, 189, 248, 0.25);
  overflow: hidden;
  animation: modalFadeIn 0.2s ease-out;
}

@keyframes modalFadeIn {
  from { opacity: 0; transform: scale(0.97); }
  to { opacity: 1; transform: scale(1); }
}

.fb-modal-header {
  padding: 1.1rem 1.5rem;
  background: rgba(15, 23, 42, 0.95);
  border-bottom: 1px solid #1e293b;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.fb-modal-title-box {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.fb-modal-badge {
  font-size: 0.68rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #38bdf8;
  background: rgba(2, 132, 199, 0.2);
  border: 1px solid rgba(56, 189, 248, 0.4);
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
  align-self: flex-start;
}

.fb-modal-title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 800;
  color: #f8fafc;
}

.fb-close-btn {
  background: rgba(30, 41, 59, 0.8);
  border: 1px solid #334155;
  color: #94a3b8;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.15s ease;
}

.fb-close-btn:hover {
  background: #ef4444;
  color: #ffffff;
  border-color: #ef4444;
}

.fb-modal-body {
  padding: 1.5rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

/* Arch Banner */
.fb-arch-banner {
  background: linear-gradient(135deg, rgba(2, 132, 199, 0.15), rgba(15, 23, 42, 0.8));
  border: 1px solid rgba(56, 189, 248, 0.35);
  border-radius: 12px;
  padding: 1rem 1.25rem;
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.fb-arch-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.fb-arch-text h4 {
  margin: 0 0 0.25rem 0;
  color: #38bdf8;
  font-size: 1rem;
  font-weight: 800;
}

.fb-arch-text p {
  margin: 0;
  color: #cbd5e1;
  font-size: 0.86rem;
  line-height: 1.45;
}

/* Status Alert */
.fb-status-alert {
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-size: 0.88rem;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.fb-status-alert.success {
  background: rgba(16, 185, 129, 0.2);
  border: 1px solid #10b981;
  color: #34d399;
}

.fb-status-alert.error {
  background: rgba(239, 68, 68, 0.2);
  border: 1px solid #ef4444;
  color: #f87171;
}

.fb-status-close {
  background: transparent;
  border: none;
  color: inherit;
  cursor: pointer;
  font-size: 0.9rem;
}

/* Auth Box */
.fb-auth-box {
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 12px;
  padding: 1rem 1.25rem;
}

.fb-unauth-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.fb-auth-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.fb-lock-icon {
  font-size: 1.5rem;
}

.fb-auth-info strong {
  display: block;
  color: #f8fafc;
  font-size: 0.92rem;
}

.fb-auth-info p {
  margin: 0;
  color: #94a3b8;
  font-size: 0.82rem;
}

.google-signin-btn {
  background: #ffffff;
  color: #1f2937;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  padding: 0.55rem 1.1rem;
  font-size: 0.88rem;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  cursor: pointer;
  transition: all 0.15s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.google-signin-btn:hover {
  background: #f1f5f9;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.25);
}

.google-icon {
  width: 18px;
  height: 18px;
}

.fb-auth-user-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.fb-user-badge {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.fb-user-avatar {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 2px solid #38bdf8;
}

.fb-user-avatar-fallback {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: #0284c7;
  color: #ffffff;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
}

.fb-user-details {
  display: flex;
  flex-direction: column;
}

.fb-user-name-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.fb-user-name {
  color: #f8fafc;
  font-weight: 800;
  font-size: 0.95rem;
}

.fb-auth-tag {
  background: rgba(16, 185, 129, 0.2);
  color: #34d399;
  border: 1px solid rgba(16, 185, 129, 0.4);
  font-size: 0.65rem;
  font-weight: 800;
  text-transform: uppercase;
  padding: 0.1rem 0.4rem;
  border-radius: 4px;
}

.fb-user-email {
  color: #94a3b8;
  font-size: 0.8rem;
}

.fb-signout-btn {
  background: rgba(30, 41, 59, 0.8);
  border: 1px solid #475569;
  color: #cbd5e1;
  padding: 0.45rem 0.85rem;
  border-radius: 8px;
  font-size: 0.82rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.15s ease;
}

.fb-signout-btn:hover {
  background: rgba(239, 68, 68, 0.2);
  border-color: #ef4444;
  color: #f87171;
}

/* Existing User Review Card */
.fb-user-existing-card {
  background: linear-gradient(135deg, rgba(2, 132, 199, 0.2), rgba(15, 23, 42, 0.9));
  border: 1.5px solid #38bdf8;
  border-radius: 12px;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.fb-existing-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.fb-check-badge {
  font-size: 0.68rem;
  font-weight: 800;
  color: #34d399;
  background: rgba(16, 185, 129, 0.2);
  border: 1px solid rgba(16, 185, 129, 0.4);
  padding: 0.15rem 0.45rem;
  border-radius: 4px;
}

.fb-existing-title h4 {
  margin: 0.3rem 0 0 0;
  color: #f8fafc;
  font-size: 1.05rem;
  font-weight: 800;
}

.fb-existing-actions {
  display: flex;
  gap: 0.5rem;
}

.fb-edit-btn {
  background: #0284c7;
  color: #ffffff;
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  font-size: 0.82rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.15s ease;
}

.fb-edit-btn:hover {
  background: #0369a1;
}

.fb-delete-btn {
  background: rgba(239, 68, 68, 0.2);
  border: 1px solid #ef4444;
  color: #f87171;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  font-size: 0.82rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.15s ease;
}

.fb-delete-btn:hover {
  background: #ef4444;
  color: #ffffff;
}

.fb-existing-stars {
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

.fb-star-static {
  font-size: 1.25rem;
  color: #475569;
}

.fb-star-static.filled {
  color: #fbbf24;
  text-shadow: 0 0 8px rgba(251, 191, 36, 0.6);
}

.fb-star-text {
  margin-left: 0.5rem;
  font-size: 0.88rem;
  font-weight: 700;
  color: #fbbf24;
}

.fb-existing-comment {
  margin: 0;
  color: #e2e8f0;
  font-size: 0.92rem;
  line-height: 1.5;
  font-style: italic;
  background: rgba(15, 23, 42, 0.6);
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border-left: 3px solid #38bdf8;
}

.fb-existing-timestamp {
  color: #94a3b8;
  font-size: 0.78rem;
}

/* Form Card */
.fb-form-card {
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 12px;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.fb-form-header h4 {
  margin: 0;
  color: #38bdf8;
  font-size: 1.05rem;
  font-weight: 800;
}

.fb-form-author {
  color: #94a3b8;
  font-size: 0.8rem;
}

.fb-field-label {
  display: block;
  color: #e2e8f0;
  font-size: 0.84rem;
  font-weight: 700;
  margin-bottom: 0.4rem;
}

.fb-star-picker {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.fb-stars-interactive {
  display: flex;
  gap: 0.2rem;
}

.fb-star-btn {
  background: transparent;
  border: none;
  font-size: 1.8rem;
  color: #475569;
  cursor: pointer;
  padding: 0.1rem 0.2rem;
  transition: all 0.15s ease;
  line-height: 1;
}

.fb-star-btn.active {
  color: #fbbf24;
  text-shadow: 0 0 10px rgba(251, 191, 36, 0.7);
  transform: scale(1.15);
}

.fb-rating-desc {
  font-size: 0.9rem;
  font-weight: 800;
  color: #fbbf24;
}

.fb-comments-textarea {
  width: 100%;
  background: #0f172a;
  border: 1px solid #334155;
  border-radius: 8px;
  padding: 0.75rem;
  color: #f8fafc;
  font-size: 0.88rem;
  font-family: inherit;
  resize: vertical;
  box-sizing: border-box;
}

.fb-comments-textarea:focus {
  outline: none;
  border-color: #38bdf8;
  box-shadow: 0 0 0 2px rgba(56, 189, 248, 0.2);
}

.fb-char-count {
  text-align: right;
  font-size: 0.75rem;
  color: #64748b;
  margin-top: 0.2rem;
}

.fb-form-buttons {
  display: flex;
  gap: 0.75rem;
}

.fb-submit-btn {
  background: linear-gradient(135deg, #0284c7, #0369a1);
  color: #ffffff;
  border: 1px solid #38bdf8;
  border-radius: 8px;
  padding: 0.6rem 1.25rem;
  font-size: 0.9rem;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.15s ease;
  box-shadow: 0 4px 12px rgba(2, 132, 199, 0.3);
}

.fb-submit-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, #0369a1, #075985);
  transform: translateY(-1px);
}

.fb-submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.fb-cancel-btn {
  background: rgba(30, 41, 59, 0.8);
  border: 1px solid #475569;
  color: #94a3b8;
  border-radius: 8px;
  padding: 0.6rem 1rem;
  font-size: 0.85rem;
  font-weight: 700;
  cursor: pointer;
}

.fb-cancel-btn:hover {
  background: #334155;
  color: #f8fafc;
}

/* Community Section */
.fb-community-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.fb-community-header {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.fb-community-title-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.fb-community-title {
  margin: 0;
  color: #f8fafc;
  font-size: 1.1rem;
  font-weight: 800;
}

.fb-count-pill {
  background: rgba(56, 189, 248, 0.15);
  color: #38bdf8;
  border: 1px solid rgba(56, 189, 248, 0.3);
  font-size: 0.75rem;
  font-weight: 800;
  padding: 0.15rem 0.5rem;
  border-radius: 20px;
}

.fb-controls-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.fb-search-box {
  flex: 1 1 300px;
  position: relative;
  display: flex;
  align-items: center;
}

.fb-search-icon {
  position: absolute;
  left: 0.75rem;
  font-size: 0.85rem;
  color: #64748b;
  pointer-events: none;
}

.fb-search-input {
  width: 100%;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 8px;
  padding: 0.45rem 2rem 0.45rem 2.2rem;
  color: #f8fafc;
  font-size: 0.84rem;
}

.fb-search-input:focus {
  outline: none;
  border-color: #38bdf8;
}

.fb-search-clear {
  position: absolute;
  right: 0.6rem;
  background: transparent;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  font-size: 0.85rem;
}

/* Dyslexia-Friendly KISS Pill Switch */
.fb-pill-switch {
  background: rgba(2, 6, 23, 0.8);
  border: 1px solid #334155;
  padding: 0.2rem;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.fb-pill-btn {
  background: transparent;
  border: 1px solid transparent;
  color: #94a3b8;
  font-size: 0.78rem;
  font-weight: 700;
  padding: 0.35rem 0.65rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s ease;
}

.fb-pill-btn:hover {
  color: #f8fafc;
}

.fb-pill-btn.active {
  background: #0284c7;
  color: #ffffff;
  border-color: #38bdf8;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

/* Loading & Empty */
.fb-loading-box, .fb-empty-box {
  background: #1e293b;
  border: 1px dashed #334155;
  border-radius: 12px;
  padding: 2.5rem;
  text-align: center;
  color: #94a3b8;
  font-size: 0.9rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.fb-empty-icon {
  font-size: 2rem;
}

.fb-spinner {
  width: 24px;
  height: 24px;
  border: 3px solid rgba(56, 189, 248, 0.2);
  border-top-color: #38bdf8;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Cards Grid */
.fb-cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(310px, 1fr));
  gap: 1rem;
}

.fb-card {
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 12px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  transition: all 0.15s ease;
}

.fb-card:hover {
  border-color: #475569;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
}

.fb-card.is-own-card {
  border-color: rgba(56, 189, 248, 0.6);
  background: linear-gradient(135deg, rgba(2, 132, 199, 0.12), #1e293b);
  box-shadow: 0 0 15px rgba(56, 189, 248, 0.15);
}

.fb-card-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.5rem;
}

.fb-card-author {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.fb-card-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid #475569;
}

.fb-card-avatar-fallback {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #334155;
  color: #f8fafc;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.95rem;
}

.fb-card-meta {
  display: flex;
  flex-direction: column;
}

.fb-card-name-row {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.fb-card-name {
  color: #f8fafc;
  font-weight: 800;
  font-size: 0.88rem;
}

.fb-you-badge {
  background: rgba(56, 189, 248, 0.2);
  color: #38bdf8;
  border: 1px solid rgba(56, 189, 248, 0.4);
  font-size: 0.6rem;
  font-weight: 800;
  padding: 0.05rem 0.35rem;
  border-radius: 3px;
}

.fb-card-email {
  color: #64748b;
  font-size: 0.72rem;
}

.fb-card-rating {
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.fb-stars-visual {
  color: #475569;
  font-size: 0.9rem;
  letter-spacing: 1px;
}

.fb-stars-visual .lit {
  color: #fbbf24;
}

.fb-rating-num {
  font-size: 0.78rem;
  font-weight: 800;
  color: #fbbf24;
}

.fb-card-comment {
  margin: 0;
  color: #cbd5e1;
  font-size: 0.85rem;
  line-height: 1.45;
  background: rgba(15, 23, 42, 0.6);
  padding: 0.65rem 0.85rem;
  border-radius: 6px;
  flex-grow: 1;
}

.fb-card-comment.empty-comment {
  color: #64748b;
}

.fb-card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.74rem;
  color: #64748b;
  border-top: 1px solid rgba(51, 65, 85, 0.6);
  padding-top: 0.5rem;
}

.fb-card-inline-actions {
  display: flex;
  gap: 0.4rem;
}

.fb-inline-edit-btn, .fb-inline-delete-btn {
  background: transparent;
  border: none;
  font-size: 0.74rem;
  font-weight: 700;
  cursor: pointer;
  padding: 0.1rem 0.3rem;
  border-radius: 4px;
}

.fb-inline-edit-btn {
  color: #38bdf8;
}
.fb-inline-edit-btn:hover {
  background: rgba(56, 189, 248, 0.15);
}

.fb-inline-delete-btn {
  color: #f87171;
}
.fb-inline-delete-btn:hover {
  background: rgba(239, 68, 68, 0.15);
}

@media (max-width: 768px) {
  .fb-modal-container {
    max-height: 96vh;
  }
  .fb-cards-grid {
    grid-template-columns: 1fr;
  }
  .fb-controls-bar {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>
