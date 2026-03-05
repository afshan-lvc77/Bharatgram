const upload = document.getElementById("upload")

upload.addEventListener("change",e=>{

const file=e.target.files[0]

const ref=storage.ref(file.name)

ref.put(file).then(()=>{

ref.getDownloadURL().then(url=>{

db.collection("posts").add({

image:url,

likes:0,

time:Date.now()

})

})

})

})

db.collection("posts")
.orderBy("time","desc")
.onSnapshot(snapshot=>{

const feed=document.getElementById("feed")

feed.innerHTML=""

snapshot.forEach(doc=>{

const post=doc.data()

feed.innerHTML+=`

<div class="post">

<img src="${post.image}">

<button onclick="like('${doc.id}')">❤</button>

</div>

`

})

})

function like(id){

db.collection("posts").doc(id).update({

likes:firebase.firestore.FieldValue.increment(1)

})

}