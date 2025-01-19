const word = "BLINK"; // Kullanıcının bulması gereken kelime
let score = 0;
let lives = 3;
let guessedLetters = [];

const scoreElement = document.getElementById("score");
const livesElement = document.getElementById("lives");
const predictionInput = document.getElementById("prediction");
const submitButton = document.getElementById("submit-btn");
const resetButton = document.getElementById("reset-btn");
const cards = Array.from(document.querySelectorAll(".card"));

function updateDisplay() {
    scoreElement.textContent = score;
    livesElement.textContent = "❤️".repeat(lives);
    cards.forEach((card, index) => {
        card.textContent = guessedLetters.includes(word[index]) ? word[index] : "";
    });
}

function handlePrediction() {
    const prediction = predictionInput.value.toUpperCase();
    predictionInput.value = "";

    if (prediction.length === 1) {
        if (word.includes(prediction)) {
            guessedLetters.push(prediction);
            score += 20;
        } else {
            lives--;
        }
    } else if (prediction === word) {
        score += 100;
        alert("Congratulations! You guessed the word!");
        return;
    } else {
        lives = 0;
        alert("Wrong guess! Game over.");
    }

    if (lives === 0) {
        alert("You lost! Reset the game to try again.");
    } else if (guessedLetters.length === new Set(word).size) {
        alert("You won! Reset the game to play again.");
    }

    updateDisplay();
}

function resetGame() {
    score = 0;
    lives = 3;
    guessedLetters = [];
    updateDisplay();
}

submitButton.addEventListener("click", handlePrediction);
resetButton.addEventListener("click", resetGame);

updateDisplay();
