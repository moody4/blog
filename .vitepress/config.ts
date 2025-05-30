import { defineConfig } from 'vitepress'
import { getPosts } from './theme/serverUtils'

const pageSize = 10

const isProd = process.env.NODE_ENV === 'production'

export default defineConfig({
    base: '/blog/',
    title: 'moody\'s devlog',
    srcDir: 'markdown',
    cacheDir: './node_modules/vitepress_cache',
    description: 'devlog, blog, adobe iilustrator, plugins, n8ive',
    ignoreDeadLinks: true,
    head: [['link', { rel: 'icon', href: '/blog/favicon.ico?' }],
        [
            'script',
            { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=G-HCC4GBVBRH' }
        ],
        [
            'script',
            {},
            `window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-HCC4GBVBRH');`
        ]
    ],
    markdown: {
        image: {
            lazyLoading: true
        }
    },
    locales: {
        root: {
            label: 'Русский',
            lang: 'ru',
            themeConfig: {

                nav: [
                    // { text: 'Архив', link: '/pages/archives' },
                    { text: 'Теги', link: '/pages/tags' },
                    { text: 'Обо мне', link: '/pages/about' },
                ],
            },
        },
        en: {
            label: 'English',
            lang: 'en', // optional, will be added  as `lang` attribute on `html` tag
            link: '/en',
            themeConfig: {
                nav: [
                    // { text: 'Archives', link: '/en/pages/archives' },
                    { text: 'Tags', link: '/en/pages/tags' },
                    { text: 'About', link: '/en/pages/about' },
                ],
            },
                
        }
    },
    themeConfig: {
        posts: await getPosts(pageSize),
        posts_en: await getPosts(pageSize, 'en'),
        website: '/', //copyright link
        search: {
            provider: 'local',
        },
        //outline:[2,3],
        outline:{
            label:'Content'
        },
        socialLinks: [
            { icon: 'github', link: 'https://github.com/moody4' },
            { icon: 'telegram', link: 'https://t.me/moodyallen' }
        ],
    } as any,

    srcExclude: isProd
    ? [
          '**/trash/**/*.md', 
          '**/draft/**/*.md', 
          'README.md'
      ]
    : ['README.md'],
    vite: {
        //build: { minify: false }
        base: "/blog/",
        server: { port: 5000 },
    }
    /*
      optimizeDeps: {
          keepNames: true
      }
      */
})
