// イベントリスナー
document.getElementById("fileInput").addEventListener("change", handleFileSelect);
document.getElementById("loadFile").addEventListener("click", loadFile);
document.getElementById("loadQuestion").addEventListener("click", loadRandomQuestion);
document.getElementById("checkAnswer").addEventListener("click", checkAnswer);

// グローバル変数
let questions = [];
let fileSelected = false; // ファイルが選択されたかチェック

// ファイルが選択されたかをチェック
function handleFileSelect(event) {
    fileSelected = !!event.target.files[0]; // ファイルが選ばれたかチェック
}

// ファイルを読み込む
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
        questions = rows.filter(row => row.length >= 3); // 必要なデータが3つ以上ある行をフィルタリング

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

// ランダムな問題を読み込む
function loadRandomQuestion() {
    const questionElement = document.getElementById("question");
    const answerElement = document.getElementById("answer");

    if (questions.length === 0) {
        questionElement.textContent = "問題がありません！";
        return;
    }
    
    let randomIndex = Math.floor(Math.random() * questions.length); // ランダムなインデックス
    let questionText = questions[randomIndex][1].replace(/\n/g, "<br>"); // 改行をHTMLタグに変換
    let answerText = questions[randomIndex][2]; // 答え

    questionElement.innerHTML = questionText;
    answerElement.textContent = answerText;

    // アニメーションを追加
    questionElement.classList.add("show");
    answerElement.classList.add("show");
}

// 答えを表示する
function showAnswer() {
    document.getElementById("answer").style.display = "block"; // 答えを表示
    document.getElementById("showAnswerBtn").style.display = "none"; // 答えボタンを非表示
}

// ユーザーの答えをチェック
function checkAnswer() {
    let userAnswer = document.getElementById("answer").value.trim();
    let correctAnswer = document.getElementById("question").dataset.answer.trim();
    if (userAnswer === correctAnswer) {
        document.getElementById("result").textContent = "正解！";
    } else {
        document.getElementById("result").textContent = "不正解。正解は: " + correctAnswer;
    }
}
