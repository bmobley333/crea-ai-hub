import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Taking AI to the Next Level",
  description: "Public Companion Hub for Blake Mobley's Keynote at the 2026 CREA IT Conference",
  lang: 'en-US',
  cleanUrls: true,
  appearance: 'dark',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'theme-color', content: '#0f172a' }]
  ],
  themeConfig: {
    siteTitle: "⚡ Taking AI to the Next Level",
    nav: [
      { text: 'Overview', link: '/' },
      { text: '🪜 Maturity Ladder', link: '/ladder' },
      { text: '🛡️ Architecture & Security', link: '/architecture' },
      { text: '💻 Hardware BoM', link: '/hardware' },
      { text: '📖 Glossary', link: '/glossary' },
      { text: '📥 Resources & Demos', link: '/resources' }
    ],
    sidebar: [
      {
        text: 'Keynote & Frameworks',
        items: [
          { text: 'Executive Overview', link: '/' },
          { text: 'The 4-Level Maturity Ladder', link: '/ladder' },
          { text: 'Security & Bounded Loop', link: '/architecture' },
          { text: 'On-Premises Hardware BoM', link: '/hardware' }
        ]
      },
      {
        text: 'Reference & Toolkits',
        items: [
          { text: 'Utility IT & AI Glossary', link: '/glossary' },
          { text: 'Resources & Downloads', link: '/resources' }
        ]
      }
    ],
    search: {
      provider: 'local'
    },
    footer: {
      message: 'Presented by Blake Mobley • 2026 CREA IT Conference (Lakewood, CO)',
      copyright: 'Air-Gapped Critical Infrastructure AI Reference Architecture'
    }
  }
})
