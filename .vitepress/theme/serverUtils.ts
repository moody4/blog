import { globby } from 'globby'
import matter from 'gray-matter'
import fs from 'fs-extra'
import { resolve, join } from 'path'

const srcDir = 'markdown'
const resolveDir = (dir) => dir? `${dir}/` : ''

async function getPosts(pageSize: number, locale: string = '') {
    const isProd = process.env.NODE_ENV === 'production'
    const ignorePaths = isProd ? ['posts/draft/**/*.md', 'posts/private-notes/**/*.md', 'posts/trash/**/*.md'].map(path => `${resolveDir(srcDir)}${path}`) : []

    let paths = await globby([`${resolveDir(srcDir)}${resolveDir(locale)}posts/**/**.md`], {
        ignore: ignorePaths
    })

    await generatePaginationPages(paths.length, pageSize, locale)

    let posts = await Promise.all(
        paths.map(async (item) => {
            const content = await fs.readFile(item, 'utf-8')
            const { data } = matter(content)
            data.date = _convertDate(data.date)
            return {
                frontMatter: data,
                regularPath: `/${item.replace('.md', '.html').replace(/^markdown\//, '')}`
            }
        })
    )

    posts.sort(_compareDate as any)
    return posts
}

async function generatePaginationPages(total: number, pageSize: number, locale: string = '') {
    let pagesNum = total % pageSize === 0 ? total / pageSize : Math.floor(total / pageSize) + 1
    const paths = resolve(`./${resolveDir(srcDir)}${resolveDir(locale)}`)

    if (total > 0) {
        for (let i = 1; i < pagesNum + 1; i++) {
            const page = `
---
page: true
title: 
aside: false
---
<script setup>
import Page from "${locale? '../' : ''}../.vitepress/theme/components/Page.vue";
import { useData } from "vitepress";
const { theme } = useData();
const posts = theme.value.posts${locale? '_' + locale : ''}.slice(${pageSize * (i - 1)},${pageSize * i})
</script>
<Page :posts="posts" :pageCurrent="${i}" :pagesNum="${pagesNum}" />
`.trim()

            const file = paths + `/page_${i}.md`
            await fs.writeFile(file, page)
        }
    }
    // rename page_1 to index for homepage
    await fs.move(paths + '/page_1.md', paths + '/index.md', { overwrite: true })
}

function _convertDate(date = new Date().toString()) {
    const json_date = new Date(date).toJSON()
    return json_date.split('T')[0]
}

function _compareDate(obj1: { frontMatter: { date: number } }, obj2: { frontMatter: { date: number } }) {
    return obj1.frontMatter.date < obj2.frontMatter.date ? 1 : -1
}

export { getPosts }
