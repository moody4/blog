import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import NewLayout from './components/NewLayout.vue'
import Archives from './components/Archives.vue'
import Tags from './components/Tags.vue'
import Page from './components/Page.vue'
// import Comment from './components/CommentGiscus.vue'

import './custom.css'

export default {
    ...DefaultTheme,
    Layout: NewLayout,
    enhanceApp({ app }) {
        // register global compoment
        app.component('Tags', Tags)
        app.component('Archives', Archives)
        app.component('Page', Page)
        // app.component('Comment', Comment)
    }
} satisfies Theme
