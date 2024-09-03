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

function getPlayerChoice() {
    while (true) {
        playerChoice = String(prompt("Rock, Paper or Scissors?")).toLowerCase();
        if (playerChoice === "rock"
            || playerChoice === "paper"
            || playerChoice === "scissors") {
            return playerChoice;
        } else if (playerChoice === "null") {
            return;
        } else {
            alert("Please enter a valid choice.");
        }
    }
}

function getResult(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        console.log("It's a tie!");
        return 0;
    } else {
        switch (playerChoice) {
            case "rock":
                switch (computerChoice) {
                    case "paper":
                        console.log("You Lose! Paper beats Rock!");
                        return -1;
                    case "scissors":
                        console.log("You Win! Rock beats Scissors!");
                        return 1;
                }
            case "paper":
                switch (computerChoice) {
                    case "scissors":
                        console.log("You Lose! Scissors beat Paper!");
                        return -1;
                    case "rock":
                        console.log("You Win! Paper beats Rock!");
                        return 1;
                }
            case "scissors":
                switch (computerChoice) {
                    case "rock":
                        console.log("You Lose! Rock beats Scissors!");
                        return -1;
                    case "paper":
                        console.log("You Win! Scissors beat Paper!");
                        return 1;
                }
        }
    }
}

function playRound() {
    playerChoice = getPlayerChoice();
    computerChoice = getComputerChoice();
    return getResult(playerChoice, computerChoice);
}

function game() {
    gamesPlayed = 0;
    computerScore = 0;
    playerScore = 0;
    while (gamesPlayed < 5) {
        switch (playRound()) {
            case -1:
                computerScore++;
                break;
            case 0:
                computerScore += 0.5;
                playerScore += 0.5;
                break;
            case 1:
                playerScore++;
                break;
        }
        gamesPlayed++;
    }
    console.log("Your Score: " + playerScore);
    console.log("Computer Score: " + computerScore);
    if (playerScore > computerScore) {
        console.log("You Win!");
    } else if (playerScore === computerScore) {
        console.log("It's a tie!");
    } else {
        console.log("You Lose!");
    }
}
