var playerHealth = 100;
var opponentHealth = 100;
var playerAction;
var fightResult;
var tossResult;
var blockChance;
var playerChoose;
var opponentChoice;

function tossCoin() {
    updateHealth()
    var tossDecision = document.getElementById('tossDecision').value;
    tossResult = Math.random();

    if (tossResult<0.5){
        tossResult = "head"
    } else {
        tossResult = "tail"
    }

    document.getElementById('tossReport').innerHTML = "Coin is " + tossResult + ". You chose " + tossDecision + "!";

    if (tossDecision==tossResult){
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

function calculateDamage() {
    return Math.floor(Math.random() * 6);
}

function calculateBlockedDamage() {
    return Math.floor(Math.random() * 4);
}

function fightSection(){
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

function fightSectionReplace(){
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

function opponentAction() {
    randomGeneration()
    if (opponentDamage > 0) {
        if (playerChoose == 'defend'){
            playerDefend()
        } else {
            playerAttack()
        }
    } else {
        if (playerChoose == 'attack'){
        } else {
        }
    }
    updateHealth()
    checkHealth()
}

function playerAttack(){
    randomGeneration()

    if (opponentChoice == 1) {
            inflictDamage()
    }
    else {
        if (playerDamage > 0) {
            if (blockChance>0.5){
                if (playerBlockedDamage > 0){
                        fightResult = "You inflict " + playerBlockedDamage + " damage.";
                        opponentHealth -= playerBlockedDamage;
                    } else {
                        fightResult = "You fail to inflict any damage."
                    }
                } else {
                fightResult = "The opponent completely blocked the attack!";
                }
        } else {
            fightResult = "You fail to inflict any damage."
        }
    }
}

function playerDefend(){
    randomGeneration()

    if (opponentChoice == 1) {    
        if (blockChance>0.5){
                if (opponentBlockedDamage > 0){
                    fightResult = "Opponent inflicts " + opponentBlockedDamage + " damage.";
                    playerHealth -= opponentBlockedDamage;
                } else {
                    fightResult = "Opponent fails to inflict any damage."
                }
            }
            else {
            fightResult = "You completely blocked the opponent.";
            }
    } else {
        fightResult = "The opponent defended too";
    }
}

function inflictDamage(){
    randomGeneration()
    
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

function randomGeneration(){
    blockChance = Math.random();
    opponentChoice = Math.floor(Math.random() * 2);
    playerDamage = calculateDamage();
    opponentDamage = calculateDamage();
    playerBlockedDamage = calculateBlockedDamage();
    opponentBlockedDamage = calculateBlockedDamage();
}

function playerChoice(action) {
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

function updateHealth(){
    document.getElementById('playerHealth').innerHTML = "Player: " + playerHealth;
    document.getElementById('opponentHealth').innerHTML = "Opponent: " + opponentHealth;
}

function checkHealth(){
    if (playerHealth <= 0){
        document.getElementById('attackButton').disabled = true;
        document.getElementById('defendButton').disabled = true;
        document.getElementById('tossCoin').disabled = true;
        document.getElementById('tossDecision').disabled = true;
        document.getElementById('fightWinner').innerHTML = "Opponent Wins.";
    } else if (opponentHealth <= 0){
        document.getElementById('attackButton').disabled = true;
        document.getElementById('defendButton').disabled = true;
        document.getElementById('tossCoin').disabled = true;
        document.getElementById('tossDecision').disabled = true;
        document.getElementById('fightWinner').innerHTML = "Player Wins.";
    } else {}
}

function resetGame() {
    playerHealth = 100;
    opponentHealth = 100;
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
}