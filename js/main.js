'use strict';

//  Elements

const elQuestion = {
    heading : document.querySelector('.question__heading') ,
    text    : document.querySelector('.question__text') ,
    index   : document.querySelector('.question__index') ,
    count   : document.querySelector('.question__count')
}


const numberOfQuestions = questions.length;

let currentQuestion = 0;

quizStart();

function quizStart() {
    elQuestion.count.textContent = numberOfQuestions;
    nextQuestion();
}

function nextQuestion() {
    elQuestion.index.textContent = ++currentQuestion;
}

