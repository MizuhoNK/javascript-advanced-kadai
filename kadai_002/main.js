//変数
let untyped = "";
let typed = "";
let score = 0;
//let typedcounter = 0;

//定数
const untypedfield = document.getElementById("untyped");
const typedfield = document.getElementById("typed");
const count = document.getElementById("count");
const wrap = document.getElementById("wrap");
const start = document.getElementById("start");
const typedcount = document.getElementById("typedcount");

const textLists = [
  "Hello World",
  "This is my App",
  "How are you?",
  "Today is sunny",
  "I love JavaScript!",
  "Good morning",
  "I am Japanese",
  "Let it be",
  "Samurai",
  "Typing Game",
  "Information Technology",
  "I want to be a programmer",
  "What day is today?",
  "I want to build a web app",
  "Nice to meet you",
  "Chrome Firefox Edge Safari",
  "machine learning",
  "Brendan Eich",
  "John Resig",
  "React Vue Angular",
  "Netscape Communications",
  "undefined null NaN",
  "Thank you very much",
  "Google Apple Facebook Amazon",
  "ECMAScript",
  "console.log",
  "for while if switch",
  "var let const",
  "Windows Mac Linux iOS Android",
  "programming",
];

//ランダムなテキストを表示
const createText = () => {
  //正タイプした文字列をクリア
  typed = "";
  typedfield.textContent = typed;

  //配列のインデックス数からランダムな数値を生成する
  let random = Math.floor(Math.random() * textLists.length);

  //配列からランダムにテキストを取得し画面に表示する
  untyped = textLists[random];
  untypedfield.textContent = untyped;
};

//キー入力の判定
const KeyPress = (e) => {
  //誤タイプの場合
  if (e.key !== untyped.substring(0, 1)) {
    //mistypedのクラスを加える
    wrap.classList.add("mistyped");
    //100ms後に背景を戻に戻す
    setTimeout(() => {
      wrap.classList.remove("mistyped");
    }, 100);
    return;
  }
  //正タイプの場合
  //スコアのインクリメント
  score++;
  //未入力文字の1文字目をtypedへ代入する
  typed += untyped.substring(0, 1);
  //未入力文字の2番目～最後までをuntypedへ代入する
  untyped = untyped.substring(1);
  //typedfieldにtypedのテキストを入力する
  typedfield.textContent = typed;
  //untypedfieldにuntypedのテキストを入力する
  untypedfield.textContent = untyped;
  //typedcountにスコアを入力する
  typedcount.textContent = score;

  //テキストがなくなったら新しいテキストを表示する
  if (untyped === "") {
    createText();
  }
};

//タイピングスキルのランクを判定
const rankCheck = (score) => {
  //変数　ランクを表示するためのテキスト
  let text = "";
  //ランクごとのテキスト
  if (score < 100) {
    text = `あなたのランクはCです。\nBランクまであと${100 - score}文字です。`;
  } else if (score < 200) {
    text = `あなたのランクはBです。\nAランクまであと${200 - score}文字です。`;
  } else if (score < 300) {
    text = `あなたのランクはAです。\nSランクまであと${300 - score}文字です。`;
  } else {
    text = `あなたのランクはSです。\nおめでとうございます!`;
  }
  //スコアの値を返す
  return `${score}文字打てました！\n${text}\n 【OK】リトライ / 【キャンセル】終了`;
  console.log(text);
};

//ゲームを終了
const gameOver = (id) => {
  clearInterval(id);

  //「タイムアップ！」の表示をする
  typedfield.textContent = "";
  untypedfield.textContent = "タイムアップ！";

  // 「タイムアップ！」が表示された10ミリ秒後にスコアを表示する
  setTimeout(() => {
    const result = confirm(rankCheck(score));
    //OKボタンをクリックされたらリロードする
    if (result == true) {
      window.location.reload();
    }
  }, 10);
};

//カウントダウンタイマー
const timer = () => {
  //タイマー部分のHTML要素を取得する
  let time = count.textContent;
  const id = setInterval(() => {
    //カウントダウンする
    time--;
    count.textContent = time;
    //カウントが0になったらタイマーを停止する
    if (time <= 0) {
      gameOver(id);
    }
  }, 1000);
};

//入力数のカウント

//スタートボタンがクリックされた時の処理
start.addEventListener("click", () => {
  //カウントダウンタイマーを開始する
  timer();

  //ランダムなテキストを表示する
  createText();

  //スタートボタンを非表示にする
  start.style.display = "none";

  //入力カウント数を表示にする
  typedcount.style.display = "block";

  //キーボードのイベント処理
  document.addEventListener("keypress", KeyPress);
});

untypedfield.textContent = "スタートボタンで開始";
