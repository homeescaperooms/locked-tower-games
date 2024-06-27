export class Timer {
    constructor(time, cbOnFinished) {
        this.initialTime = time;
        this.time = time;
        this.cbOnFinished = cbOnFinished;
        this.interval = null;
    }

    start() {
        console.log(`Timer started with ${this.time} seconds.`);
        this.interval = setInterval(() => {
            this.time--;
            if (this.time <= 0) {
                this.stop();
                this.cbOnFinished();
            }
        }, 1000);
    }

    stop() {
        clearInterval(this.interval);
    }

    reset() {
        this.time = this.initialTime;
    }

    getTime() {
        return this.time;
    }
}
