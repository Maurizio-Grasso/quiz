'use strict';

//  Settings

    const allowMultipleTopics   = true;     //  L'utente può scegliere un argomento specifico?
    const showAd                = true;     //  Mostrare annunci pubblicitari?
    const jollyAvalaible        = 5;        //  Quanti jolly sono previsti? (0 per disabilitarli del tutto)
    const secondsPerAnswer      = 20;       //  Tempo a disposizione dell'utente per rispondere ad ogni domanda
    const timeForAd             = 30;       //  Tempo di visualizzazione del messaggio pubblicitario
    const jollyBonusSeconds     = 10;       //  Secondi bonus generati dal jolly


//  Elements

const elInstructions = {
    container           : document.querySelector('.instructions__container'),
    chooseTopic         : document.querySelector('.instructions__choose-topic'),
    secondsPerAnswer    : document.querySelector('.instructions__seconds') ,
    jollyItem           : document.querySelector('.instructions__jolly-item') ,
    jollyCount          : document.querySelector('.instructions__jolly-count') ,
    jollyBonusSeconds   : document.querySelector('.instructions__jolly-bonus-seconds'),
}

const elJolly = {
    container   : document.querySelector('.jolly__container'),
    icon        : document.querySelector('.jolly__icon'),
    leftBox     : document.querySelector('.jolly__left-box'),
    leftNum     : document.querySelector('.jolly__left-num'),
}

