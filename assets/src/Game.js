const cards = [];
const backgroundCard = [];
const containerCards = document.querySelector("#container-cards");
let countClicks = 0;
let score = 0;
let firstClick = "";
let secondClick = "";
let name = "";
let mode = "";
let difficulty = "";
let numberPairsCards = 4;
document.addEventListener("DOMContentLoaded", () => {
    init();
});

function init() {
    /**
     * Init Game
     * Var Globlas
     */

    if (localStorage.getItem("settings")) {
        name = JSON.parse(localStorage.getItem("settings"))["name"];
        mode = JSON.parse(localStorage.getItem("settings"))["mode"];
        difficulty = JSON.parse(localStorage.getItem("settings"))["difficulty"];
    }

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
                <img class="card-img shadow-sm rounded" src="./assets/img/${value.bg}" data-id="${value.id}" data-number="${index}" alt="${index}">
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
    } else {
        setTimeout(() => {
            firstClick.setAttribute("src", "./assets/img/0.jpg");
            secondClick.setAttribute("src", "./assets/img/0.jpg");
        }, 1000);
    }
    return score;
}

function verifyScore() {
    if (score === numberPairsCards) {
        const alert = document.getElementById("alert");

        alert.innerHTML = `
            <div class="alert text-center alert-success" role="alert">
            <h4 class="alert-heading">Muy bien!</h4>
            <p>Haz logrado terminar el juego con un tiempo de: 0:0 .</p>
            <hr>
            <button id="btnREiniceGame" class="btn btn-outline-secondary mb-0">¿Deseas volver a jugar?</button>
        </div>
        `;
    }
}

function reinicieGame() {
    window.location.reload();
}
