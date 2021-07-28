'use strict';

const secondsPerAnswer = 10;

//  Elements

const elQuestion = {
    heading : document.querySelector('.question__heading') ,
    text    : document.querySelector('.question__text') ,
    index   : document.querySelector('.question__index') ,
    count   : document.querySelector('.question__count') ,
}

const elBtnSubmit = document.querySelector('.button__submit');

const elBar = document.querySelector('.time-bar__white-bg');

const elAnswer = {
    container : document.querySelector('.answers__container') ,
}

let currentQuestionIndex , question , rating , selectedAnswer , timer;

quizStart();


//  Avvia il quiz

function quizStart() {
    currentQuestionIndex = 0;
    question;   // alias
    rating = 0;
    elQuestion.count.textContent = questions.length;

    nextQuestion();
}


//  Lancia domanda successiva

function nextQuestion() {

    
    if(currentQuestionIndex === (questions.length)) {
        // Se non ci sono altre domande
        gameOver();
        return;
    }
    
    clearTimeout(timer);

    question = questions[currentQuestionIndex];

    elBtnSubmit.disabled =true;

    printQuestionData();
    printAnswers();
    runBar();

    timer = setTimeout( function() {timeExpired()}, 1000 * secondsPerAnswer);
    
    currentQuestionIndex++;

}


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

    // selectedAnswer = -1;

}


//  Funzione che si occupa di eseguire tutte le operazioni allo scadere del tempo disponibile per ogni domanda

function timeExpired() {
    pulseBar();
}


// Memorizza la risposta selezionata dall'utente

function readAnswer(val) {
    selectedAnswer = Number(val);
    elBtnSubmit.disabled = false;
}


//  Operazioni da eseguire quando l'utente invia una risposta o skippa la domanda

function submitAnswer(skipped = false) {
    if (skipped) {
        console.log("Hai skippato!");
    } else {
        console.log("Hai fornito una risposta!")
        selectedAnswer === question.correct ? rating++ : rating-- ;
    }

    nextQuestion();
}


function gameOver() {
    clearTimeout(timer);
    resetBar();
    console.log("Era l'ultima domanda: gioco finito\nHai totalizzato " , rating , " punti");
}

/*
***
***     Funzioni relative
***     Alla barra del Timer
***
*/


//  Inizia a riempire la barra di caricamento

function runBar() {
    resetBar();
    setTimeout(() => {        
        elBar.style.animationDuration = secondsPerAnswer + 's';
        elBar.classList.add("time-bar__white-bg--running");
    }, 50);
}


//  Fa pulsare la barra (tempo scaduto)

function pulseBar() {
    resetBar();
    setTimeout(() => {
        elBar.style.animationDuration = '1s';
        elBar.classList.add("time-bar__white-bg--complete");
    }, 50);
}


//  Rimuove tutte le classi assegnate alla barra

function resetBar() {
    elBar.style.animationDuration = 0;
    elBar.classList.remove("time-bar__white-bg--running");
    elBar.classList.remove("time-bar__white-bg--complete");
}