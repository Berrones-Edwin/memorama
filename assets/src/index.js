document.addEventListener("DOMContentLoaded", () => init());

function init() {
    const form = document.querySelector("#form");
    const name = document.querySelector("#name");
    const mode = document.querySelector('input[name="mode"]:checked');
    const difficulty = document.querySelector(
        'input[name="difficulty"]:checked'
    );

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const data = new FormData(form);

        const settingsUser = {
            name: data.get("name"),
            mode: data.get("mode"),
            difficulty: data.get("difficulty"),
        };
        localStorage.setItem("settings", JSON.stringify(settingsUser));

        window.location.href = "./game.html";
    });
}
