document.getElementById("fileInput").addEventListener("change", handleFileSelect);
document.getElementById("loadFile").addEventListener("click", loadFile);
document.getElementById("loadQuestion").addEventListener("click", loadRandomQuestion);
document.getElementById("checkAnswer").addEventListener("click", checkAnswer);


// ファイルが選択されたかをチェック
function handleFileSelect(event) {
    fileSelected = !!event.target.files[0]; 
}



// ボタンをクリックした時に問題文を表示
document.getElementById('showButton').addEventListener('click', function() {
    // 問題文を表示
    document.getElementById('question').classList.add('show');
    // 答えを表示したい場合も同様に
    document.getElementById('answer').classList.add('show');
});

let questions = [];
let fileSelected = false; // ファイルが選択されたかチェック

function loadFile() {
    if (!fileSelected) {
        alert("ファイルを選択してください！");
        return;
    }

    const file = document.getElementById("fileInput").files[0];
    const reader = new FileReader();

    //ファイルを読み込んだあとに動く処理が以下のfunction(e)
    reader.onload = function(e) {
        const text = e.target.result;
        //最初のsplitで改行で分割、そして分割したものをカンマで分割（２回目のsplit）
        let rows = text.split("\n").map(row => row.split(","));
         // ヘッダーを削除
        rows.shift();
        // データチェック
        //filter() を使って 「3つ以上のデータがある行だけを残す」
        // 「問題番号・問題文・答え」の3つがそろっている行だけを questions に保存する
        //データが不完全な行を削除し、問題データとして使えるものだけを残す
        questions = rows.filter(row => row.length >= 3); 

        //フィルタした数が１以上だったら問題として表示
        if (questions.length > 0) {
            //非活性をfalse
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

function loadRandomQuestion() {
    const questionElement = document.getElementById("question");
    const answerElement = document.getElementById("answer");
    if (questions.length === 0) {
        questionElement.textContent = "問題がありません！";
        return;
    }
    let randomIndex = Math.floor(Math.random() * questions.length);
    let questionText = questions[randomIndex][1].replace(/\n/g, "<br>");
    let answerText = questions[randomIndex][2];
    
    questionElement.innerHTML = questionText;
    answerElement.textContent = answerText;

    // アニメーションを追加
    questionElement.classList.add("show");
    answerElement.classList.add("show");
}


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
