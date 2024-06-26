export function infoButton() {
    let button = document.createElement("a");

    let img = document.createElement("img");
    img.src =
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzODYgMzg2Ij48cGF0aCBkPSJNMTkzIDI3YzQ0LjM0IDAgODYuMDMgMTcuMjcgMTE3LjM4IDQ4LjYyQzM0MS43MyAxMDYuOTcgMzU5IDE0OC42NiAzNTkgMTkzcy0xNy4yNyA4Ni4wMy00OC42MiAxMTcuMzhDMjc5LjAzIDM0MS43MyAyMzcuMzQgMzU5IDE5MyAzNTlzLTg2LjAzLTE3LjI3LTExNy4zOC00OC42MkM0NC4yNyAyNzkuMDMgMjcgMjM3LjM0IDI3IDE5M3MxNy4yNy04Ni4wMyA0OC42Mi0xMTcuMzhDMTA2Ljk3IDQ0LjI3IDE0OC42NiAyNyAxOTMgMjdtMC0yN0M4Ni40MSAwIDAgODYuNDEgMCAxOTNzODYuNDEgMTkzIDE5MyAxOTMgMTkzLTg2LjQxIDE5My0xOTNTMjk5LjU5IDAgMTkzIDBaIi8+PHBhdGggZD0iTTE3MC4xMSA3MC41Nmg0NS43OHY0NS43OGgtNDUuNzh6TTE3MC4xMSAxNTAuMTFoNDUuNzh2MTY1LjMzaC00NS43OHoiLz48cGF0aCBkPSJNMTcwLjExIDcwLjU2aDQ1Ljc4djQ1Ljc4aC00NS43OHoiLz48cGF0aCBkPSJNMjE0Ljg5IDcxLjU2djQzLjc4aC00My43OFY3MS41Nmg0My43OG0xLTFoLTQ1Ljc4djQ1Ljc4aDQ1Ljc4VjcwLjU2Wk0xNzAuMTEgMTUwLjExaDQ1Ljc4djE2NS4zM2gtNDUuNzh6Ii8+PHBhdGggZD0iTTIxNC44OSAxNTEuMTF2MTYzLjMzaC00My43OFYxNTEuMTFoNDMuNzhtMS0xaC00NS43OHYxNjUuMzNoNDUuNzhWMTUwLjExWiIvPjwvc3ZnPg==";
    img.alt = "ℹ️";
    button.style.cssText = `position: absolute; top: 8px; right: 8px; user-select: none; cursor: pointer; width: 40px; height: 40px; z-index: 2000;`;

    button.appendChild(img);
    document.body.appendChild(button);

    return {
        click: (handler) => {
            button.addEventListener("click", (ev) => {
                handler(ev);
            });
        },
    };
}
