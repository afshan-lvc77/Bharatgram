const storyUpload = document.getElementById("storyUpload")

storyUpload.addEventListener("change", e => {

const file = e.target.files[0]

const ref = storage.ref("stories/"+file.name)

ref.put(file).then(()=>{

ref.getDownloadURL().then(url=>{

db.collection("stories").add({

image:url,
user:auth.currentUser.uid,
time:Date.now()

})

})

})

})

db.collection("stories").onSnapshot(snapshot=>{

let container=document.getElementById("stories")

container.innerHTML=""

snapshot.forEach(doc=>{

let story=doc.data()

container.innerHTML+=`

<img src="${story.image}" width="100">

`

})

})