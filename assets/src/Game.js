const cards = [];
const backgroundCard = [];
let listScoreUser = [];
const containerCards = document.querySelector("#container-cards");
const nameUserDisplay = document.getElementById("name-user");
let countClicks = 0;
let score = 0;
let firstClick = "";
let secondClick = "";
let nameUser = "";
let mode = "";
let difficulty = "";
let numberPairsCards = 4;
let seconds = 0;
let minutes = 0;
let hours = 0;
let time = null;
let labelTime = ``;
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
    } else {
        window.location = "./index.html";
    }
    time = setInterval(() => {
        seconds++;
        labelTime = `Tiempo =  0${hours} : 0${minutes} : 0${seconds}`;

        if (seconds === 60) {
            seconds = 0;
            minutes++;
        }
        if (minutes === 60) {
            minutes = 0;
            hours++;
        }

        if (seconds > 9)
            labelTime = `Tiempo =  0${hours}: 0${minutes} : ${seconds}`;
        if (minutes > 9)
            labelTime = `Tiempo = 0${hours} : ${minutes} : ${seconds}`;
        if (hours > 9)
            labelTime = `Tiempo = ${hours} : ${minutes} : ${seconds}`;

        nameUserDisplay.innerHTML = ` Bienvenido ${nameUser} <br /> ${labelTime}`;
    }, 1000);

    switch (difficulty) {
        case "easy":
            numberPairsCards = 4;
            break;

        case "medium":
            numberPairsCards = 8;
            break;
        case "hard":
            numberPairsCards = 12;
            break;
    }

    for (let i = 0; i < numberPairsCards; i++) cards.push(`${i + 1}`);

    const totalCards = [...cards, ...cards];
    shuffle(totalCards);

    totalCards.forEach((value, index) => {
        let obj = {
            bg: "0.jpg",
            id: totalCards[index],
        };
        backgroundCard.push(obj);
    });

    /**
     * print cards DOM
     */

    printCardsDOM();

    /**
     * click cards
     */

    containerCards.addEventListener("click", (e) => {
        if (e.target.classList.contains("card-img")) {
            countClicks++;

            //Obtener datos img
            const img = e.target;
            const idImg = img.getAttribute("data-id");

            for (let card of backgroundCard)
                if (card.id === idImg)
                    img.setAttribute("src", `./assets/img/${idImg}.jpg`);

            evalueCountClicks(img);
            verifyScore();
        }
    });
}
function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}
function printCardsDOM() {
    let templateHTML = "";
    backgroundCard.forEach((value, index) => {
        templateHTML += `
            <section class="container-card ">
                <img class="card-img" src="./assets/img/${value.bg}" data-id="${value.id}" data-number="${index}" alt="${index}">
            </section>
        `;
    });
    containerCards.innerHTML = templateHTML;
}
function evalueCountClicks(img) {
    if (countClicks === 1) {
        firstClick = img;
    } else if (countClicks === 2) {
        secondClick = img;

        let firstDataNumber = firstClick.getAttribute("data-number");
        let secondDataNumber = secondClick.getAttribute("data-number");

        if (firstDataNumber === secondDataNumber) {
            secondClick = null;
            countClicks--;
            return;
        }
        countClicks = 0;
        score += compareCards();
    }
}

function compareCards() {
    let score = 0;
    let firstDataID = firstClick.getAttribute("data-id");
    let secondDataID = secondClick.getAttribute("data-id");

    if (firstDataID === secondDataID) {
        score++;
        createToast("alert-success", "Muy bien", "Las cartas  son iguales.");
    } else {
        setTimeout(() => {
            firstClick.setAttribute("src", "./assets/img/0.jpg");
            secondClick.setAttribute("src", "./assets/img/0.jpg");
        }, 1000);
        createToast("alert-danger", "Error", "Las cartas no son iguales.");
    }
    return score;
}

function createToast(type, title, text) {
    const alert = document.querySelector("#alert");
    alert.innerHTML = `<div class="alert ${type}" id="alert"> <strong> ${title}</strong> ${text}</div>`;

    setTimeout(() => {
        alert.removeChild(alert.firstChild);
    }, 800);
}
function verifyScore() {
    if (score === numberPairsCards) {
        clearInterval(time);
        const alert = document.querySelector("#score");

        alert.innerHTML = `
            <div class="alert text-center alert-success" role="alert">
            <h4 class="alert-heading">Muy bien!</h4>
            <p>Haz logrado terminar el juego con un tiempo de: ${labelTime} .</p>
            <hr>
            <a class="btn btn-primary" href="./game.html">Volver a jugar</a>
            <a class="btn btn-outline-secondary" href="./score.html">Puntaje</a>
        </div>
        `;

        if (localStorage.getItem("listScore")) {
            listScoreUser = [...JSON.parse(localStorage.getItem("listScore"))];
        }

        const scoreUltimateUser = {
            id: Date.now(),
            name: nameUser,
            score,
            time: labelTime,
            mode,
            difficulty,
        };
        listScoreUser.push(scoreUltimateUser);
        localStorage.setItem("listScore", JSON.stringify(listScoreUser));
    }
}

function reinicieGame() {
    window.location.reload();
}
