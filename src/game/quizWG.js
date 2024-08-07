import "../fonts.css";
import "../lib/style.css";
//import "../lib/teapot/style.css";

import { configQuizWG } from "../../config.js";
import { sleep } from "../helper.js";
import { colorOverwrite } from "../lib/color.js";
import { setupInputBackend, spoofInputBackend } from "../lib/control/control.js";
import { getDifficulty, setupDifficultyListener } from "../lib/difficulty.js";
import { initAfterLoad } from "../lib/init.js";
import { hideModal, showModal } from "../lib/meta/modal.js";
import { Answer, Game, Question, Round } from "../lib/teapot/types.js";
import { Timer } from "../lib/timer/timer.js";

const DIFFICULTY = getDifficulty();
let game;

const ROUNDS = [];
for (const question of configQuizWG.questionPool) {
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
                timer: question.timer[DIFFICULTY],
            }
        );
        ROUNDS.push(r);
    }
}

const onGameOver = () => {
    document.querySelector(".question-container").innerHTML = `<p class="game-over">${configQuizWG.gameOverText}</p>`;

    document.querySelector(".answer-container").innerHTML = ``;
    document.querySelector("#timer")?.classList.add("disabled");

    game?.pauseTimer(false);
    anyButtonRestarts = true;
};

let helpModal;
let resetTimer;
let anyButtonRestarts = false;
let blockAllInputs = false;

async function onInput({ detail }) {
    const button = detail.button;
    console.log("btn", button);

    // blocking inputs
    if (blockAllInputs) return;

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
            blockView(false);
            hideModal(helpModal);
            helpModal = null;
        } else {
            helpModal = showModal({
                text: configQuizWG.helpText[DIFFICULTY],
            });
            blockView(true);
        }
    }

    // Disallow other key events when help is shown
    if (helpModal) return;

    // try to find button with this id
    const foundButton = document.querySelector(`button[data-button-event-id="${button}"]`);
    console.log(foundButton);
    if (foundButton) {
        blockAllInputs = true;
        game.pauseTimer();

        document.querySelectorAll("button").forEach((b) => b.parentElement.classList.add("disabled"));
        foundButton.parentElement.classList.remove("disabled");
        foundButton.classList.add("hover");
        await sleep(700);

        const willBeCorrect = foundButton.dataset.correct === "true";

        if (willBeCorrect) {
            foundButton.parentElement.classList.add("click-correct");
            await sleep(200);
        } else {
            foundButton.parentElement.classList.add("click-incorrect");
            await sleep(700);

            // find the right button
            const correctButton = document.querySelector(`button[data-correct="true"]`);
            correctButton.parentElement.classList.add("click-hint-correct");
            correctButton.parentElement.classList.remove("disabled");
        }

        await sleep(1500);
        foundButton.click();
        blockAllInputs = false;
        game.unpauseTimer();
    }
}

function blockView(doBlock) {
    if (doBlock) {
        document.querySelector("article").classList.add("blocked");
        game.pauseTimer(true);
    } else {
        document.querySelector("article").classList.remove("blocked");
        game.unpauseTimer();
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
    setupDifficultyListener();
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

    game = new Game(configQuizWG.lifes[DIFFICULTY], ROUNDS, configQuizWG.roundAmount[DIFFICULTY], solveGame, onGameOver);
    game.start();
});
