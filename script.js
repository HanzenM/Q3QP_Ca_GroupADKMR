var playerHealth = 100;
var opponentHealth = 100;
var playerAction;
var fightResult;
var tossResult;
var playerChoose;
var opponentChoice;

function tossCoin() { // function tosses coin
    updateHealth() 
    document.getElementById('note').innerHTML = "Note: Both the player and the opponent are fighting so fast that you're not able to see them fight";
    var tossDecision = document.getElementById('tossDecision').value; //gets what side of the coin the user chose
    tossResult = Math.random(); //flips coin

    if (tossResult<0.5){ //checks if coin is head or tails
        tossResult = "head"
    } else {
        tossResult = "tail"
    }

    document.getElementById('tossReport').innerHTML = "Coin is " + tossResult + ". You chose " + tossDecision + "!"; //outputs result

    if (tossDecision==tossResult){ //disables or enables buttons depending on if you lost the coin flip or not
    document.getElementById('attackButton').disabled = false;
    document.getElementById('defendButton').disabled = true;
    document.getElementById('tossCoin').disabled = true;
    document.getElementById('tossDecision').disabled = true;
    } else {
    document.getElementById('attackButton').disabled = false;
    document.getElementById('defendButton').disabled = false;
    document.getElementById('tossCoin').disabled = true;
    document.getElementById('tossDecision').disabled = true;
    }
}

function calculateDamage() { //calculates damage from 0-5
    return Math.floor(Math.random() * 6);
}

function calculateBlockedDamage() { //calculates damage if player or opponent blocks from 0-3 
    return Math.floor(Math.random() * 4);
}

function fightSection(){ //outputs the results/actions of the fights
    if (document.getElementById("playerAction1").textContent == ""){
        document.getElementById("playerAction1").textContent = playerAction;
        document.getElementById("fightResult1").textContent = fightResult;
    } else if (document.getElementById("playerAction2").textContent == ""){
        document.getElementById("playerAction2").textContent = playerAction;
        document.getElementById("fightResult2").textContent = fightResult;
    } else if (document.getElementById("playerAction3").innerHTML == ""){
        document.getElementById("playerAction3").textContent = playerAction;
        document.getElementById("fightResult3").textContent = fightResult;
    } else if (document.getElementById("playerAction4").textContent == ""){
        document.getElementById("playerAction4").textContent = playerAction;
        document.getElementById("fightResult4").textContent = fightResult;
    } else {
        fightSectionReplace()
    }
}

function fightSectionReplace(){ //replaces new text with old text if theres no more space for it anymore
    document.getElementById("playerAction1").textContent = document.getElementById("playerAction2").textContent;
    document.getElementById("playerAction2").textContent = document.getElementById("playerAction3").textContent;
    document.getElementById("playerAction3").textContent = document.getElementById("playerAction4").textContent;
    document.getElementById("playerAction4").textContent = "";

    document.getElementById("fightResult1").textContent = document.getElementById("fightResult2").textContent;
    document.getElementById("fightResult2").textContent = document.getElementById("fightResult3").textContent;
    document.getElementById("fightResult3").textContent = document.getElementById("fightResult4").textContent;
    document.getElementById("fightResult4").textContent = "";

    fightSection()
}

function opponentAction() { //chooses what to output if player defends or attacks
    randomGeneration()
    if (playerChoose == 'defend'){
        playerDefend()
    } else {
        playerAttack()
    }
updateHealth()
checkHealth()
}

function playerAttack(){ //outputs the fight results and maybe subtracts health if player attacks
    randomGeneration()

    if (opponentChoice == 1) {
        if (playerDamage > 0 && opponentDamage > 0) {
            fightResult = "You inflict " + playerDamage + " damage. Opponent inflicts " + opponentDamage + " damage.";
            playerHealth -= opponentDamage;
            opponentHealth -= playerDamage;
        } 
        else if (playerDamage > 0){
            fightResult = "You inflict " + playerDamage + " damage. Opponent fails to inflict any damage.";
            opponentHealth -= playerDamage;
        }
        else if (opponentDamage > 0){
            fightResult = "You fail to inflict any damage. Opponent inflicts " + opponentDamage + " damage.";
            playerHealth -= opponentDamage;
        }
        else {
            fightResult = "Both you and the opponent fail to inflict any damage.";
        }
    }
    else {
        if (playerBlockedDamage > 0){
                fightResult = "You inflict " + playerBlockedDamage + " damage.";
                opponentHealth -= playerBlockedDamage;
        } else {
        fightResult = "The opponent completely blocked the attack!";
        }
    }
}

