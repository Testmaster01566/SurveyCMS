import { db } from "./firebase.js";

import {
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";

window.saveQuestion = async function () {

  const question = document.getElementById("question").value.trim();
  const type = document.getElementById("type").value;

  if (question === "") {
    alert("Введите вопрос");
    return;
  }

  let answers = [];

  if (type === "buttons") {

    answers = document
      .getElementById("answers")
      .value
      .split("\n")
      .map(a => a.trim())
      .filter(a => a !== "");

    if (answers.length < 2) {
      alert("Добавьте минимум два варианта ответа");
      return;
    }
  }

  try {

    const docRef = await addDoc(collection(db, "questions"), {
      question: question,
      type: type,
      answers: answers,
      created: new Date()
    });

    console.log("Документ создан:", docRef.id);

    document.getElementById("question").value = "";
    document.getElementById("answers").value = "";

    document.getElementById("status").innerHTML =
      "✅ Вопрос успешно сохранён";

    alert("Вопрос успешно сохранён!");

  } catch (e) {

    console.error(e);

    alert("Ошибка:\n" + e.message);

    document.getElementById("status").innerHTML =
      "❌ " + e.message;
  }

};