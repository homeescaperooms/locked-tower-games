export function appendChildren(newParent, oldParent) {
    const len = oldParent.children.length;

    for (let i = 0; i < len; i++) {
        newParent.appendChild(oldParent.firstChild);
    }
}

export async function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export function shuffle(array) {
    let currentIndex = array.length;
    let randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
}

export function randomBetween(min, max) {
    return Math.random() * (max - min) + min;
}
