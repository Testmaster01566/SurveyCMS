import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-app.js";
import {
getAuth,
signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";

const firebaseConfig = {
    // сюда вставьте ваш новый firebaseConfig
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const btn = document.getElementById("loginBtn");

btn.onclick = () => {

const email = document.getElementById("email").value;
const password = document.getElementById("password").value;

signInWithEmailAndPassword(auth,email,password)
.then(()=>{

window.location="admin.html";

})
.catch((e)=>{

document.getElementById("msg").innerHTML=e.message;

});

};