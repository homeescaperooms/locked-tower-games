import "../fonts.css";
import "../lib/style.css";

import { sleep } from "../helper.js";
import { inputGeneric, inputUnknownLanguage } from "../lib/control/control.js";
import { spoofGenericInput, spoofUnknownLanguageInput } from "../lib/control/controlSpoof.js";
import { initAfterLoad } from "../lib/init.js";
import { hideModal, showModal } from "../lib/meta/modal.js";
import { Timer } from "../lib/timer/timer.js";

/* config */
const DIFFICULTY = "hard"; // "easy" or "hard"
const HELP_TEXT = "hilfe für unknown language";
const RESET_TIMER_SECONDS = 120;
const COUNTDOWN_TIMER_SECONDS = 5;
const TIME_BETWEEN_SYMBOLS_MS = 500; // 0.5 seconds
const TIME_EACH_SYMBOL_IS_SHOWN_MS = 1000; // 1 second
const SYMBOL_IMG_WIDTH_PX = 98;
const SYMBOL_IMG_HEIGHT_PX = 47;

const SYMBOL_MAP = {
    A: {
        src: "/content/unknown_language/symbol_1.png",
        button: inputUnknownLanguage.BUTTON_1,
    },
    B: {
        src: "/content/unknown_language/symbol_2.png",
        button: inputUnknownLanguage.BUTTON_2,
    },
    C: {
        src: "/content/unknown_language/symbol_3.png",
        button: inputUnknownLanguage.BUTTON_3,
    },
    D: {
        src: "/content/unknown_language/symbol_4.png",
        button: inputUnknownLanguage.BUTTON_4,
    },
    E: {
        src: "/content/unknown_language/symbol_5.png",
        button: inputUnknownLanguage.BUTTON_5,
    },
    F: {
        src: "/content/unknown_language/symbol_6.png",
        button: inputUnknownLanguage.BUTTON_6,
    },
    G: {
        src: "/content/unknown_language/symbol_7.png",
        button: inputUnknownLanguage.BUTTON_7,
    },
    H: {
        src: "/content/unknown_language/symbol_8.png",
        button: inputUnknownLanguage.BUTTON_8,
    },
};

const SOLUTIONS = {
    easy: [
        {
            symbol: "A",
            x: 50, // %
            y: 50, // %
        },
        {
            symbol: "B",
            x: 10, // %
            y: 90, // %
        },
        {
            symbol: "C",
            x: 0, // %
            y: 0, // %
        },
        {
            symbol: "D",
            x: 100, // %
            y: 100, // %
        },
        {
            symbol: "E",
            x: 87, // %
            y: 35, // %
        },
    ],
    hard: [
        {
            symbol: "A",
            x: 50, // %
            y: 50, // %
        },
        {
            symbol: "B",
            x: 10, // %
            y: 90, // %
        },
        {
            symbol: "C",
            x: 0, // %
            y: 0, // %
        },
        {
            symbol: "D",
            x: 100, // %
            y: 100, // %
        },
        {
            symbol: "E",
            x: 87, // %
            y: 35, // %
        },
        {
            symbol: "F",
        },
        {
            symbol: "G",
        },
        {
            symbol: "H",
        },
    ],
};

let helpModal;
let currentTryInputs = [];
let resetTimer;
let canInput = false;

function onInput(keyName) {
    // on ANY input, reset timer
    if (resetTimer) resetTimer.reset();

    if (!canInput) {
        console.log("input blocked");
        return;
    }

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

    const afterInput = () => {
        updateProgress(currentTryInputs, SOLUTIONS[DIFFICULTY]);
        const correct = compareSolution(currentTryInputs, SOLUTIONS[DIFFICULTY]);
        if (correct) solveGame();

        if (isInputFinished(currentTryInputs, SOLUTIONS[DIFFICULTY])) {
            resetGame();
        }
    };

    const findLetterForButton = (button) => {
        for (const [letter, symbol] of Object.entries(SYMBOL_MAP)) {
            if (symbol.button === button) return letter;
        }
        return null;
    };

    // can abstract each button into this generic function call
    const letter = findLetterForButton(keyName);
    if (letter) {
        currentTryInputs.push(letter);
        afterInput();
    } else {
        console.error(`Pushed unknown button ${keyName}, which does not have a letter.`);
    }
}

