db.collection("reels").onSnapshot(snapshot=>{

let reels=document.getElementById("reels")

reels.innerHTML=""

snapshot.forEach(doc=>{

let reel=doc.data()

reels.innerHTML+=`

<video controls autoplay loop>

<source src="${reel.video}">

</video>

`

})

})