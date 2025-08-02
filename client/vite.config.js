import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'

// the vite plugin for React helps support my jsx files, for fast refreshing, 
//intergration with CSS in JS, testing and routing

export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            '/api': 'http://localhost:3000',
        },
    },
});
