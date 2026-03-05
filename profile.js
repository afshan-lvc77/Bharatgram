let user=auth.currentUser

db.collection("posts")
.where("user","==",user.uid)
.get()

.then(snapshot=>{

let posts=document.getElementById("myposts")

snapshot.forEach(doc=>{

let post=doc.data()

posts.innerHTML+=`

<div class="post">

<img src="${post.image}">

</div>

`

})

})