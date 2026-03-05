db.collection("posts").limit(20).get()

.then(snapshot=>{

let explore=document.getElementById("explore")

snapshot.forEach(doc=>{

let post=doc.data()

explore.innerHTML+=`

<div class="post">

<img src="${post.image}">

</div>

`

})

})