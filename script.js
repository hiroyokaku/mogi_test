document.getElementById("loadQuestion").addEventListener("click", loadRandomQuestion);
document.getElementById("checkAnswer").addEventListener("click", checkAnswer);

let questions = [];

fetch("data.csv")
    .then(response => response.text())
    .then(data => {
        let rows = data.split("\n").map(row => row.split(","));
        rows.shift(); // ヘッダーを削除
        questions = rows;
        alert("aaaaaa")
    });

function loadRandomQuestion() {
    if (questions.length === 0) {
        document.getElementById("question").textContent = "問題が読み込めませんでした。";
        return;
    }
    let randomIndex = Math.floor(Math.random() * questions.length);
    document.getElementById("question").textContent = questions[randomIndex][1]; // B列の問題文
    document.getElementById("question").dataset.answer = questions[randomIndex][2]; // C列の答え
}

function checkAnswer() {
    let userAnswer = document.getElementById("answer").value.trim();
    let correctAnswer = document.getElementById("question").dataset.answer.trim();
    if (userAnswer === correctAnswer) {
        document.getElementById("result").textContent = "正解！";
    } else {
        document.getElementById("result").textContent = "不正解。正解は: " + correctAnswer;
    }
}
