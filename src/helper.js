export function appendChildren(newParent, oldParent) {
    const len = oldParent.children.length;

    for (let i = 0; i < len; i++) {
        newParent.appendChild(oldParent.firstChild);
    }
}

export async function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
