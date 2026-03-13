import { defineConfig } from 'vitest/config'
import { resolve } from 'path'

const config = defineConfig({
    root: resolve(__dirname, '../..'),
    resolve: {
        tsconfigPaths: true
    },
    esbuild: {
        target: 'node24'
    },
    test: {
        globals: true,
        include: ['**/__tests__/**/*.spec.[tj]s'],
        exclude: ['**/node_modules/**', '**/dist/**'],
        reporters: [['default', { summary: true }], 'junit'],
        testTimeout: 60000,
        outputFile: {
            junit: './junit-report.xml'
        }
    }
})
export default config
