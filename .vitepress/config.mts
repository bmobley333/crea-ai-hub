import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Taking AI to the Next Level",
  description: "Public Companion Hub for Blake Mobley's Keynote at the 2026 CREA IT Conference",
  lang: 'en-US',
  cleanUrls: true,
  appearance: 'dark',
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ['link', { rel: 'alternate icon', href: '/favicon.ico' }],
    ['meta', { name: 'theme-color', content: '#0f172a' }]
  ],
  themeConfig: {
    siteTitle: "⚡ Taking AI to the Next Level",
    nav: [
      { text: '🏠 Home', link: '/' },
      { text: '🎤 Presentation', link: '/presentation' },
      {
        text: '🧭 Frameworks',
        items: [
          { text: '🪜 The 4-Level Maturity Ladder', link: '/ladder' },
          { text: '🛡️ Security & Bounded Loop', link: '/architecture' },
          { text: '💻 On-Premises Hardware BoM', link: '/hardware' }
        ]
      },
      {
        text: '📥 Resources & Toolkit',
        items: [
          { text: '📥 Downloads & Demos', link: '/resources' },
          { text: '💡 High-Impact AI Projects', link: '/resources#💡-high-impact-next-level-ai-projects' },
          { text: '📖 Utility IT & AI Glossary', link: '/glossary' },
          { text: '⚖️ Legal Risk & Disclaimer', link: '/disclaimer' }
        ]
      },
      { text: '📂 Drive Vault ↗', link: 'https://drive.google.com/drive/folders/1ltRx1n6Db9Vxi7rDJcUt1qsVtEuv3opB?usp=sharing' }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/bmobley333/crea-ai-hub' }
    ],
    sidebar: [
      {
        text: 'Keynote & Frameworks',
        items: [
          { text: 'Executive Overview', link: '/' },
          { text: '🎤 Presentation Hub & Flight Plan', link: '/presentation' },
          { text: 'The 4-Level Maturity Ladder', link: '/ladder' },
          { text: 'Security & Bounded Loop', link: '/architecture' },
          { text: 'On-Premises Hardware BoM', link: '/hardware' }
        ]
      },
      {
        text: 'Keynote Demos',
        items: [
          { text: 'Documentation Engine (Demo 1)', link: '/demos/documentation-engine' },
          { text: 'IT Ticket Triage (Demo 2)', link: '/demos/ticket-triage' }
        ]
      },
      {
        text: 'Reference & Toolkits',
        items: [
          { text: 'Utility IT & AI Glossary', link: '/glossary' },
          { text: 'Resources & Downloads', link: '/resources' },
          { text: '⚖️ Legal Risk & Disclaimer', link: '/disclaimer' }
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
