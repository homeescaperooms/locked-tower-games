import { inputGeneric, inputHateSpeech, inputUnknownLanguage, onInputGeneric, onInputHateSpeech, onInputUnknownLanguage } from "./control.js";

export function spoofGenericInput(cb) {
    document.addEventListener("keydown", (event) => {
        if (event.key) {
            // escape --> buttonHelp
            // enter --> buttonStart

            if (event.key === "Escape") {
                onInputGeneric(inputGeneric.BUTTON_HELP, cb);
            }
            if (event.key === "Enter") {
                onInputGeneric(inputGeneric.BUTTON_START, cb);
            }
        }
    });
}

export function spoofHateSpeechInput(cb) {
    // event listener for pressing 1-8 key on keyboard
    document.addEventListener("keydown", (event) => {
        if (event.key) {
            // hate speech
            const keyNum = parseInt(event.key, 10);
            if (keyNum >= 1 && keyNum < 9) {
                onInputHateSpeech(inputHateSpeech[`BUTTON_${keyNum}`], cb);
            }
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
