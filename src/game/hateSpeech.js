import "../fonts.css";
import "../lib/style.css";

import { inputGeneric, inputHateSpeech } from "../lib/control/control.js";
import { spoofHateSpeechInput } from "../lib/control/controlSpoof.js";
import { initAfterLoad } from "../lib/init.js";
import { infoButton } from "../lib/meta/infoButton.js";
import { showModal } from "../lib/meta/modal.js";

// Info button

infoButton().click((ev) => {
    showModal({
        titleText: "yo",
        text: "test",
        confirmButtonText: "Alles klar",
        confirmButtonColor: "#2363e9",
    });
});

function onInput(keyName) {
    console.log(keyName);

    if (keyName === inputGeneric.BUTTON_START) {
        //
    }

    if (keyName === inputGeneric.BUTTON_HELP) {
        showModal({
            text: "hilfe für hate speech",
        });
    }

    if (keyName === inputHateSpeech.BUTTON_1) {
        console.log("button 1");
    }
}

initAfterLoad(() => {
    spoofHateSpeechInput(onInput);
});
