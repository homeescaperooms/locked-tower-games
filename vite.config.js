import { defineConfig } from "vite";
import { resolve } from 'path';

export default defineConfig({
    base: "/tower/",
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                solved: resolve(__dirname, 'solved.html'),
                gameHateSpeech: resolve(__dirname, 'game/hate_speech.html')
            },
        },
    },
});
