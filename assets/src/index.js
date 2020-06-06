document.addEventListener('DOMContentLoaded', () => {
    init();
})
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


    for (let i = 0; i < 4; i++)
        cards.push(`${(i + 1)}`)

    const totalCards = [...cards, ...cards];
    shuffle(totalCards)
    
    for (let i = 0; i < totalCards.length; i++){

        let obj = {
            "bg" : "0.jpg",
            "id" : totalCards[i]
        }
        backgroundCard.push(obj);
    }

    /**
     * print cards DOM
    */
    let templateHTML = "";
    backgroundCard.forEach((value) => {


        templateHTML += `
            <section class="container-card ">
                <img class="card-img" src="./assets/img/${value.bg}" height="300" data-id="${value.id}" alt="">
            </section>
        `
    })

    containerCards.innerHTML = templateHTML;


    /**
     * click cards
     */

    containerCards.addEventListener('click', e => {

        if (e.target.classList.contains("card-img")) {

            countClicks++;

            //Obtener datos img
            const img = e.target;
            const idImg = img.getAttribute('data-id');

            // Cambiar la img de fondo
            switch (idImg) {
                case "1":
                    img.setAttribute('src', `./assets/img/${idImg}.jpg`)
                    break;
                case "2":
                    img.setAttribute('src', `./assets/img/${idImg}.jpg`)
                    break;
                case "3":
                    img.setAttribute('src', `./assets/img/${idImg}.jpg`)
                    break;
                case "4":
                    img.setAttribute('src', `./assets/img/${idImg}.jpg`)
                    break;

                default:
                    break;
            }



            if (countClicks === 1)

                firstClick = img;

            else if (countClicks === 2) {

                secondClick = img;


                /**
                 * compare id cards
                 * 
                 */


                if (firstClick.getAttribute('data-id') === secondClick.getAttribute('data-id')) {
                    score++;
                    countClicks = 0;

                } else {

                    setTimeout(() => {
                        firstClick.setAttribute('src', './assets/img/0.jpg');
                        secondClick.setAttribute('src', './assets/img/0.jpg');

                        countClicks = 0;
                    }, 1000);

                }
            }

            if (score === 4) {
                const btnResetGame = document.getElementById('resetGame');
                const alert = document.getElementById('alert');

                alert.innerHTML = `
                    <div class="alert alert-success">
                        Felicidades has ganado!!!
                    </div>
                `

                btnResetGame.style.display = 'block'

                btnResetGame.addEventListener('click',()=>{
                    window.location.reload();
                })

            }

        }
    })
}
