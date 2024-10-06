document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('testModal');
    const openTestBtn = document.getElementById('openTestBtn');
    const closeBtn = document.getElementsByClassName('close')[0];
    const questionTitle = document.getElementById('questionTitle');
    const answerButtons = document.getElementById('answerButtons');
    const result = document.getElementById('result');
    const score = document.getElementById('score');
    const restartBtn = document.getElementById('restartBtn');

    let currentQuestion = 0;
    let userScore = 0;

    const questions = [
        {
            question: "What are the main components necessary for life to arise?",
            answers: ["necessary chemical elements, necessary habitat, energy", "Pressure", "Gravitation", "Temperature"],
            correct: 0
        },
        {
            question: "How many planets in star system of Kepler-90?",
            answers: ["7", "8", "9", "10"],
            correct: 1
        },
        {
            question: "Which exoplanet is the carrier of hot ice?",
            answers: ["51 Pegassy b", "Мars", "Jupiter", "Saturn"],
            correct: 2
        },
        {
            question: "Which exoplanet is diamond?",
            answers: ["Exoplanet 55 Cancri e", "", "Луна", "GPS спутники"],
            correct: 2
        },
        {
            question: "Why is the surface of Mars red?",
            answers: ["due to the presence of iron oxide in the soil", "Юрий Гагарин", "Алан Шепард", "Валентина Терешкова"],
            correct: 1
        }
    ];

    function showQuestion() {
        const question = questions[currentQuestion];
        questionTitle.textContent = question.question;
        answerButtons.innerHTML = '';
        question.answers.forEach((answer, index) => {
            const button = document.createElement('button');
            button.textContent = answer;
            button.addEventListener('click', () => selectAnswer(index));
            answerButtons.appendChild(button);
        });
    }

    function selectAnswer(index) {
        if (index === questions[currentQuestion].correct) {
            userScore++;
        }
        currentQuestion++;
        if (currentQuestion < questions.length) {
            showQuestion();
        } else {
            showResult();
        }
    }

    function showResult() {
        questionTitle.style.display = 'none';
        answerButtons.style.display = 'none';
        result.style.display = 'block';
        score.textContent = `Ваш результат: ${userScore} из ${questions.length}`;
    }

    function restartTest() {
        currentQuestion = 0;
        userScore = 0;
        questionTitle.style.display = 'block';
        answerButtons.style.display = 'block';
        result.style.display = 'none';
        showQuestion();
    }

    openTestBtn.onclick = function() {
        modal.style.display = "block";
        showQuestion();
    }

    closeBtn.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    restartBtn.addEventListener('click', restartTest);
});