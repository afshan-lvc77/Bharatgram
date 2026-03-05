function sendMessage(){

let text=document.getElementById("msg").value

db.collection("messages").add({

user:auth.currentUser.uid,
message:text,
time:Date.now()

})

}

db.collection("messages")
.orderBy("time")
.onSnapshot(snapshot=>{

let box=document.getElementById("messages")

box.innerHTML=""

snapshot.forEach(doc=>{

let data=doc.data()

box.innerHTML+=`

<p>${data.message}</p>

`

})

})