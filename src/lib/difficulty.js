import "./uibuilder/uibuilder.esm.min.js";
import { uibuilder } from "./uibuilder/uibuilder.esm.min.js";

const ls = localStorage;

export function setDifficulty(dif) {
    ls.setItem("locked-tower-difficulty", dif);
}

export function getDifficulty() {
    return ls.getItem("locked-tower-difficulty") || "easy";
}

export function setupDifficultyListener() {
    uibuilder.onChange("msg", (msg) => {
        if (msg?.topic !== "difficulty") return -1;

        console.log("Got ui builder input (difficulty). msg:", msg);

        const data = msg?.payload;

        let difficulty = "easy";
        if (data === 0 || data === "0") difficulty = "easy";
        if (data === 1 || data === "1") difficulty = "hard";

        setDifficulty(difficulty);
        console.log("Set difficulty to", difficulty);
    });
    console.log("Now listening for difficulty changes...");
}
