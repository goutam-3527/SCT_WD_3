const questions = [
{
    type:"single",
    question:"Which language is used for styling web pages?",
    options:["HTML","CSS","Java","Python"],
    answer:"CSS"
},
{
    type:"multiple",
    question:"Select Front-End Technologies:",
    options:["HTML","CSS","JavaScript","MySQL"],
    answer:["HTML","CSS","JavaScript"]
},
{
    type:"text",
    question:"Fill in the blank: Java is a ______ language.",
    answer:"Programming"
}
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("question");
const answerArea = document.getElementById("answerArea");
const nextBtn = document.getElementById("nextBtn");

function loadQuestion(){
    const q = questions[currentQuestion];

    questionEl.textContent = q.question;
    answerArea.innerHTML = "";

    if(q.type === "single"){
        q.options.forEach(option=>{
            answerArea.innerHTML +=
            `<label class="option">
                <input type="radio" name="answer" value="${option}">
                ${option}
            </label>`;
        });
    }

    else if(q.type === "multiple"){
        q.options.forEach(option=>{
            answerArea.innerHTML +=
            `<label class="option">
                <input type="checkbox" value="${option}">
                ${option}
            </label>`;
        });
    }

    else if(q.type === "text"){
        answerArea.innerHTML =
        `<input type="text" id="textAnswer" placeholder="Type your answer">`;
    }
}

nextBtn.addEventListener("click",()=>{

    const q = questions[currentQuestion];
    let correct = false;

    if(q.type === "single"){
        const selected =
        document.querySelector('input[name="answer"]:checked');

        if(!selected){
            alert("Select an answer");
            return;
        }

        correct = selected.value === q.answer;
    }

    else if(q.type === "multiple"){
        const selected =
        [...document.querySelectorAll('input[type="checkbox"]:checked')]
        .map(cb=>cb.value)
        .sort();

        correct =
        JSON.stringify(selected) ===
        JSON.stringify(q.answer.sort());
    }

    else if(q.type === "text"){
        const text =
        document.getElementById("textAnswer").value.trim();

        correct =
        text.toLowerCase() === q.answer.toLowerCase();
    }

    if(correct) score++;

    currentQuestion++;

    if(currentQuestion < questions.length){
        loadQuestion();
    }
    else{
        document.getElementById("quiz").classList.add("hidden");
        document.getElementById("result").classList.remove("hidden");
        document.getElementById("score").textContent =
        `Your Score: ${score}/${questions.length}`;
    }
});

loadQuestion();