import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: 'src', // Set root to your src folder
  build: {
    outDir: '../dist', // Output goes to dist folder at root level
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        about: resolve(__dirname, 'src/about.html'),
        booking: resolve(__dirname, 'src/booking.html'),
        contact: resolve(__dirname, 'src/contact.html'),
        faq: resolve(__dirname, 'src/faq.html'),
        gallery: resolve(__dirname, 'src/gallery.html'),
        login: resolve(__dirname, 'src/login.html'),
        pricing: resolve(__dirname, 'src/pricing.html'),
        services: resolve(__dirname, 'src/services.html'),
        testimonials: resolve(__dirname, 'src/testimonials.html'),
      },
    },
  },
});
