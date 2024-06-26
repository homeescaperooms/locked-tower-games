import { appendChildren } from "../../helper.js";

export class Game {
    constructor(lives, rounds, onWon, onGameOver) {
        this.rounds = rounds;
        this.lives = lives;
        this.currentRound = 0;

        this.onWon = onWon;
        this.onGameOver = onGameOver;
    }

    renderLives() {
        const container = document.querySelector("#lives");
        if (!container) throw Error("Couldn't find lives container.");

        container.innerHTML = "";

        const liveNode = document.createElement("img");
        liveNode.src =
            "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbDpzcGFjZT0icHJlc2VydmUiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDgyMiA3MjkuNSIgdmlld0JveD0iMCAwIDgyMiA3MjkuNSI+PHBhdGggZD0iTTc1NiA2Ni4zYy04OC40LTg4LjQtMjMxLjItODguNC0zMTkuNiAwbC0yNS4zIDI1LjMtMjUuMy0yNS4zYy04OC40LTg4LjQtMjMxLjItODguNC0zMTkuNiAwLTg4LjQgODguNC04OC40IDIzMS4yIDAgMzE5LjZsMzQzLjYgMzQzLjYgMzQzLjYtMzQzLjZjOTEtODguNCA5MS0yMzIuNCAyLjYtMzE5LjZ6IiBzdHlsZT0iZmlsbDojZmYwMDFiIi8+PC9zdmc+";
        liveNode.classList.add("live");
        liveNode.alt = "❤️";

        for (let i = 0; i < this.lives; i++) {
            container.appendChild(liveNode.cloneNode(true));
        }
    }

    start() {
        let onFinish, onFail;

        onFinish = () => {
            this.currentRound++;

            if (this.currentRound < this.rounds.length) {
                const round = this.rounds[this.currentRound];
                round._applyCallbacks(onFinish, onFail);
                round.start();
            } else {
                this.onWon();
            }
        };

        onFail = () => {
            this.lives--;
            this.renderLives();

            if (this.lives > 0) {
                const round = this.rounds[this.currentRound];
                round._applyCallbacks(onFinish, onFail);
                round.restart();
            } else {
                this.onGameOver();
            }
        };

        this.renderLives();
        const round = this.rounds[this.currentRound];
        round._applyCallbacks(onFinish, onFail);
        round.start();
    }
}

export class Round {
    constructor(question, answer, meta) {
        this.question = question;
        this.answer = answer;
        this.meta = meta;

        this.timed = meta.timer && meta.timer > 0;
        this.timer = meta.timer;
        this.timerIv = null;

        this.onFinish;
        this.onFail;
    }

    _applyCallbacks(onFinish, onFail) {
        this.onFinish = onFinish;
        this.onFail = onFail;
    }

    startTimer() {
        const container = document.querySelector("#timer");
        if (!container) throw Error("Couldn't find timer container.");

        const renderTimer = () => {
            let minutes = Math.floor(this.timer / 60);
            let seconds = this.timer - minutes * 60;
            container.innerHTML = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
        };

        container.classList.remove("paused", "disabled");
        renderTimer();

        this.timerIv = setInterval(() => {
            if (container.classList.contains("paused")) {
                clearInterval(this.timerIv);
                this.timerIv = null;
            }

            this.timer--;
            renderTimer();

            if (this.timer < 0) {
                this.fail();
            }
        }, 1000);
    }

    endTimer() {
        clearInterval(this.timerIv);
        this.timerIv = null;
        const container = document.querySelector("#timer");
        if (container) container.classList.add("paused");
    }

    start() {
        if (this.timed) {
            this.startTimer();
        } else {
            const container = document.querySelector("#timer");
            if (container) {
                container.classList.add("disabled");
            }
        }

        const questionContainer = document.querySelector(".question-container");
        if (questionContainer) appendChildren(questionContainer, this.question.markup);

        const answerContainer = document.querySelector(".answer-container");
        if (answerContainer) appendChildren(answerContainer, this.answer.markup);

        answerContainer.addEventListener("tp:answer-button-clicked", (ev) => {
            console.log("this click correct", ev.detail.correct);
            if (ev.detail.correct) {
                this.finish();
            } else {
                this.fail();
            }
        });
    }

    restart() {
        const questionContainer = document.querySelector(".question-container");
        if (questionContainer) questionContainer.innerHTML = "";

        const answerContainer = document.querySelector(".answer-container");
        if (answerContainer) answerContainer.innerHTML = "";
        // replace container with itself to remove event listener
        answerContainer.replaceWith(answerContainer.cloneNode(true));

        this.timer = this.meta.timer;

        this.start();
    }

    finish() {
        this.endTimer();

        const questionContainer = document.querySelector(".question-container");
        if (questionContainer) questionContainer.innerHTML = "";

        const answerContainer = document.querySelector(".answer-container");
        if (answerContainer) answerContainer.innerHTML = "";
        // replace container with itself to remove event listener
        answerContainer.replaceWith(answerContainer.cloneNode(true));

        this.onFinish();
    }

    fail() {
        this.endTimer();
        this.onFail();
    }
}

const QUESTION_TYPES = {
    TEXT_STATIC: "text_static",
    TEXT_TYPEWRITER: "text_typewriter",
    IMAGE: "image",
    AUDIO: "audio",
};

export class Question {
    constructor() {
        this.content = [];
    }

    addStaticText(text) {
        this.content.push({
            type: QUESTION_TYPES.TEXT_STATIC,
            text,
        });

        return this;
    }

    addTypewriterText(text, speed = 2) {
        this.content.push({
            type: QUESTION_TYPES.TEXT_TYPEWRITER,
            text,
            speed,
        });

        return this;
    }

