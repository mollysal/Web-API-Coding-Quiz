//Establishing Variables from HTML (game.html)
var question = document.querySelector('#question')
var choices = Array.from(document.querySelectorAll('.choice-text'))
var scoreText = document.querySelector('#score')
var progressText = document.querySelector('#progressText')
var timer = document.querySelector("#timer")

//Defining Variables in JS 
let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []
//Easily adjust the quiz timer
let timeLeft = 76

//Questions & Answer Array will show up in question & choice-text in HTML
//Correct answer is defined by the interger that aligns with the choice
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

//Establishing a Score & Max amaount of question
const SCORE_POINTS = 100
const MAX_QUESTIONS = 4 


//Establishing what is happening at the start of the game
//at the start of the game, question counter is set to 0, score is set to 0, at the start of the game the only available questions are from the question array, it must run get new question 
function startGame () {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
    //Once the quiz is strarted, the timer starts counting down
    runTimer()
}

//get new question function
//at the start of the game it will randomly select a question & it will run until all questions are accounted for. 
function getNewQuestion() {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('end.html')
    }
    

    //The question counter lets users know how many questions they have left out of the max number of questions, in this example 4
    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`

    //Picking a random question from the availableQuestions array
    const questionIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionIndex]
    //knowing what question text to use - knowing what question to show
    question.innerText = currentQuestion.question

    //Each correct answer is associated with a number from the avaliableQustions array
    choices.forEach(function(choice) {
        //Knows what question user selects
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    //Inserting the question index into the array  
    availableQuestions.splice(questionIndex, 1)

    acceptingAnswers = true

}

//for every choice/available answer wait for a click event (choice being the parameter)
choices.forEach(function(choice) {
    choice.addEventListener('click', function(e) {
        if(!acceptingAnswers) return
        
        acceptingAnswers = false
        const selectedChoice = e.target
        /* number is to the choices number of HTML */
        const selectedAnswer = selectedChoice.dataset['number']

        //Depending if the choice selected is right or wrong, a class is applied from the CSS (greeen=correct)
        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        //if the "correct" or green class is aplied, that means the choice selected was the answer & the amount of points goes up
        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        if(classToApply === 'incorrect') {
            //if the choice is wrong, the timer decreases by 10 seconds
            timeLeft = timeLeft - 10
        }

        //Adding the correct or incorrect coloring to the selected choice
        selectedChoice.parentElement.classList.add(classToApply)


        //The function needs time to show us the correct or incorrect coloring before moving to the next function
        setTimeout(function() {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)
    
    })
})

//Timer function - for every wrong answer it decreases by 10
function runTimer () {
    let clock = setInterval(function() {
        timeLeft--;
        timer.innerHTML = `Time: ${timeLeft}`;
        if(timeLeft === 0) {
            //when the timer runs out it redirects you to the end.html where you can insert your initials for hight score
            clearInterval(clock);
            //document.location.href = "./end.html"
            document.location.href = "Web-API-Coding-Quiz/end.html"
        }
    }, 1000) //1 second intervals
}

//increment the score by adding on to the number
function incrementScore(num) {
    score +=num
    scoreText.innerText = score
}

//run the start game funciton 
startGame()