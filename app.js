/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, activePlayer, roundScore, gamePlaying, firstRound;

init();


//**************************************************** 
// ROLL DICE FUNCTION

document.querySelector('.btn-roll').addEventListener('click', function() {

    if (gamePlaying) {

        var dice1 = Math.floor(Math.random() *6 ) + 1 ;
        var dice2 = Math.floor(Math.random() *6 ) + 1 ;

        dice = dice1 + dice2;

        //display dice accordingly
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';
        document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
        document.getElementById('dice-2').src = 'dice-' + dice2 + '.png'; 
        
        if (dice && firstRound === 6) {

            score[activePlayer] = 0;
            document.getElementById('score-' + activePlayer).textContent = '0';
            nextPlayer();
            firstRound = 0;
        }
        //update roundScore
        else if(dice !== 1) {

            roundScore += dice;

            document.getElementById('current-' + activePlayer).textContent = roundScore;
        }else {

            //nextPlayer
            nextPlayer();

        }
        
        firstRound = dice;
    }
    
});


document.querySelector('.btn-hold').addEventListener('click', function() {

    if (gamePlaying) {

        firstRound = 0;
            //add all scores
        score[activePlayer] += roundScore;

        //displat at the main score
        document.getElementById('score-' + activePlayer).textContent = score[activePlayer];


        var total = document.querySelector('.final-score').value;
        
        //check if the player wins else nextPlayer function
        if (score[activePlayer] >= total || score[activePlayer] >= 100) {
            document.querySelector('.player-'+ activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-'+ activePlayer + '-panel').classList.remove('active');

            document.getElementById('name-' + activePlayer).textContent = 'WINNER!!';

            document.getElementById('dice-1').style.display = 'none';
            document.getElementById('dice-2').style.display = 'none';
            gamePlaying = false

        } else {
            //nextPlayer
            nextPlayer ();

        }

    }

});

document.querySelector('.btn-new').addEventListener('click', init);

function init () {

    score = [0,0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.add('active');

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

}




// nextPlayer Ffunction
function nextPlayer() {

    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; 
        roundScore = 0;

        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';

        document.querySelector('.dice').style.display = 'none';

        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
}







