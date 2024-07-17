import { appendChildren } from "../../helper.js";

export class Game {
    constructor(lifes, rounds, roundsToWin, onWon, onGameOver) {
        this.roundPool = rounds.sort(() => Math.random() - 0.5);
        this.roundIndex = 0;
        this.roundsToWin = roundsToWin;
        this.wonRounds = 0;

        this.lifes = lifes;

        this.onWon = onWon;
        this.onGameOver = onGameOver;
    }

    renderLifes() {
        const container = document.querySelector("#lifes");
        if (!container) throw Error("Couldn't find lifes container.");

        container.innerHTML = "";

        const lifeNode = document.createElement("img");
        lifeNode.src =
            "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbDpzcGFjZT0icHJlc2VydmUiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDgyMiA3MjkuNSIgdmlld0JveD0iMCAwIDgyMiA3MjkuNSI+PHBhdGggZD0iTTc1NiA2Ni4zYy04OC40LTg4LjQtMjMxLjItODguNC0zMTkuNiAwbC0yNS4zIDI1LjMtMjUuMy0yNS4zYy04OC40LTg4LjQtMjMxLjItODguNC0zMTkuNiAwLTg4LjQgODguNC04OC40IDIzMS4yIDAgMzE5LjZsMzQzLjYgMzQzLjYgMzQzLjYtMzQzLjZjOTEtODguNCA5MS0yMzIuNCAyLjYtMzE5LjZ6IiBzdHlsZT0iZmlsbDojMDAwMDAwIi8+PC9zdmc+";
        lifeNode.classList.add("life");
        lifeNode.alt = "❤️";

        for (let i = 0; i < this.lifes; i++) {
            container.appendChild(lifeNode.cloneNode(true));
        }
    }

    renderProgress() {
        const container = document.querySelector("#progress");
        if (!container) throw Error("Couldn't find progress container.");

        container.innerHTML = `<span>${this.wonRounds}</span>&nbsp;/&nbsp;<span>${this.roundsToWin}</span> Fragen`;
    }

    pauseTimer() {
        this.roundPool[this.roundIndex]?.endTimer();
        document.querySelector("#timer")?.classList.add("interrupted");
    }

    unpauseTimer() {
        this.roundPool[this.roundIndex]?.startTimer();
        document.querySelector("#timer")?.classList.remove("interrupted");
    }

    getNextRound() {
        const round = this.roundPool[this.roundIndex];
        this.roundIndex++;
        if (this.roundIndex > this.roundPool.length) {
            console.log("No more rounds in round pool.");
            this.roundIndex = 0;
        }

        return round;
    }

    start() {
        let onFinish, onFail;

        onFinish = () => {
            this.wonRounds++;
            this.renderProgress();

            if (this.wonRounds < this.roundsToWin) {
                const round = this.getNextRound();
                round._applyCallbacks(onFinish, onFail);
                round.start();
            } else {
                this.onWon();
            }
        };

        onFail = () => {
            this.lifes--;
            this.renderLifes();
            this.renderProgress();

            if (this.lifes > 0) {
                const round = this.getNextRound();
                round._applyCallbacks(onFinish, onFail);
                round.start();
            } else {
                this.onGameOver();
            }
        };

        this.renderProgress();
        this.renderLifes();
        const round = this.getNextRound();
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

    _cleanup() {
        this.endTimer();

        const questionContainer = document.querySelector(".question-container");
        if (questionContainer) questionContainer.innerHTML = "";

        const answerContainer = document.querySelector(".answer-container");
        if (answerContainer) answerContainer.innerHTML = "";
        // replace container with itself to remove event listener
        answerContainer.replaceWith(answerContainer.cloneNode(true));
    }

    finish() {
        this._cleanup();
        this.onFinish();
    }

    fail() {
        this._cleanup();
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
                    el = document.createElement("h2");
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

    addTextButton(text, isCorrectAnswer, buttonEventId) {
        this.content.push({
            type: ANSWER_BUTTON_TYPES.TEXT,
            text,
            correct: isCorrectAnswer,
            id: this.elementIndex++,
            buttonEventId,
        });

        return this;
    }

    addImageButton(src, isCorrectAnswer, buttonEventId) {
        this.content.push({
            type: ANSWER_BUTTON_TYPES.IMAGE,
            src,
            correct: isCorrectAnswer,
            id: this.elementIndex++,
            buttonEventId,
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
                    el.setAttribute("data-button-event-id", c.buttonEventId);
                    el.innerHTML = `<div class="text-content"><span>${c.text}</span></div>`;
                    this._createButtonEventListener(el, "tp:answer-button-clicked");

                    outerEl = document.createElement("div");
                    outerEl.classList.add("button-content");
                    outerEl.dataset.label = c.buttonEventId.replace("button", "");
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
                    el.setAttribute("data-button-event-id", c.buttonEventId);
                    el.innerHTML = `<img src="${c.src}" />`;
                    this._createButtonEventListener(el, "tp:answer-button-clicked");

                    outerEl = document.createElement("div");
                    outerEl.classList.add("button-content");
                    outerEl.dataset.label = c.buttonEventId.replace("button", "");
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
