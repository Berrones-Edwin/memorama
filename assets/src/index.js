document.addEventListener("DOMContentLoaded", () => {
    init();
});
function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

function init() {
    /**
     * Init Game
     * Var Globlas
     */
    const cards = [];
    const backgroundCard = [];
    const containerCards = document.querySelector("#container-cards");
    let countClicks = 0;
    let score = 0;
    let firstClick = "";
    let secondClick = "";

    for (let i = 0; i < 4; i++) cards.push(`${i + 1}`);

    const totalCards = [...cards, ...cards];
    shuffle(totalCards);

    for (let i = 0; i < totalCards.length; i++) {
        let obj = {
            bg: "0.jpg",
            id: totalCards[i],
        };
        backgroundCard.push(obj);
    }

    /**
     * print cards DOM
     */
    let templateHTML = "";
    backgroundCard.forEach((value, index) => {
        templateHTML += `
            <section class="container-card ">
                <img class="card-img" src="./assets/img/${value.bg}" height="300" data-id="${value.id}" data-number="${index}" alt="">
            </section>
        `;
    });

    containerCards.innerHTML = templateHTML;

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
                countClicks =  0
                score +=  compareCards(firstClick, secondClick);
            }
            verifyScore(score);
        }
    });
}

function compareCards(first, second) {
    let score = 0;
    let firstDataID = first.getAttribute("data-id");
    let secondDataID = second.getAttribute("data-id");


    if (firstDataID === secondDataID) {
        score++;
    } else {
        setTimeout(() => {
            first.setAttribute("src", "./assets/img/0.jpg");
            second.setAttribute("src", "./assets/img/0.jpg");
        }, 1000);
    }
    return score;
}

function verifyScore(score) {
    console.log(score)
    if (score === 4) {
        const btnResetGame = document.getElementById("resetGame");
        const alert = document.getElementById("alert");

        alert.innerHTML = `
            <div class="alert alert-success">
                Felicidades has ganado!!!
            </div>
        `;

        btnResetGame.style.display = "block";

        btnResetGame.addEventListener("click", () => {
            window.location.reload();
        });
    }
}
