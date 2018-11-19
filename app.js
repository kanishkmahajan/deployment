var firebase = require("firebase-admin");
const express=require('express');
const app=express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static("./public_static"))
firebase.initializeApp({
  credential: firebase.credential.cert('service_account.json'),
  databaseURL: "https://table-12.firebaseio.com"
});
app.get('/',express.static("./public_static/index.html"))
app.post("/user/:id",(req,res)=>{
	// console.log("hi");
	id=req.params.id
	firebase.database().ref('User/'+id).on('value',(snapshot,err)=>{
		res.send(snapshot.val());
	})
})

app.post("/ret",(req,res)=>{
	// console.log("hi");
	id=req.body.id
	firebase.database().ref('User/'+id).on('value',(snapshot,err)=>{
		res.send(snapshot.val());
	})
})
// app.post("/user",(req.body.id){
// 	id=req.body.id
// 	firebase.database().ref('User/'+id).on('value',(snapshot,err)=>{
// 		res.send(snapshot.val());
// 	})
// })
app.listen(2000)
