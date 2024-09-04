let computerScore = 0;
let playerScore = 0;

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function getComputerChoice() {
    computerChoice = getRandomInt(3);
    switch (computerChoice) {
        case 0:
            return "rock";
        case 1:
            return "paper";
        case 2:
            return "scissors";
    }
}

const playerScoreDisplay = document.querySelector(".player-score");
const computerScoreDisplay = document.querySelector(".computer-score");
playerScoreDisplay.textContent = playerScore;
computerScoreDisplay.textContent = computerScore;

const playerChoiceDisplay = document.querySelector(".player-choice-icon");
const computerChoiceDisplay = document.querySelector(".computer-choice-icon");

const roundResultDisplay = document.querySelector(".round-result");

const options = document.querySelectorAll(".option");
for (option of options) {
    option.addEventListener ("click", (e) => {
        if (playerScore == 5 || computerScore == 5) {
            playerScore = 0;
            computerScore = 0;
        }
        playerChoice = e.target.parentElement.id;
        switch (playRound(playerChoice)) {
            case -1:
                computerScore++;
                break;
            case 0:
                break;
            case 1:
                playerScore++;
                break;
        }

        playerChoiceDisplay.textContent = playerChoice;
        computerChoiceDisplay.textContent = computerChoice;

        playerScoreDisplay.textContent = playerScore;
        computerScoreDisplay.textContent = computerScore;

        if (playerScore >= 5) {
            if (computerScore >= 5) {
                alert("It's a tie!");
            } else {
                alert("You Win!");
            }
        } else if (computerScore >= 5) {
            alert("You Lose!");
        }
    });
};

function getResult(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        roundResultDisplay.textContent = "It's a tie!";
        return 0;
    } else {
        switch (playerChoice) {
            case "rock":
                switch (computerChoice) {
                    case "paper":
                        roundResultDisplay.textContent = "You Lose! Paper beats Rock!";
                        return -1;
                    case "scissors":
                        roundResultDisplay.textContent = "You Win! Rock beats Scissors!";
                        return 1;
                }
            case "paper":
                switch (computerChoice) {
                    case "scissors":
                        roundResultDisplay.textContent = "You Lose! Scissors beat Paper!";
                        return -1;
                    case "rock":
                        roundResultDisplay.textContent = "You Win! Paper beats Rock!";
                        return 1;
                }
            case "scissors":
                switch (computerChoice) {
                    case "rock":
                        roundResultDisplay.textContent = "You Lose! Rock beats Scissors!";
                        return -1;
                    case "paper":
                        roundResultDisplay.textContent = "You Win! Scissors beat Paper!";
                        return 1;
                }
        }
    }
}

function playRound(playerChoice) {
    computerChoice = getComputerChoice();
    return getResult(playerChoice, computerChoice);
}