function playerDefend(){ //outputs the fight results and maybe subtracts health if player defends
    randomGeneration()

    if (opponentChoice == 1) {    
        if (opponentBlockedDamage > 0){
            fightResult = "Opponent inflicts " + opponentBlockedDamage + " damage.";
            playerHealth -= opponentBlockedDamage;
        }
        else {
        fightResult = "You completely blocked the opponent.";
        }
    } else {
        fightResult = "The opponent defended too";
    }
}

function randomGeneration(){ //generates random numbers for each variable
    opponentChoice = Math.floor(Math.random() * 2); //determines if opponent attacks or defends
    playerDamage = calculateDamage();
    opponentDamage = calculateDamage();
    playerBlockedDamage = calculateBlockedDamage();
    opponentBlockedDamage = calculateBlockedDamage();
}

function playerChoice(action){ //inputs if the player chooses attack or defend
    document.getElementById('defendButton').disabled = false;
    if (action == 'attack') {
        playerAction = "You will attack!";
        playerChoose = 'attack';
        opponentAction()
    } else if (action == 'defend') {
        playerAction = "You will defend!";
        playerChoose = 'defend';
        opponentAction()
    }

    fightSection()
}

function updateHealth(){ //updates health and health bar when health subtracts
    if (playerHealth<0){
        playerHealth = 0;
    } else {}
    if (opponentHealth<0){
        opponentHealth = 0;
    } else {}
    document.getElementById('playerHealth').innerHTML = "Player: " + playerHealth;
    document.getElementById('opponentHealth').innerHTML = "Opponent: " + opponentHealth;
    const playerHealthBar = document.getElementById("playerHealthBar");
    const opponentHealthBar = document.getElementById("opponentHealthBar");
    playerHealthBar.style.backgroundColor = "limegreen";
    opponentHealthBar.style.backgroundColor = "limegreen";
    playerHealthBar.style.width = playerHealth*0.4 + "%";
    opponentHealthBar.style.width = opponentHealth*0.4 + "%";
}

function checkHealth(){ //checks health if opponent or player health reaches 0, then the game ends and one side wins 
    if (playerHealth <= 0){
        document.getElementById('attackButton').disabled = true;
        document.getElementById('defendButton').disabled = true;
        document.getElementById('tossCoin').disabled = true;
        document.getElementById('tossDecision').disabled = true;
        document.getElementById('playerImage').src = 'images/playerdead.jpg'; 
        document.getElementById('playerImage').style.right = '30vw';
        document.getElementById('fightWinner').innerHTML = "Opponent Wins.";
        document.getElementById('opponentImage').src = 'images/opponentWin.jpg'; 
    } else if (opponentHealth <= 0){
        document.getElementById('attackButton').disabled = true;
        document.getElementById('defendButton').disabled = true;
        document.getElementById('tossCoin').disabled = true;
        document.getElementById('tossDecision').disabled = true;
        document.getElementById('opponentImage').src = 'images/opponentdead.jpg'; 
        document.getElementById('fightWinner').innerHTML = "Player Wins.";
        document.getElementById('playerImage').src = 'images/playerWin.webp'; 
        document.getElementById('playerImage').style.right = '40vw';
    } else {}
}

function resetGame() { //resets game and makes everything go back to default
    playerHealth = 100;
    opponentHealth = 100;
    document.getElementById('note').innerHTML = "";
    document.getElementById('playerHealth').innerHTML = "";
    document.getElementById('opponentHealth').innerHTML = "";
    document.getElementById('tossReport').innerHTML = "";
    document.getElementById("playerAction1").innerHTML = "";
    document.getElementById("playerAction2").innerHTML = "";
    document.getElementById("playerAction3").innerHTML = "";
    document.getElementById("playerAction4").innerHTML = "";
    document.getElementById("fightResult1").innerHTML = "";
    document.getElementById("fightResult2").innerHTML = "";
    document.getElementById("fightResult3").innerHTML = "";
    document.getElementById("fightResult4").innerHTML = "";
    document.getElementById('fightWinner').innerHTML = "";
    document.getElementById('attackButton').disabled = true;
    document.getElementById('defendButton').disabled = true;
    document.getElementById('tossCoin').disabled = false;
    document.getElementById('tossDecision').disabled = false;
    document.getElementById('playerImage').src = 'images/player.webp'; 
    document.getElementById('playerImage').style.right = '45vw';
    document.getElementById('opponentImage').src = 'images/opponent.jpg'; 
    playerHealthBar.style.width = 0;
    opponentHealthBar.style.width = 0;
}