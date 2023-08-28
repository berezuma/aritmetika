const problemElement = document.getElementById('problem');
const answerElement = document.getElementById('answer');
const checkButton = document.getElementById('check');
const showAnswerButton = document.getElementById('showAnswer');
const nextButton = document.getElementById('next');
const feedbackElement = document.getElementById('feedback');
const scoreElement = document.getElementById('score');
const operators = document.querySelectorAll('.operators button');

let currentOperator = '+';
let score = 0;
let nextButtonColor = '#e74c3c';
let isShowingAnswer = false;

const operatorMap = {
    '+': '+',
    '-': '-',
    '*': '*',
    '/': '/'
};

function generateDivisionProblem() {
    let num1, num2;
    do {
        num1 = Math.floor(Math.random() * 50) + 1;
        num2 = Math.floor(Math.random() * 10) + 1;
    } while (num1 % num2 !== 0);

    problemElement.textContent = `${num1} ${currentOperator} ${num2}`;
}

function generateProblem() {
    if (currentOperator === '/') {
        generateDivisionProblem();
    } else {
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        problemElement.textContent = `${num1} ${currentOperator} ${num2}`;
    }
    feedbackElement.textContent = '';
    showAnswerButton.style.backgroundColor = '#f39c12';
    checkButton.style.backgroundColor = '#27ae60';
    nextButton.style.backgroundColor = nextButtonColor;
    isShowingAnswer = false;
    answerElement.removeAttribute('disabled');
    answerElement.value = '';
}

function checkAnswer() {
    const [num1, operator, num2] = problemElement.textContent.split(' ');
    const correctAnswer = eval(`${num1} ${operatorMap[operator]} ${num2}`);
    const userAnswer = parseFloat(answerElement.value);

    if (!isShowingAnswer) {
        if (userAnswer === correctAnswer) {
            feedbackElement.textContent = 'Erantzun zuzena!';
            feedbackElement.style.color = '#27ae60';
            score += 10;
            setTimeout(() => {
                feedbackElement.textContent = '';
                nextExercise();
            }, 1000);
        } else {
            feedbackElement.textContent = 'Erantzun okerra.';
            feedbackElement.style.color = '#e74c3c';
            score = Math.max(0, score - 5);
        }
        scoreElement.textContent = score;
        isShowingAnswer = true;
        answerElement.setAttribute('disabled', 'disabled');
    }
}

function showAnswer() {
    const [num1, operator, num2] = problemElement.textContent.split(' ');
    const correctAnswer = eval(`${num1} ${operatorMap[operator]} ${num2}`);
    answerElement.value = correctAnswer;
    score = Math.max(0, score - 5);
    scoreElement.textContent = score;
    isShowingAnswer = true;
    answerElement.setAttribute('disabled', 'disabled');

    // Cambiar el color de los botones al mostrar la respuesta
    showAnswerButton.style.backgroundColor = '#f4a261';
    checkButton.style.backgroundColor = '#45a29e';
}

function nextExercise() {
    feedbackElement.textContent = '';
    feedbackElement.style.color = 'inherit';
    nextButtonColor = '#e74c3c';
    nextButton.style.backgroundColor = nextButtonColor;
    generateProblem();
}

checkButton.addEventListener('click', checkAnswer);
showAnswerButton.addEventListener('click', showAnswer);
nextButton.addEventListener('click', nextExercise);

operators.forEach(operator => {
    operator.addEventListener('click', () => {
        currentOperator = operator.textContent;
        generateProblem();
    });
});

generateProblem();
