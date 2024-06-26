import { inputGeneric, inputHateSpeech, onInputGeneric, onInputHateSpeech } from "./control.js";

function spoofGenericInput(key, cb) {
    if (key) {
        // escape --> buttonHelp
        // enter --> buttonStart

        if (key === "Escape") {
            onInputGeneric(inputGeneric.BUTTON_HELP, cb);
        }
        if (key === "Enter") {
            onInputGeneric(inputGeneric.BUTTON_START, cb);
        }
    }
}

export function spoofHateSpeechInput(cb) {
    // event listener for pressing 1-8 key on keyboard
    document.addEventListener("keydown", (event) => {
        spoofGenericInput(event.key, cb);

        if (event.key) {
            // hate speech
            const keyNum = parseInt(event.key, 10);
            if (keyNum >= 1 && keyNum < 9) {
                onInputHateSpeech(inputHateSpeech[`BUTTON_${keyNum}`], cb);
            }
        }
    });
}
