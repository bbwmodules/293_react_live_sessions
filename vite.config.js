// javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mdx from '@mdx-js/rollup'

const repo = process.env.GITHUB_REPOSITORY?.split('/')?.[1]
const isGhActions = !!process.env.GITHUB_ACTIONS && !!repo

export default defineConfig({
    base: isGhActions ? `/${repo}/` : '/',
    plugins: [react(), mdx()],
    server: {
        port: 5174
    }
})