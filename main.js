import express from "express"

import classesRoute  from "./src/server/routes/classes.js"
const app = express()

app.use("/",express.static("./src/interface/"))
app.use("/classes",classesRoute)

app.listen(8080,()=>{
    console.log("App hosted at http://localhost:8080")
})

