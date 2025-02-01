const canvas = document.getElementById('starCanvas');
const ctx = canvas.getContext('2d');
let stars = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function createStars() {
    stars = [];
    for(let i = 0; i < 200; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 3,
            opacity: Math.random() * 0.5 + 0.5
        });
    }
}

function animateStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    
    stars.forEach(star => {
        ctx.globalAlpha = star.opacity;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
        star.opacity += (Math.random() - 0.5) * 0.1;
        star.opacity = Math.max(0, Math.min(1, star.opacity));
    });
    
    requestAnimationFrame(animateStars);
}

window.addEventListener('resize', () => {
    resizeCanvas();
    createStars();
});
resizeCanvas();
createStars();
animateStars();

const questions = [
    {
        question: "What is the name of the first artificial satellite launched into space?",
        options: ["Sputnik 1", "Explorer 1", "Hubble", "Voyager 1"],
        correct: 0
    },
    {
        question: "Who was the first human to travel into space?",
        options: ["Neil Armstrong", "Yuri Gagarin", "Alan Shepard", "John Glenn"],
        correct: 1
    },
    {
        question: "What is the largest planet in our solar system?",
        options: ["Earth", "Saturn", "Jupiter", "Neptune"],
        correct: 2
    },
    {
        question: "Which planet is known as the \"Red Planet\"?",
        options: ["Venus", "Mars", "Mercury", "Uranus"],
        correct: 1
    },
    {
        question: "What is the name of the galaxy that contains our solar system?",
        options: ["Andromeda", "Milky Way", "Triangulum", "Sombrero"],
        correct: 1
    },
    {
        question: "Which spacecraft was the first to land humans on the Moon?",
        options: ["Apollo 11", "Gemini 4", "Voyager 2", "Soyuz 1"],
        correct: 0
    },
    {
        question: "What is the name of the telescope launched into space in 1990 to observe distant galaxies?",
        options: ["James Webb", "Hubble", "Chandra", "Spitzer"],
        correct: 1
    },
    {
        question: "Which planet has the most moons?",
        options: ["Saturn", "Jupiter", "Uranus", "Neptune"],
        correct: 0
    },
    {
        question: "What is the name of the first privately-funded spacecraft to reach orbit?",
        options: ["Dragon", "Falcon 1", "SpaceShipOne", "New Shepard"],
        correct: 1
    },
    {
        question: "What is the term for a small rocky body orbiting the Sun, often found in the asteroid belt?",
        options: ["Comet", "Meteoroid", "Asteroid", "Dwarf Planet"],
        correct: 2
    },
];

let currentQuestion = 0;
let score = 0;

function PlayGame() {
    document.getElementById("main-menu").style.display = "none";
    document.getElementById("question-page").style.display = "flex";
    showQuestion();
}

function showQuestion() {
    const questionContainer = document.getElementById('question-page');
    questionContainer.innerHTML = `
        <h1 class="text-center text-light mb-5">${questions[currentQuestion].question}</h1>
        <div class="row justify-content-center gap-3 w-100">
            ${questions[currentQuestion].options.map((option, index) => `
                <div class="col-md-5 col-12">
                    <button onclick="checkAnswer(${index})" class="btn btn-primary w-100 p-4 fs-3 option-btn">
                        ${option}
                    </button>
                </div>
            `).join('')}
        </div>
        <div class="text-light fs-3 mt-4">Score: ${score} | Question: ${currentQuestion + 1}/${questions.length}</div>
    `;
}

function checkAnswer(selectedIndex) {
    const correct = selectedIndex === questions[currentQuestion].correct;
    if(correct) score++;
    
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.disabled = true;
        if(correct) {
            btn.style.background = 'linear-gradient(145deg, #00ff00, #00cc00)';
        } else {
            btn.style.background = 'linear-gradient(145deg, #ff0000, #cc0000)';
        }
    });

    setTimeout(() => {
        currentQuestion++;
        if(currentQuestion < questions.length) {
            showQuestion();
        } else {
            showFinalScore();
        }
    }, 2000);
}

function showFinalScore() {
    document.getElementById('question-page').innerHTML = `
        <h1 class="text-center text-light mb-5">Quiz Completed!</h1>
        <div class="text-light fs-1">Final Score: ${score}/${questions.length}</div>
        <button onclick="location.reload()" class="btn btn-primary mt-5 p-3 fs-3">Play Again</button>
    `;
}