    addImage(src, scale = "100%") {
        this.content.push({
            type: QUESTION_TYPES.IMAGE,
            scale,
            src,
        });

        return this;
    }

    addAudio(src) {
        this.content.push({
            type: QUESTION_TYPES.AUDIO,
            src,
        });

        return this;
    }

    get markup() {
        let html = document.createElement("div");
        html.classList.add("question");

        for (const c of this.content) {
            let el, outerEl;

            switch (c.type) {
                case QUESTION_TYPES.TEXT_STATIC:
                    el = document.createElement("p");
                    el.innerHTML = c.text;

                    outerEl = document.createElement("div");
                    outerEl.classList.add("text-content");
                    outerEl.appendChild(el);

                    html.appendChild(outerEl);

                    break;
                case QUESTION_TYPES.TEXT_TYPEWRITER:
                    el = document.createElement("p");
                    el.classList.add("typewriter");
                    el.setAttribute("data-speed", c.speed);
                    el.innerHTML = c.text;

                    outerEl = document.createElement("div");
                    outerEl.classList.add("text-typewriter-content");
                    outerEl.appendChild(el);

                    html.appendChild(outerEl);
                    break;
                case QUESTION_TYPES.IMAGE:
                    el = document.createElement("img");
                    el.src = c.src;
                    el.style.setProperty("--scale", c.scale);

                    outerEl = document.createElement("div");
                    outerEl.classList.add("image-content");
                    outerEl.appendChild(el);

                    html.appendChild(outerEl);
                    break;
                case QUESTION_TYPES.AUDIO:
                    el = document.createElement("audio");
                    el.controls = true;
                    el.innerHTML = `<source src="${c.src}" type="audio/mpeg">`;

                    outerEl = document.createElement("div");
                    outerEl.classList.add("audio-content");
                    outerEl.appendChild(el);

                    html.appendChild(outerEl);
                    break;
            }
        }

        return html;
    }
}

const ANSWER_TYPES = {
    BUTTON_SET: "button_set",
    TEXT_INPUT: "text_input",
};

const ANSWER_BUTTON_TYPES = {
    TEXT: "text",
    IMAGE: "image",
};

export class Answer {
    constructor() {
        this.content = [];
        this.currentButtonSetContainer = null;

        this.elementIndex = 0;
    }

    startButtonSet(layout = "row", pictureScaleBase = "100%") {
        this.content.push({
            type: ANSWER_TYPES.BUTTON_SET,
            layout,
            pictureScaleBase,
            meta: "start",
        });

        return this;
    }

    endButtonSet() {
        this.content.push({
            type: ANSWER_TYPES.BUTTON_SET,
            meta: "end",
        });

        return this;
    }

    addTextButton(text, isCorrectAnswer) {
        this.content.push({
            type: ANSWER_BUTTON_TYPES.TEXT,
            text,
            correct: isCorrectAnswer,
            id: this.elementIndex++,
        });

        return this;
    }

    addImageButton(src, isCorrectAnswer) {
        this.content.push({
            type: ANSWER_BUTTON_TYPES.IMAGE,
            src,
            correct: isCorrectAnswer,
            id: this.elementIndex++,
        });

        return this;
    }

    _createButtonEventListener(el, eventName) {
        el.addEventListener("click", (ev) => {
            const event = new CustomEvent(eventName, {
                bubbles: true,
                detail: {
                    correct: el.getAttribute("data-correct") === "true",
                },
            });

            el.dispatchEvent(event);
        });
    }

    get markup() {
        let html = document.createElement("div");
        html.classList.add("answer");

        for (const c of this.content) {
            let el, outerEl;

            switch (c.type) {
                case ANSWER_TYPES.BUTTON_SET:
                    if (c.meta === "start") {
                        el = document.createElement("div");
                        el.classList.add("button-set");
                        el.style.setProperty("--layout", c.layout);
                        el.style.setProperty("--scale", c.pictureScaleBase);
                        html.appendChild(el);

                        this.currentButtonSetContainer = el;
                    } else if (c.meta === "end") {
                        this.currentButtonSetContainer = null;
                    }
                    break;
                case ANSWER_BUTTON_TYPES.TEXT:
                    el = document.createElement("button");
                    el.setAttribute("data-id", c.id);
                    el.setAttribute("data-correct", c.correct);
                    el.innerHTML = `<div class="text-content"><span>${c.text}</span></div>`;
                    this._createButtonEventListener(el, "tp:answer-button-clicked");

                    outerEl = document.createElement("div");
                    outerEl.classList.add("button-content");
                    outerEl.appendChild(el);

                    if (this.currentButtonSetContainer) {
                        this.currentButtonSetContainer.appendChild(outerEl);
                    } else {
                        throw new Error("Tried to create button outside of button set container.");
                        return -1;
                    }
                    break;
                case ANSWER_BUTTON_TYPES.IMAGE:
                    el = document.createElement("button");
                    el.setAttribute("data-id", c.id);
                    el.setAttribute("data-correct", c.correct);
                    el.innerHTML = `<img src="${c.src}" />`;
                    this._createButtonEventListener(el, "tp:answer-button-clicked");

                    outerEl = document.createElement("div");
                    outerEl.classList.add("button-content");
                    outerEl.appendChild(el);

                    if (this.currentButtonSetContainer) {
                        this.currentButtonSetContainer.appendChild(outerEl);
                    } else {
                        throw new Error("Tried to create button outside of button set container.");
                        return -1;
                    }
                    break;
            }
        }

        return html;
    }
}
