/**
 * @file: /react-2022/vite.config.js
 * @author: zhongweichao(zhongwei.chao@derbysoft.net)
 */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import legacy from '@vitejs/plugin-legacy';
import styleImport from 'vite-plugin-style-import';
import autoprefixer from 'autoprefixer';
import fs from 'fs';
import path from 'path';
import jotaiDebugLabel from 'jotai/babel/plugin-debug-label';
import jotaiReactRefresh from 'jotai/babel/plugin-react-refresh';

// 打包时，生成一些基础的构建信息到 build.json
if (process.env.VITE_MODE !== 'local') {
    fs.writeFileSync(
        path.join(__dirname, './public/build.json'),
        JSON.stringify({
            version: `${Date.now()}`,
        })
    );
}

// https://vitejs.dev/config/
export default defineConfig({
    base: '/',
    define: {
        VITE_MODE: `"${process.env.VITE_MODE}"`,
    },
    server: {
        port: 4014,
    },
    plugins: [
        legacy({
            targets: ['ie >= 11'],
            additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
        }),
        react({ babel: { plugins: [jotaiDebugLabel, jotaiReactRefresh] } }),
        // 按需加载antd样式文件
        styleImport({
            libs: [
              {
                libraryName: 'antd',
                esModule: true,
                resolveStyle: (name) => {
                  return `antd/es/${name}/style/index`;
                },
              },
            ],
        })
    ],
    css: {
        postcss: {
            plugins: [autoprefixer()],
        },
        modules: {
            scopeBehaviour: 'local',
            generateScopedName: '[local]_[hash:base64:6]',
        },
        preprocessorOptions: {

            less: {
                javascriptEnabled: true,
                modifyVars: { '@primary-color': '#3e63dd' },
            },
        },
    },
    resolve: {
        alias: {
            '~': path.resolve(__dirname, './'),
            '@': path.resolve(__dirname, 'src'),
        }
    },
    build: {
        target: 'es2015',
        sourcemap: false,
        rollupOptions: {
            output: {
                // 抽离公共模块代码
                manualChunks: {
                    vendor: ['react', 'react-router-dom', 'react-dom'],
                },
            },
        },
    }
        
    
})
