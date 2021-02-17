const nameUserDisplay = document.getElementById("name-user");
const game = document.getElementById("game");
const home = document.getElementById("home");
const tbody = document.querySelector("tbody");
let nameUser = "";
let mode = "";
let difficulty = "";
let listScore = [];

document.addEventListener("DOMContentLoaded", () => {
    init();
});

function init() {
    /**
     * Init Game
     * Var Globlas
     */

    if (localStorage.getItem("settings")) {
        nameUser = JSON.parse(localStorage.getItem("settings"))["name"];
        mode = JSON.parse(localStorage.getItem("settings"))["mode"];
        difficulty = JSON.parse(localStorage.getItem("settings"))["difficulty"];

        listScoreUser = [...JSON.parse(localStorage.getItem("listScore"))];
    }

    let total = 0;
    listScoreUser.forEach((value, index) => {
        let time = value.time;
        let hour = time.split("=")[1].split(":")[0] * 3600000;
        let minutes = time.split("=")[1].split(":")[1] * 60000;
        let seconds = time.split("=")[1].split(":")[2] * 1000;
        total = hour + minutes + seconds;
        listScoreUser[index].total = total;

        if (value.mode === "clasic") mode = "clasico";
        else mode = "Contra Tiempo";

        if (value.difficulty === "easy") difficulty = "Facil";
        else if (value.difficulty === "medium") difficulty = "Medio";
        else difficulty = "Dificil";

        tbody.innerHTML += `
        <tr>
        <th scope="row">${index}</th>
        <td>${value.name}</td>
        <td>${mode}</td>
        <td>${difficulty}</td>
        <td>${time.split("=")[1]}</td></tr>
        `;
    });

    nameUserDisplay.innerHTML = ` Bienvenido ${nameUser}`;

    game.addEventListener("click", () => (window.location = "./game.html"));
    home.addEventListener("click", () => {
        if (localStorage.getItem("settings"))
            localStorage.removeItem("settings");
        window.location = "./index.html";
    });
}
