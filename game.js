let cpuScore = 0;
let playerScore = 0;

const dialog = document.querySelector('dialog');
dialog.showModal();
dialog.addEventListener("click", (e) => {
    if (e.target === dialog) {
        dialog.close();
    }
});
const closeModalButton = document.querySelector('dialog button');
closeModalButton.addEventListener("click", () => {
    dialog.close();
});
const helpBtn = document.querySelector('.help-btn');
helpBtn.addEventListener("click", () => {
    dialog.showModal();
});


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
const roundResult = document.createElement("p");
const roundResultReason = document.createElement("p");
roundResultDisplay.append(roundResult);
roundResultDisplay.append(roundResultReason);

const options = document.querySelectorAll(".option");
for (let option of options) {
    option.addEventListener ("click", (e) => {
        if (playerScore == 5 || cpuScore == 5) {
            playerScore = 0;
            cpuScore = 0;
        }
        playerChoice = option.id;
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

document.addEventListener("keypress", (e) => {
    if (!dialog.open) {
        let button;
        switch (e.key) {
            case "1":
            case "r":
                button = options[0];
                break;
            case "2":
            case "p":
                button = options[1];
                break;
            case "3":
            case "s":
                button = options[2];
                break;
            default:
                break;
        }
        button.classList.add("active");
        button.click();
    }
});
document.addEventListener("keyup", (e) => {
    for (const option of options) {
        option.classList.remove("active");
    }
});

function getResult(playerChoice, cpuChoice) {
    if (playerChoice === cpuChoice) {
        roundResult.textContent = "It's a tie!";
        roundResultReason.textContent = "";
        roundResultDisplay.classList.remove("failure", "success");
        return 0;
    } else {
        switch (playerChoice) {
            case "rock":
                switch (cpuChoice) {
                    case "paper":
                        roundResult.textContent = "You Lose!";
                        roundResultReason.textContent = "Paper beats Rock!";
                        roundResultDisplay.classList.remove("success");
                        roundResultDisplay.classList.add("failure");
                        return -1;
                    case "scissors":
                        roundResult.textContent = "You Win!";
                        roundResultReason.textContent = "Rock beats Scissors!";
                        roundResultDisplay.classList.remove("failure");
                        roundResultDisplay.classList.add("success");
                        return 1;
                }
            case "paper":
                switch (cpuChoice) {
                    case "scissors":
                        roundResult.textContent = "You Lose!";
                        roundResultReason.textContent = "Scissors beat Paper!";
                        roundResultDisplay.classList.remove("success");
                        roundResultDisplay.classList.add("failure");
                        return -1;
                    case "rock":
                        roundResult.textContent = "You Win!";
                        roundResultReason.textContent = "Paper beats Rock!";
                        roundResultDisplay.classList.remove("failure");
                        roundResultDisplay.classList.add("success");
                        return 1;
                }
            case "scissors":
                switch (cpuChoice) {
                    case "rock":
                        roundResult.textContent = "You Lose!";
                        roundResultReason.textContent = "Rock beats Scissors!";
                        roundResultDisplay.classList.remove("success");
                        roundResultDisplay.classList.add("failure");
                        return -1;
                    case "paper":
                        roundResult.textContent = "You Win!";
                        roundResultReason.textContent = "Scissors beat Paper!";
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
    roundResult.textContent = "New Game Started!";
    roundResultReason.textContent = "";
    playerScoreDisplay.textContent = 0;
    cpuScoreDisplay.textContent = 0;
    playerChoiceDisplay.src = './assets/default.svg';
    playerChoiceDisplay.alt = 'No choice made yet';
    cpuChoiceDisplay.src = './assets/default.svg';
    cpuChoiceDisplay.alt = 'No choice made yet';

    roundResultDisplay.classList.remove("failure", "success");
}
newGame()
