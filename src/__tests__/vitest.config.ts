import { defineConfig } from 'vitest/config'
import { resolve } from 'path'
import tsconfigPaths from 'vite-tsconfig-paths'

const config = defineConfig({
    root: resolve(__dirname, '../..'),
    esbuild: {
        target: 'node20'
    },
    plugins: [
        tsconfigPaths({
            root: '../..'
        })
    ],
    test: {
        globals: true,
        include: ['**/__tests__/**/*.spec.[tj]s'],
        exclude: ['**/node_modules/**', '**/dist/**'],
        reporters: ['junit'],
        testTimeout: 60000,
        outputFile: {
            junit: './junit-report.xml'
        }
    }
})
export default config
