let questions = [];
let fileSelected = false; // ファイルが選択されたかチェック

document.getElementById("fileInput").addEventListener("change", handleFileSelect);
document.getElementById("loadFile").addEventListener("click", loadFile);
document.getElementById("loadQuestion").addEventListener("click", loadRandomQuestion);
document.getElementById("showAnswerBtn").addEventListener("click", showAnswer);


//ファイル選択ボタン押下処理
function saveData() {
    const fileInput = document.getElementById("fileInput");
    if (!fileInput.files.length) {
        alert("ファイルを選択してください！");
        return;
    }

    const reader = new FileReader();
    reader.onload = function(event) {
        localStorage.setItem("csvData", event.target.result); // データを保存
        window.location.href = "quiz.html"; // クイズページへ移動
    };
    reader.readAsText(fileInput.files[0]);
}

// ファイルが選択されたかをチェック
function handleFileSelect(event) {
    fileSelected = !!event.target.files[0]; 
}

function loadFile() {
    if (!fileSelected) {
        alert("ファイルを選択してください！");
        return;
    }
alert("これは確認メッセージです！");

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
    const questionElement = document.getElementById("question");
    const answerElement = document.getElementById("answer");

    // もし問題がなければ表示しない
    if (questions.length === 0) {
        questionElement.textContent = "問題がありません！";
        return;
    }

    // ランダムに問題を選んで表示
    let randomIndex = Math.floor(Math.random() * questions.length);
    let questionText = questions[randomIndex][1].replace(/\n/g, "<br>");
    let answerText = questions[randomIndex][2];

    // 問題文を表示
    questionElement.innerHTML = questionText;
    answerElement.textContent = answerText;

    // 問題文は表示、答えは非表示に
    questionElement.classList.add("show");
    answerElement.classList.remove("show");

    // 答えを表示するボタンを表示
    document.getElementById("showAnswerBtn").style.display = "block";
}

function showAnswer() {
    // 答えを表示
    document.getElementById("answer").classList.add("show");
    // 「答えを表示」ボタンは非表示
    document.getElementById("showAnswerBtn").style.display = "none";
}

