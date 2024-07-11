import "../fonts.css";
import "../lib/style.css";
//import "../lib/teapot/style.css";

import { configGlobal, configQuizWG } from "../../config.js";
import { sleep } from "../helper.js";
import { colorOverwrite } from "../lib/color.js";
import { setupInputBackend, spoofInputBackend } from "../lib/control/control.js";
import { getDifficulty } from "../lib/difficulty.js";
import { initAfterLoad } from "../lib/init.js";
import { hideModal, showModal } from "../lib/meta/modal.js";
import { Answer, Game, Question, Round } from "../lib/teapot/types.js";
import { Timer } from "../lib/timer/timer.js";

const DIFFICULTY = getDifficulty();

const ROUNDS = [];
let shuffledQuestionPool = configQuizWG.questionPool.sort(() => Math.random() - 0.5);
for (let i = 0; i < configQuizWG.roundAmount[DIFFICULTY]; i++) {
    let question = shuffledQuestionPool[i];
    if (question.type === "text") {
        let r = new Round(
            new Question().addStaticText(question.question),

            new Answer()
                .startButtonSet("row")
                .addTextButton(question.answerOptions[0], question.correct.trim() === question.answerOptions[0].trim(), "buttonA")
                .addTextButton(question.answerOptions[1], question.correct.trim() === question.answerOptions[1].trim(), "buttonB")
                .addTextButton(question.answerOptions[2], question.correct.trim() === question.answerOptions[2].trim(), "buttonC")
                .addTextButton(question.answerOptions[3], question.correct.trim() === question.answerOptions[3].trim(), "buttonD")
                .endButtonSet(),

            {
                timer: question.timer[DIFFICULTY],
            }
        );
        ROUNDS.push(r);
    } else if (question.type === "image") {
        let r = new Round(
            new Question().addStaticText(question.question),

            new Answer()
                .startButtonSet("row")
                .addImageButton(import.meta.env.BASE_URL + question.answerOptions[0], question.correct === 1, "buttonA")
                .addImageButton(import.meta.env.BASE_URL + question.answerOptions[1], question.correct === 2, "buttonB")
                .addImageButton(import.meta.env.BASE_URL + question.answerOptions[2], question.correct === 3, "buttonC")
                .addImageButton(import.meta.env.BASE_URL + question.answerOptions[3], question.correct === 4, "buttonD")
                .endButtonSet(),

            {
                timer: 30,
            }
        );
        ROUNDS.push(r);
    }
}

const onGameOver = () => {
    document.querySelector(".question-container").innerHTML = `<p>${configQuizWG.gameOverText}</p>`;

    document.querySelector(".answer-container").innerHTML = ``;
    document.querySelector("#timer")?.classList.add("disabled");

    resetTimer.stop();
    anyButtonRestarts = true;
};

let helpModal;
let resetTimer;
let anyButtonRestarts = false;

async function onInput({ detail }) {
    const button = detail.button;
    console.log("btn", button);

    // on ANY input, reset timer
    if (resetTimer) resetTimer.reset();

    if (anyButtonRestarts) {
        resetGame();
        return;
    }

    if (button === "buttonStart") {
        //
    }

    if (button === "buttonHelp") {
        if (helpModal) {
            hideModal(helpModal);
            helpModal = null;
        } else {
            helpModal = showModal({
                text: configQuizWG.helpText,
            });
        }
    }

    // Disallow other key events when help is shown
    if (helpModal) return;

    // try to find button with this id
    const foundButton = document.querySelector(`button[data-button-event-id="${button}"]`);
    console.log(foundButton);
    if (foundButton) {
        foundButton.classList.add("hover");
        await sleep(500);
        foundButton.click();
    }
}

function resetGame() {
    // reload page
    window.location.reload();
}

function solveGame() {
    document.querySelector("a.solve").click();
}

initAfterLoad(() => {
    setupInputBackend();

    // spoof input
    document.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            spoofInputBackend(4, "buttonStart");
        } else if (event.key === "Escape") {
            spoofInputBackend(4, "buttonHelp");
        } else if (event.key === "1") {
            spoofInputBackend(4, "buttonA");
        } else if (event.key === "2") {
            spoofInputBackend(4, "buttonB");
        } else if (event.key === "3") {
            spoofInputBackend(4, "buttonC");
        } else if (event.key === "4") {
            spoofInputBackend(4, "buttonD");
        }
    });

    // listen
    document.addEventListener("input:game4", onInput);

    // game specific
    colorOverwrite(document.querySelector("main"), configQuizWG.colorOverwrite);
    document.querySelector("h1").textContent = configQuizWG.questionText;

    resetTimer = new Timer(configGlobal.resetTimerSeconds, () => {
        // timeout is up, navigate back to start
        document.querySelector("a.reset").click();
    });
    resetTimer.start();

    new Game(configQuizWG.lifes[DIFFICULTY], ROUNDS, solveGame, onGameOver).start();
});
