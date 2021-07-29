'use strict';


//  Elements

const elInstraction = {
    container       : document.querySelector('.instructions__container'),
    questionsCount  : document.querySelector('.instructions__questions-count'),
    secondsPerAnswer: document.querySelector('.instructions__seconds-per-answer')
}

const elQuizContainer = document.querySelector('.smart-quiz');

const elQuestion = {
    container   : document.querySelector('.question__container') ,
    heading     : document.querySelector('.question__heading') ,
    text        : document.querySelector('.question__text') ,
    index       : document.querySelector('.question__index') ,
    count       : document.querySelector('.question__count') ,
}

const elAnswer = {
    container   : document.querySelector('.answers__container') ,
}

const elButtons = {
    container   : document.querySelector('.button__container') ,
    submit      : document.querySelector('.button__submit') ,
}

const elBar = {
    container   : document.querySelector('.time-bar'),
    background  : document.querySelector('.time-bar__white-bg')
}

const elResults = {
    container   : document.querySelector('.results__container'),
    score       : document.querySelector('.results__score'),
    maxScore    : document.querySelector('.results__max-score')
}

const elAd = {
    container           : document.querySelector('.ad__container'),
    resumeBtn           : document.querySelector('.ad__resume-button'),
    timeLeft            : document.querySelector('.ad__time-left'),
    questionsAnswered   : document.querySelector('.ad__questions-answered'),
    questionsLeft       : document.querySelector('.ad__questions-left'),
}

const secondsPerAnswer = 10;

let currentQuestionIndex , question , score , selectedAnswer , timerGame , timerAd;

init();


//  Inizializzazione del'app

function init(){
    hideResults();
    hideGameControls();
    showInstructions();
}

/*
***
***     Funzioni che si occupano di 
***     mostrare o nascondere i vari pannelli
***     che compongono l'app
***
*/


//  Mostra / Nasconde intero container del gioco

function showGameControls(){
    elQuizContainer.classList.remove('hidden');
}
function hideGameControls(){
    elQuizContainer.classList.add('hidden');
}


//  Mostra / Nasconde container con istruzioni

function showInstructions(){
    elInstraction.questionsCount.textContent = questions.length;
    elInstraction.secondsPerAnswer.textContent = secondsPerAnswer;
    elInstraction.container.classList.remove('hidden');
}
function hideInstructions(){
    elInstraction.container.classList.add('hidden');
}


//  Mostra / Nasconde intero pannello con i risultati

function showResults(){
    elResults.score.textContent = score;
    elResults.maxScore.textContent = 2 * questions.length;
    elResults.container.classList.remove('hidden');
}
function hideResults(){
    elResults.container.classList.add('hidden');
}


//  Mostra / Nasconde pannello con banner pubblicitario

function showAdBox() {
    elAd.resumeBtn.disabled = true;
    elAd.questionsAnswered.textContent = (currentQuestionIndex);
    elAd.questionsLeft.textContent = (questions.length - currentQuestionIndex);
    elAd.container.classList.remove('hidden');
}
function hideAdBox() {
    elAd.container.classList.add('hidden');
}

/*
***
***     Funzioni che si occupano di stampare
***     le informazioni sulla pagina
***
*/


//  Stampa il testo della domanda ed il numero corrispondente nell'heading

function printQuestionData() {
    elQuestion.text.textContent = question.text;
    elQuestion.index.textContent = (currentQuestionIndex + 1);
}


// Stampa lista di risposte sulla pagina

function printAnswers() {

    elAnswer.container.innerHTML = '';

    question.answers.forEach((answer , index) => {

        elAnswer.container.innerHTML += 
        `<div class="answers__single answers__single--${index}">
            <label class="answers__label" for="answer-${index}">
                <input class="answers__input" name="answer" type="radio" id="answer-${index}" value="${index}" onchange="readAnswer(this.value)">
                ${answer}
            </label>            
        </div>`

    });

}

/*
***
***     Funzioni che riguardano strettamente 
***     il ciclo del gioco
***
*/


//  Avvia il quiz

