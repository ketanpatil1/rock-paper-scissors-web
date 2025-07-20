let cpuScore = 0;
let playerScore = 0;

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function getCpuChoice() {
    cpuChoice = getRandomInt(3);
    switch (cpuChoice) {
        case 0:
            return "rock";
        case 1:
            return "paper";
        case 2:
            return "scissors";
    }
}

const playerScoreDisplay = document.querySelector(".player-score");
const cpuScoreDisplay = document.querySelector(".cpu-score");
playerScoreDisplay.textContent = playerScore;
cpuScoreDisplay.textContent = cpuScore;

const playerChoiceDisplay = document.querySelector(".player-choice-icon");
const cpuChoiceDisplay = document.querySelector(".cpu-choice-icon");

const roundResultDisplay = document.querySelector(".round-result");

const options = document.querySelectorAll(".option");
for (option of options) {
    option.addEventListener ("click", (e) => {
        if (playerScore == 5 || cpuScore == 5) {
            playerScore = 0;
            cpuScore = 0;
        }
        playerChoice = e.target.parentElement.id;
        switch (playRound(playerChoice)) {
            case -1:
                cpuScore++;
                break;
            case 0:
                break;
            case 1:
                playerScore++;
                break;
        }

        playerChoiceDisplay.src = `./assets/${playerChoice}.svg`;
        playerChoiceDisplay.alt = `Player chose ${playerChoice}`;
        cpuChoiceDisplay.src = `./assets/${cpuChoice}.svg`;
        cpuChoiceDisplay.alt = `CPU chose ${cpuChoice}`;

        playerScoreDisplay.textContent = playerScore;
        cpuScoreDisplay.textContent = cpuScore;

        if (playerScore >= 5) {
            if (cpuScore >= 5) {
                alert("It's a tie!");
                newGame();
            } else {
                alert("You Win!");
                newGame();
            }
        } else if (cpuScore >= 5) {
            alert("You Lose!");
            newGame();
        }
    });
};

function getResult(playerChoice, cpuChoice) {
    if (playerChoice === cpuChoice) {
        roundResultDisplay.textContent = "It's a tie!";
        roundResultDisplay.classList.remove("failure", "success");
        return 0;
    } else {
        switch (playerChoice) {
            case "rock":
                switch (cpuChoice) {
                    case "paper":
                        roundResultDisplay.textContent = "You Lose! Paper beats Rock!";
                        roundResultDisplay.classList.remove("success");
                        roundResultDisplay.classList.add("failure");
                        return -1;
                    case "scissors":
                        roundResultDisplay.textContent = "You Win! Rock beats Scissors!";
                        roundResultDisplay.classList.remove("failure");
                        roundResultDisplay.classList.add("success");
                        return 1;
                }
            case "paper":
                switch (cpuChoice) {
                    case "scissors":
                        roundResultDisplay.textContent = "You Lose! Scissors beat Paper!";
                        roundResultDisplay.classList.remove("success");
                        roundResultDisplay.classList.add("failure");
                        return -1;
                    case "rock":
                        roundResultDisplay.textContent = "You Win! Paper beats Rock!";
                        roundResultDisplay.classList.remove("failure");
                        roundResultDisplay.classList.add("success");
                        return 1;
                }
            case "scissors":
                switch (cpuChoice) {
                    case "rock":
                        roundResultDisplay.textContent = "You Lose! Rock beats Scissors!";
                        roundResultDisplay.classList.remove("success");
                        roundResultDisplay.classList.add("failure");
                        return -1;
                    case "paper":
                        roundResultDisplay.textContent = "You Win! Scissors beat Paper!";
                        roundResultDisplay.classList.remove("failure");
                        roundResultDisplay.classList.add("success");
                        return 1;
                }
        }
    }
}

function playRound(playerChoice) {
    cpuChoice = getCpuChoice();
    return getResult(playerChoice, cpuChoice);
}

function newGame() {
    roundResultDisplay.textContent = "New Game Started!";
    playerScoreDisplay.textContent = 0;
    cpuScoreDisplay.textContent = 0;
    playerChoiceDisplay.src = './assets/default.svg';
    playerChoiceDisplay.alt = 'No choice made yet';
    cpuChoiceDisplay.src = './assets/default.svg';
    cpuChoiceDisplay.alt = 'No choice made yet';

    roundResultDisplay.classList.remove("failure", "success");
}
