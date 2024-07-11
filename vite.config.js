import { fileURLToPath } from "node:url";
import { resolve } from "path";
import { defineConfig } from "vite";
import cp from "vite-plugin-cp";

const configFilePath = fileURLToPath(new URL("config.js", import.meta.url));
const outDirName = "dist";

export default defineConfig({
    base: "/tower/",
    build: {
        outDir: outDirName,
        rollupOptions: {
            input: {
                main: resolve(__dirname, "index.html"),
                solved: resolve(__dirname, "solved.html"),
                difficulty: resolve(__dirname, "difficulty.html"),
                intro: resolve(__dirname, "intro.html"),
                gameHateSpeech: resolve(__dirname, "game/hate_speech.html"),
                gameUnknownLanguage: resolve(__dirname, "game/unknown_language.html"),
                gameEmotions: resolve(__dirname, "game/emotions.html"),
                gameQuizWG: resolve(__dirname, "game/quiz_wg.html"),
            },
            external: [configFilePath],
        },
    },
    plugins: [
        cp({
            targets: [
                {
                    src: configFilePath,
                    dest: outDirName,
                },
            ],
        }),
    ],
});