const elTopic = {
    container   : document.querySelector('.topic__container'), 
    select      : document.querySelector('.topic__select')
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
    background  : document.querySelector('.time-bar__white-bg'),
    countdown   : document.querySelector('.time-bar__countdown'),
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

let questions , currentQuestionIndex , question , score , selectedAnswer , answersList , timerGame , timerAd , jollyLeft , secondsLeftGame , jollyCurrentQuestion;

init();


//  Inizializzazione del'app

function init(){

    hideResults();
    hideGameControls();

    if(allowMultipleTopics) printTopicData();
    if(jollyAvalaible) showJollyBox();
    
    showInstructions();
}

/*
***
***     Funzioni che si occupano di 
***     mostrare o nascondere i vari pannelli
***     che compongono l'app
***
*/

//  Mostra box del Jolly

function showJollyBox(){

    jollyLeft = jollyAvalaible;

    printJollyLeft(jollyAvalaible);

    elJolly.container.classList.remove('jolly__container--disabled');
    elJolly.container.classList.remove('hidden');
    elJolly.leftBox.classList.remove('hidden');
}


//  Mostra / Nasconde intero container del gioco

function showGameControls(){
    elQuizContainer.classList.remove('hidden');
}

function hideGameControls(){
    elQuizContainer.classList.add('hidden');
}


//  Mostra / Nasconde container con istruzioni

function showInstructions(){

    if (allowMultipleTopics) {
        elInstructions.chooseTopic.textContent = ', scegli un argomento e';
    }

    if (jollyAvalaible){
        elInstructions.jollyCount.textContent = jollyAvalaible;
        elInstructions.jollyBonusSeconds.textContent = jollyBonusSeconds;
        elInstructions.jollyItem.classList.remove('hidden');
    }

    elInstructions.secondsPerAnswer.textContent = secondsPerAnswer;
        
    elInstructions.container.classList.remove('hidden');
}

function hideInstructions(){
    elInstructions.container.classList.add('hidden');
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

//  Mostra i contenuti relativi alla scelta di uno specifico argomento

function printTopicData() {

    elTopic.container.classList.remove('hidden');

    elTopic.select.innerHTML = '';    

    for( const [index , {label} ] of topics.entries()) {
        elTopic.select.innerHTML += `<option class="topic__option" value="${index}">${label}</option>`;
    }
    
}


//  Stampa il testo della domanda ed il numero corrispondente nell'heading

function printQuestionData() {
    elQuestion.text.textContent = question.text;
    elQuestion.index.textContent = (currentQuestionIndex + 1);
}


// Stampa lista di risposte sulla pagina

function printAnswers() {

    elAnswer.container.innerHTML = '';

    answersList.forEach((answer , index) => {

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
    
    questions = getQuestionsList();
    
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

function getQuestionsList() {
    return topics[(elTopic.select?.value) || 0].questions;
}

// Memorizza la risposta selezionata dall'utente

function readAnswer(val) {
    if(!timerGame) return;  // Se il tempo è scaduto non esegue nessuna operazione
    selectedAnswer = Number(val);
    elButtons.submit.disabled = false;
}


//  Operazioni da eseguire quando l'utente invia una risposta o skippa la domanda

function submitAnswer(noAnswer = false) {

    resetTimerGame();
    resetBar();

    //  Se viene fornita una risposta ne valuta l'esattezza aggiornando il punteggio di conseguenza
    if(!noAnswer) {
        selectedAnswer === question.correct ? score += 2 : score -= 1 ;
    }

    if(currentQuestionIndex === (questions.length)) {
        // Se non ci sono altre domande chiudo il gioco
        gameOver();
        return;
    } else if( showAd && currentQuestionIndex >= 3 && currentQuestionIndex % 2 === 0) {
        //  Valuta se mostrare annuncio pubblicitario. La valutazione viene effettuata ogni due domande a partire dalla quarta.        
        if( getRandom(1,3) === 3) { //  Ad ogni valutazione ci sarà 1 possibilità su 3 che l'annuncio venga mostrato
            loadAd();
            return;
        } 
    }
    
    nextQuestion();
}


//  Lancia domanda successiva

function nextQuestion() {
            
    question = questions[currentQuestionIndex]; //  alias
    answersList = [...question.answers]    // risposte alla domanda corrente
    elButtons.submit.disabled = true;      // pulsante submit disabilitato finché non viene selezionata una risposta
    jollyCurrentQuestion = 0;   // resetta jolly utilizzati per domanda corrente
    secondsLeftGame = secondsPerAnswer; //  Inizializza i secondi rimanenti
    
    printQuestionData();
    printAnswers();
    runTimer();

    currentQuestionIndex++;
}

function runTimer() {
    elBar.countdown.textContent = secondsLeftGame;
    timerGame = setInterval(() => {
        secondsLeftGame--;
        console.log(`Rimangono ${secondsLeftGame} secondi`);
        elBar.countdown.textContent = secondsLeftGame;
        secondsLeftGame === 0 && timeExpired();
    }, 1000);
    
    runBar();
}

//  Esegue tutte le operazioni allo scadere del tempo disponibile per ogni domanda

function timeExpired() {
    elBar.countdown.textContent = '';

    elButtons.submit.disabled = true;
    console.log("Tempo Scaduto!");
    resetTimerGame();
    pulseBar();
}


//  Resetta Timer di Gioco

function resetTimerGame() {
    clearInterval(timerGame);
    timerGame = null;
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
    
    let secondsLeftAd = timeForAd;   //  Durata visualizzazione annuncio
    
    timerAd = setInterval(() => {
        if(secondsLeftAd === 0) {
            clearInterval(timerAd);
            elAd.resumeBtn.disabled = false;
            elAd.timeLeft.textContent = '->';
            
        } else {
            elAd.timeLeft.textContent = secondsLeftAd;
            secondsLeftAd --;
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

    let totalSeconds = secondsPerAnswer + (jollyCurrentQuestion * jollyBonusSeconds);   // Numero di secondi totali (considerando i jolly utilizzati per rispondere)

    // Passo come argomento la percentuale di tempo rimanente rispetto a quello totale impiegato per la domanda. Servirà per la corretta animazione della barra
    resetBar((100 * secondsLeftGame) / totalSeconds);

    //  Cambio style con timeout, per evitare che il browser accorpi tutte le modifiche
    setTimeout(() => {        
        elBar.background.style.transition = 'all ' + secondsLeftGame + 's linear 0s';
        elBar.background.style.backgroundSize = '0%';
    }, 50);

}


//  Fa pulsare la barra (tempo scaduto)

function pulseBar() {

    resetBar();

    //  Cambio lo style con un timeout, per evitare che il browser accorpi tutte le modifiche
    setTimeout(() => {
        elBar.background.style.animationDuration = '1s';
        elBar.background.classList.add("time-bar__white-bg--expired");
    }, 50);
}


//  Rimuove tutte le classi e le regole css assegnate alla barra

function resetBar(percentLeft = 100) {
    elBar.background.style.transition = 'all 0s linear 0s';
    elBar.background.style.backgroundSize = `${percentLeft}%`;
    elBar.background.classList.remove("time-bar__white-bg--expired");
}


/*
***
***     Funzioni che riguardano
***     l'utilizzo del jolly
***
*/



//  Ciò che avviene quando l'utente clicca sul pulsante del jolly

function useJolly(){

    if(!jollyLeft)  return;         //  Se non ci sono più jolly disponibily non si prosegue
    if(secondsLeftGame < 1) return;          // Il Jolly può essere usato solo quando una domanda è in corso (i.e. quando il timer è attivo)
    if(jollyCurrentQuestion === question.answers.length - 1 ) return;   //  Se è rimasta una solta possibile risposta, non si può più usare il jolly
    console.log("Stai usando un Jolly!");
    
    jollyLeft --;
    
    jollyLeft === 0 ? disableJolly() : printJollyLeft(jollyLeft);    
    
    removeWrongAnswer();
    
    jollyCurrentQuestion++;

    secondsLeftGame += jollyBonusSeconds;  // Aggiunge i secondi bonus

    resetTimerGame();
    runTimer();
    
}

function removeWrongAnswer() {
    
    const tmp = getRandom(0 , (question.answers.length - 1));
    
    if(tmp === question.correct || !answersList[tmp]) {
        removeWrongAnswer();
        return;
    }
    
    answersList[tmp] = null;

    document.querySelector('.answers__single--'+tmp).classList.add('vanish');
    
    setTimeout(() => {
        document.querySelector('.answers__single--'+tmp).style.visibility = 'hidden';        
    }, 500);
    

    console.log("Sto rimuovendo risposta all'indice " + tmp + ".\nLa risposta corretta era quella all'indice " + question.correct);

}


//  Ciò che avviene quando sono stati utilizzati tutti i Jolly

function disableJolly() {
    elJolly.leftBox.classList.add('hidden');
    elJolly.container.classList.add('jolly__container--disabled');
}


//  Stampa numero di jolly rimanenti mell'apposito box

function printJollyLeft(val) {
    elJolly.leftNum.textContent = val;
}

/*
***
***     Funzioni
***     Generiche
***
*/

//  Restituisce numero casuale compreso fra min e max

function getRandom(min,max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}