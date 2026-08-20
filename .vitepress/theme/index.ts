import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import Banner from './Banner.vue'
import DemoModal from './DemoModal.vue'
import DemoButton from './DemoButton.vue'
import FireworksModal from './FireworksModal.vue'
import FireworksButton from './FireworksButton.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'layout-top': () => h(Banner),
      'layout-bottom': () => [h(DemoModal), h(FireworksModal)]
    })
  },
  enhanceApp({ app }) {
    app.component('DemoButton', DemoButton)
    app.component('DemoModal', DemoModal)
    app.component('FireworksButton', FireworksButton)
    app.component('FireworksModal', FireworksModal)
  }
}
