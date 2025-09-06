"use strict";
// --- First Promise ---
const firstPromise = new Promise((resolve, reject)=>{
    let settled = false;
    const timer = setTimeout(()=>{
        if (!settled) {
            settled = true;
            reject(new Error("First promise was rejected"));
        }
    }, 3000);
    document.addEventListener("click", ()=>{
        if (!settled) {
            settled = true;
            clearTimeout(timer);
            resolve("First promise was resolved");
        }
    });
});
// --- Second Promise ---
const secondPromise = new Promise((resolve)=>{
    function handleLeftClick(ev) {
        if (ev.button === 0) {
            document.removeEventListener("click", handleLeftClick);
            document.removeEventListener("contextmenu", handleRightClick);
            resolve("Second promise was resolved");
        }
    }
    function handleRightClick(ev) {
        if (ev.button === 2) {
            ev.preventDefault();
            document.removeEventListener("click", handleLeftClick);
            document.removeEventListener("contextmenu", handleRightClick);
            resolve("Second promise was resolved");
        }
    }
    document.addEventListener("click", handleLeftClick);
    document.addEventListener("contextmenu", handleRightClick);
});
// --- Third Promise ---
const thirdPromise = new Promise((resolve)=>{
    let leftClicked = false;
    let rightClicked = false;
    function handleLeftClick(ev) {
        if (ev.button === 0) {
            leftClicked = true;
            checkBoth();
        }
    }
    function handleRightClick(ev) {
        if (ev.button === 2) {
            ev.preventDefault();
            rightClicked = true;
            checkBoth();
        }
    }
    function checkBoth() {
        if (leftClicked && rightClicked) {
            document.removeEventListener("click", handleLeftClick);
            document.removeEventListener("contextmenu", handleRightClick);
            resolve("Third promise was resolved");
        }
    }
    document.addEventListener("click", handleLeftClick);
    document.addEventListener("contextmenu", handleRightClick);
});
// --- Обробники промісів для повідомлень ---
firstPromise.then((msg)=>{
    showNotification(msg, "success");
}).catch((err)=>{
    showNotification(err.message, "error");
});
secondPromise.then((msg)=>{
    showNotification(msg, "success");
});
thirdPromise.then((msg)=>{
    showNotification(msg, "success");
});
// --- Функція показу повідомлень ---
function showNotification(message, type) {
    const div = document.createElement("div");
    div.dataset.qa = "notification";
    div.className = type;
    div.textContent = message;
    document.body.appendChild(div);
    setTimeout(()=>{
        if (div.parentNode) div.remove();
    }, 3000);
}
// Додаємо обробник для завантаження сторінки
document.addEventListener("DOMContentLoaded", function() {});

//# sourceMappingURL=index.f75de5e1.js.map
