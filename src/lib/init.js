export function initAfterLoad(cb) {
    if (document.readyState === "loading") {
        // Loading hasn't finished yet
        document.addEventListener("DOMContentLoaded", cb);
    } else {
        // `DOMContentLoaded` has already fired
        cb();
    }
}
