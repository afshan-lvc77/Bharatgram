function follow(userId){

let current=auth.currentUser.uid

db.collection("follows").add({

from:current,

to:userId

})

}