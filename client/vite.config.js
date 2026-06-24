import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        host: true, // Tells Vite to listen on all network interfaces inside the container
        port: 5173,
        strictPort: true,
    }
});
