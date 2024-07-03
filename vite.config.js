import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
    base: "/tower/",
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, "index.html"),
                solved: resolve(__dirname, "solved.html"),
                gameHateSpeech: resolve(__dirname, "game/hate_speech.html"),
                gameUnknownLanguage: resolve(__dirname, "game/unknown_language.html"),
                gameEmotions: resolve(__dirname, "game/emotions.html"),
            },
        },
    },
});
