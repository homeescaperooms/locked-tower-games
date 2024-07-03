import "../fonts.css";
import "../lib/style.css";

import { inputGeneric, inputEmotions } from "../lib/control/control.js";
import { spoofGenericInput, spoofEmotionsInput } from "../lib/control/controlSpoof.js";
import { initAfterLoad } from "../lib/init.js";
import { hideModal, showModal } from "../lib/meta/modal.js";
import { Timer } from "../lib/timer/timer.js";

/* config */
const HELP_TEXT = "hilfe für emotions";
const RESET_TIMER_SECONDS = 120;

let helpModal;
let resetTimer;

function onInput(keyName) {
    // on ANY input, reset timer
    if (resetTimer) resetTimer.reset();

    if (keyName === inputGeneric.BUTTON_START) {
        //
    }

    if (keyName === inputGeneric.BUTTON_HELP) {
        if (helpModal) {
            hideModal(helpModal);
            helpModal = null;
        } else {
            helpModal = showModal({
                text: HELP_TEXT,
            });
        }
    }

    // Disallow other key events when help is shown
    if (helpModal) return;

    if (keyName === inputEmotions.BUTTON_SOLVED) {
        solveGame();
    }
}

function solveGame() {
    document.querySelector("a.solve").click();
}


initAfterLoad(() => {
    spoofGenericInput(onInput);
    spoofEmotionsInput(onInput);

    resetTimer = new Timer(RESET_TIMER_SECONDS, () => {
        // timeout is up, navigate back to start
        document.querySelector("a.reset").click();
    });
    resetTimer.start();
});