function resetGame() {
    // reload page
    window.location.reload();
}

function solveGame() {
    document.querySelector("a.solve").click();
}

function updateProgress(currentSolution, correctSolution) {
    let innerString = "<span>Eingabe: </span>";

    if (!canInput) {
        innerString = "<span>Eingabe:</span>(Warte...)</div>";
        document.querySelector(".progress").innerHTML = innerString;
        return;
    }

    for (let i = 0; i < correctSolution.length; i++) {
        const isFilledOut = i < currentSolution.length;
        let content = "_";
        if (isFilledOut) content = currentSolution[i];
        innerString += `<div class="indicator"><span>${content}</span></div>`;
    }

    document.querySelector(".progress").innerHTML = innerString;
}

function compareSolution(currentSolution, correctSolution) {
    if (currentSolution.length !== correctSolution.length) return false;

    for (let i = 0; i < currentSolution.length; i++) {
        if (currentSolution[i] !== correctSolution[i].symbol) return false;
    }

    return true;
}

function isInputFinished(currentSolution, correctSolution) {
    if (currentSolution.length < correctSolution.length) return false;
    return true;
}

initAfterLoad(() => {
    spoofGenericInput(onInput);
    spoofUnknownLanguageInput(onInput);
    updateProgress(currentTryInputs, SOLUTIONS[DIFFICULTY]);

    // countdown timer
    const countdownTimer = new Timer(COUNTDOWN_TIMER_SECONDS, async () => {
        // countdown is up, start showing symbols
        document.querySelector("article").innerHTML = "";
        await showSymbols();
    });

    countdownTimer.setCallbackEachSecond((time) => {
        document.querySelector("article").innerHTML = `<div class="countdown">Start in: ${time} Sekunden...</div>`;
    });
    document.querySelector("article").innerHTML = `<div class="countdown">Start in: ${COUNTDOWN_TIMER_SECONDS} Sekunden...</div>`;

    countdownTimer.start();
});

async function showSymbols() {
    const elAnchor = document.querySelector("article");
    const anchorBB = elAnchor.getBoundingClientRect();

    const showSymbolAt = (src, x, y) => {
        if (x === undefined || y === undefined) {
            // randomize values
            x = Math.floor(Math.random() * 100);
            y = Math.floor(Math.random() * 100);
        }

        const img = document.createElement("img");
        img.src = src;
        img.classList.add("symbol");

        let rawLeft = anchorBB.width * (x / 100);
        let maxLeft = anchorBB.width - SYMBOL_IMG_WIDTH_PX;
        img.style.left = Math.min(rawLeft, maxLeft) + "px";

        let rawTop = anchorBB.height * (y / 100);
        let maxTop = anchorBB.height - SYMBOL_IMG_HEIGHT_PX;
        img.style.top = Math.min(rawTop, maxTop) + "px";

        elAnchor.appendChild(img);
    };

    const deleteSymbol = () => {
        const symbolImages = document.querySelectorAll("img.symbol");
        for (const symbol of symbolImages) {
            symbol.remove();
        }
    };

    const phases = SOLUTIONS[DIFFICULTY];

    for (const phase of phases) {
        const src = import.meta.env.BASE_URL + SYMBOL_MAP[phase.symbol].src;
        showSymbolAt(src, phase.x, phase.y);
        await sleep(TIME_EACH_SYMBOL_IS_SHOWN_MS);
        deleteSymbol();
        await sleep(TIME_BETWEEN_SYMBOLS_MS);
    }

    startInputPhase();
}

function startInputPhase() {
    canInput = true;
    updateProgress(currentTryInputs, SOLUTIONS[DIFFICULTY]);
    resetTimer = new Timer(RESET_TIMER_SECONDS, () => {
        // timeout is up, navigate back to start
        document.querySelector("a.reset").click();
    });
    resetTimer.start();
}
