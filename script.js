document.getElementById("fileInput").addEventListener("change", handleFileSelect);
document.getElementById("loadFile").addEventListener("click", loadFile);
document.getElementById("loadQuestion").addEventListener("click", loadRandomQuestion);
document.getElementById("checkAnswer").addEventListener("click", checkAnswer);

let questions = [];
let fileSelected = false; // ファイルが選択されたかチェック

function handleFileSelect(event) {
    fileSelected = !!event.target.files[0]; // ファイルが選択されたかをチェック
}

function loadFile() {
    if (!fileSelected) {
        alert("ファイルを選択してください！");
        return;
    }

    const file = document.getElementById("fileInput").files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const text = e.target.result;
        let rows = text.split("\n").map(row => row.split(","));
        rows.shift(); // ヘッダーを削除
        questions = rows.filter(row => row.length >= 3); // データのチェック
        
        if (questions.length > 0) {
            document.getElementById("loadQuestion").disabled = false;
            document.getElementById("checkAnswer").disabled = false;
            alert("データを読み込みました！");
        } else {
            alert("正しいCSVファイルを選択してください。");
        }
    };

    reader.readAsText(file);
}

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
