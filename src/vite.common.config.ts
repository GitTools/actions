import { resolve } from 'node:path'
import { builtinModules } from 'node:module'
import { defineConfig, UserConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export function viteConfig(entry: { [p: string]: string }, manualChunks: (id: string) => string | undefined): UserConfig {
    return defineConfig({
        root: resolve(__dirname, '..'),
        esbuild: {
            target: 'node20'
        },
        plugins: [
            tsconfigPaths({
                root: '..'
            })
        ],
        build: {
            target: 'esnext',
            lib: {
                formats: ['es'],
                entry
            },
            rollupOptions: {
                external: [...builtinModules, ...builtinModules.map(module => `node:${module}`)],
                output: {
                    entryFileNames: '[name].js',
                    chunkFileNames: '[name].js',
                    manualChunks
                }
            },
            emptyOutDir: false,
            sourcemap: true,
            minify: false
        }
    } as UserConfig)
}
