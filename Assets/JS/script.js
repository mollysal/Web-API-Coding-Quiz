/* var timer = document.querySelector('#timer');
var answerslist = document.body.querySelector('ul');
var startQuiz = document.body.querySelector('start');

var question =  */

var question = document.querySelector('#question')
var choices = Array.from(document.querySelectorAll('.choice-text'))
var scoreText = document.querySelector('#score')
var progressText = document.querySelector('#progressText')

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'Commonly used data types DO NOT include: ',
        choice1: 'strings',
        choice2: 'booleans',
        choice3: 'alerts',
        choice4: 'numbers',
        answer: 3,
    },
    {
        question: 'Arrays in JavaScript can be used to store ________.',
        choice1: 'numbers & strings',
        choice2: 'other arrays',
        choice3: 'booleans',
        choice4: 'all of the above',
        answer: 4,
    },
    {
        question: 'String values must be enclosed within ____ when being assigned to variables.',
        choice1: 'commas',
        choice2: 'curly brackets {}',
        choice3: 'quotes',
        choice4: 'parentheses',
        answer: 2,
    },
    {
        question: 'A very useful tool used during development & debugging for printing content to the debugger is: ',
        choice1: 'JavaScript',
        choice2: 'terminal/bash',
        choice3: 'for loops',
        choice4: 'console.log',
        answer: 4,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4 

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('./end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`

    const questionIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionIndex]
    /* Knowing what question to ask */
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.slice(questionIndex, 1)

    acceptingAnswers = true

}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return
        
        acceptingAnswers = false
        const selectedChoice = e.target
        /* number is to the choices number of HTML */
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)
    
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()