function quizStart() {
    
    // hideResults();
    
    hideInstructions();
    showGameControls();

    currentQuestionIndex = 0;
    score = 0;
    
    elQuestion.container.classList.remove('hidden');
    elAnswer.container.classList.remove('hidden');
    elBar.container.classList.remove('hidden');
    elButtons.container.classList.remove('hidden');
    
    elQuestion.count.textContent = questions.length;

    nextQuestion();
}


// Memorizza la risposta selezionata dall'utente

function readAnswer(val) {
    if(!timerGame) return;  // Se il tempo è scaduto non esegue nessuna operazione
    selectedAnswer = Number(val);
    elButtons.submit.disabled = false;
}


//  Operazioni da eseguire quando l'utente invia una risposta o skippa la domanda

function submitAnswer(noAnswer = false) {

    clearTimeout(timerGame);
    resetBar();

    //  Se viene fornita una risposta ne valuta l'esattezza aggiornando il punteggio di conseguenza
    if(!noAnswer) {
        selectedAnswer === question.correct ? score += 2 : score -= 1 ;
    }

    if(currentQuestionIndex === (questions.length)) {
        // Se non ci sono altre domande chiudo il gioco
        gameOver();
        return;
    } else if(currentQuestionIndex >= 2 && currentQuestionIndex % 2 === 0) {
        //  Valuta se mostrare annuncio pubblicitario. La valutazione viene effettuata ogni due domande a partire dalla terza.
        //  Ad ogni valutazione ci sarà 1 possibilità su 3 che l'annuncio venga effettivamente mostrato
        if(Math.random() * 3  > 2) {
            loadAd();
            return;
        } 
    }
    
    nextQuestion();
}


//  Lancia domanda successiva

function nextQuestion() {
            
    question = questions[currentQuestionIndex]; //  alias
    
    elButtons.submit.disabled = true;
    
    printQuestionData();
    printAnswers();
    runBar();
    
    timerGame = setTimeout( function() {
        timeExpired()
    }, 1000 * secondsPerAnswer);
    
    currentQuestionIndex++;

}

//  Funzione che si occupa di eseguire tutte le operazioni allo scadere del tempo disponibile per ogni domanda

function timeExpired() {
    elButtons.submit.disabled = true;
    timerGame = null;
    pulseBar();
}


//  Funzione che gestisce la fine del gioco

function gameOver() {
    hideGameControls();
    showResults();
}

/*
***
***     Funzioni relative alla visualizzazione
***     del messaggio pubblicitario
***
*/

//  Predispone il banner pubblicitario

function loadAd(){
    
    hideGameControls();
    showAdBox();
    
    let secondsLeft = 15;   //  Durata visualizzazione annuncio
    
    timerAd = setInterval(() => {
        if(secondsLeft === 0) {
            clearInterval(timerAd);
            elAd.resumeBtn.disabled = false;
            elAd.timeLeft.textContent = '->';
            
        } else {
            elAd.timeLeft.textContent = secondsLeft;
            secondsLeft --;
        }
    }, 100);    // Dovrà essere impostato a 1000
}


//  Disattiva pannello con banner e riprende il gioco

function clearAd(){
    timerAd = null;
    hideAdBox();
    showGameControls();
    nextQuestion();
}


/*
***
***     Funzioni relative alla
***     barra del timer di gioco
***
*/


//  Inizia a riempire la barra di caricamento

function runBar() {

    resetBar();

    //  Cambio lo style con un timeout, per evitare che il browser accorpi tutte le modifiche
    setTimeout(() => {        
        elBar.background.style.animationDuration = secondsPerAnswer + 's';
        elBar.background.classList.add("time-bar__white-bg--running");
    }, 50);

}


//  Fa pulsare la barra (tempo scaduto)

function pulseBar() {

    resetBar();

    //  Cambio lo style con un timeout, per evitare che il browser accorpi tutte le modifiche
    setTimeout(() => {
        elBar.background.style.animationDuration = '1s';
        elBar.background.classList.add("time-bar__white-bg--complete");
    }, 50);
}


//  Rimuove tutte le classi e le regole css assegnate alla barra

function resetBar() {
    elBar.background.style.animationDuration = 0;
    elBar.background.classList.remove("time-bar__white-bg--running");
    elBar.background.classList.remove("time-bar__white-bg--complete");
}