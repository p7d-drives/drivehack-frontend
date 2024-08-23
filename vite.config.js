import {
    defineConfig
} from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        cors: false,
        proxy: {
            '/api': 'http://p7d.ntonee.one:9000'
        }
    },

})