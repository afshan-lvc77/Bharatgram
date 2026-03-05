function signup(){

let email=document.getElementById("email").value

let password=document.getElementById("password").value

auth.createUserWithEmailAndPassword(email,password)

.then(()=>{

alert("Account created")

window.location="login.html"

})

}

function login(){

let email=document.getElementById("email").value

let password=document.getElementById("password").value

auth.signInWithEmailAndPassword(email,password)

.then(()=>{

window.location="index.html"

})

}