import { db } from "./firebase.js";

import {
  collection,
  getDocs,
  addDoc
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";

let questions = [];
let current = 0;

window.answer18 = async function (isAdult) {

  if (!isAdult) {
    document.getElementById("questionBox").innerHTML =
      "<h2>Опрос доступен только лицам старше 18 лет.</h2>";
    return;
  }

  document.getElementById("questionBox").innerHTML = `
    <h2 id="question">Загрузка...</h2>
    <div id="answers"></div>
  `;

  await loadQuestions();
};

async function loadQuestions() {

  try {

    const snapshot = await getDocs(collection(db, "questions"));

    questions = [];

    snapshot.forEach(doc => {

      const data = doc.data();

      questions.push({
        question: data.question || data.text || "Без вопроса",
        type: data.type || "text",
        answers: data.answers || []
      });

    });

    if (questions.length === 0) {

      document.getElementById("question").innerHTML =
        "Пока вопросов нет";

      return;

    }

    current = 0;

    showQuestion();

  } catch (e) {

    console.log(e);

    document.getElementById("question").innerHTML =
      "Ошибка подключения к Firebase";

  }

}

function showQuestion() {

  const q = questions[current];

  document.getElementById("question").innerHTML = q.question;

  let html = "";

  if (q.type === "buttons") {

    q.answers.forEach(a => {

      html += `
      <button onclick="answer('${a.replace(/'/g,"\\'")}')">
        ${a}
      </button>
      `;

    });

  } else {

    html = `
      <input
        id="textAnswer"
        placeholder="Введите ответ">

      <br><br>

      <button onclick="textAnswer()">
        Далее
      </button>
    `;

  }

  document.getElementById("answers").innerHTML = html;

}

async function saveAnswer(question, answer) {

  try {

    await addDoc(collection(db, "answers"), {

      question,
      answer,
      date: new Date()

    });

  } catch(e){

    console.log(e);

  }

}

window.answer = async function(value){

  await saveAnswer(
    questions[current].question,
    value
  );

  nextQuestion();

}

window.textAnswer = async function(){

  const value =
    document.getElementById("textAnswer").value;

  await saveAnswer(
    questions[current].question,
    value
  );

  nextQuestion();

}

function nextQuestion(){

  current++;

  if(current >= questions.length){

    document.getElementById("questionBox").innerHTML =
    "<h2>Спасибо за участие!</h2>";

    return;

  }

  showQuestion();

}