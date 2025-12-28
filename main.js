import express from "express"
const app = express()

app.get("/",(req, res)=>{
    res.send("app alive")
})

app.listen(8080,()=>{
    console.log("App hosted at localhost:8080")
})