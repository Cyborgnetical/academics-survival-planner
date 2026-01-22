import express from "express"
import fs from "node:fs"

let router = express.Router()

router.use(express.json())


router.get("/:classname/assingments",(req,res)=>{
    console.log(req.params)
})


// assingment format:
/*

{
    name,
    grade,
    category,
}

*/
router.post("/:classname/assingments/addAssingment",(req,res)=>{
  let currentData = JSON.parse(fs.readFileSync("./src/data/classes.json"))[req.params.classname]

})

export default router