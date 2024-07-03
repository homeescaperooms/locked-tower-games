import { inputEmotions, inputUnknownLanguage, onInputEmotions, onInputUnknownLanguage, spoofPayloadFromBackend } from "./control.js";

export function spoofHateSpeechInput(cb) {
    // event listener for pressing 1-8 key on keyboard
    document.addEventListener("keydown", (event) => {
        if (event.key) {
            // hate speech

            let buttonName;
            switch (event.key) {
                case "Enter":
                    buttonName = "buttonStart";
                    break;
                case "Escape":
                    buttonName = "buttonHelp";
                    break;
            }

            if (event.key === "Enter") {
                buttonName = "buttonStart";
            } else if (event.key === "Escape") {
                buttonName = "buttonHelp";
            } else {
                const keyNum = parseInt(event.key, 10);
                if (keyNum >= 1 && keyNum < 8) {
                    buttonName = "button" + keyNum.toString();
                }
            }

            let payload = spoofPayloadFromBackend(1, buttonName);
            cb();
        }
    });
}

export function spoofUnknownLanguageInput(cb) {
    // event listener for pressing 1-8 key on keyboard
    document.addEventListener("keydown", (event) => {
        if (event.key) {
            // unknown language
            const keyNum = parseInt(event.key, 10);
            if (keyNum >= 1 && keyNum < 9) {
                onInputUnknownLanguage(inputUnknownLanguage[`BUTTON_${keyNum}`], cb);
            }
        }
    });
}

export function spoofEmotionsInput(cb) {
    // event listener for pressing 1-8 key on keyboard
    document.addEventListener("keydown", (event) => {
        if (event.key) {
            // emotions
            if (event.key === "1") {
                onInputEmotions(inputEmotions.BUTTON_SOLVED, cb);
            }
        }
    });
}
