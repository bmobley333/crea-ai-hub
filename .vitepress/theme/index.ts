import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import Banner from './Banner.vue'
import DemoModal from './DemoModal.vue'
import DemoButton from './DemoButton.vue'
import FireworksModal from './FireworksModal.vue'
import FireworksButton from './FireworksButton.vue'
import './custom.css'
import type { Theme } from 'vitepress'

const DARK_SLIDES_ID = '1BmBU_wbQ_YdHzZuPM2_lFvGxcCrKzYFl8jXgYZOk6rw'
const LIGHT_SLIDES_ID = '1uUjqEhp01_jqhPLEb-rDxN-Jn3iCqhThbwntyYyrOEA'

function syncSlideDeckLinks() {
  if (typeof window === 'undefined' || typeof document === 'undefined') return
  
  const isDark = document.documentElement.classList.contains('dark')
  const targetId = isDark ? DARK_SLIDES_ID : LIGHT_SLIDES_ID
  const otherId = isDark ? LIGHT_SLIDES_ID : DARK_SLIDES_ID
  
  const links = document.querySelectorAll<HTMLAnchorElement>('a[href*="docs.google.com/presentation/d/"]')
  links.forEach(link => {
    const currentHref = link.getAttribute('href')
    if (currentHref && currentHref.includes(otherId)) {
      const updatedHref = currentHref.replace(otherId, targetId)
      link.setAttribute('href', updatedHref)
    }
  })
}

const theme: Theme = {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'layout-top': () => h(Banner),
      'layout-bottom': () => [h(DemoModal), h(FireworksModal)]
    })
  },
  enhanceApp({ app, router }) {
    app.component('DemoButton', DemoButton)
    app.component('DemoModal', DemoModal)
    app.component('FireworksButton', FireworksButton)
    app.component('FireworksModal', FireworksModal)

    if (typeof window !== 'undefined') {
      // 1. Initial sync on DOM ready
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => syncSlideDeckLinks())
      } else {
        setTimeout(syncSlideDeckLinks, 50)
      }

      // 2. Sync on route transitions
      router.onAfterRouteChanged = () => {
        setTimeout(syncSlideDeckLinks, 50)
      }

      // 3. Reactive MutationObserver on <html class="dark">
      const observer = new MutationObserver((mutations) => {
        for (const m of mutations) {
          if (m.type === 'attributes' && m.attributeName === 'class') {
            syncSlideDeckLinks()
          }
        }
      })

      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class']
      })
    }
  }
}

export default theme
