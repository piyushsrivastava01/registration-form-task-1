var express= require("express")
var bodyparser= require("body-parser")
var mongoose=require("mongoose")

const app=express()

app.use(bodyparser.json())
app.use(express.static("public"))
app.use(bodyparser.urlencoded({
    extended:true
}))

mongoose.connect("mongodb+srv://vishva:Vishva2003@vishva.jgbhcuo.mongodb.net/", { useNewUrlParser:true}, {useUnifiedTopologyp:true})
var db=mongoose.connection
db.on("error",()=> console.log("Connection Database Error"))
db.once("open",()=> console.log("Connection to database"))

app.post("/Registration",(req,res)=>{
    var name =req.body.name
    var email=req.body.email
    var phone=req.body.phone
    var password =req.body.password

    var data={
        "name":name,
        "email":email,
        "phone":phone,
        "password":password
    }


    db.collection("user").insertOne(data,(err,collection)=>{
        if(err){
        throw err;
        }
        console.log("record Insersted Successfully")
    })
    return res.redirect("signsuccessful.html")
})

app.get("/",(req,res) => {
    res.set({
        "Allow-access-Allow-Origin":"*"
    })
    return res.redirect("Registration.html")
}).listen(4000);

console.log("listening on port 4000")