import express from "express"
import fs from "node:fs"

import assignments from "./classes/assingments.js"

let router = express.Router()

router.use(express.json())
router.use("/",assignments)

router.get("/",(req,res)=>{
    res.json({
        message:"hello"
    })
})

router.post("/addclass",async (req,res)=>{
  let currentData = JSON.parse(fs.readFileSync("./src/data/classes.json"))
  let incommingData = req.body

  currentData[incommingData.class] = {
    grade: incommingData.grade,
    period: incommingData.period
  }
  fs.writeFileSync("./src/data/classes.json",JSON.stringify(currentData))
})

router.get("/getclass/:classname",async (req,res)=>{
  let currentData = JSON.parse(fs.readFileSync("./src/data/classes.json"))

  let classname = req.params.classname
  console.log(currentData[classname])
  res.json(currentData[classname])
})

router.get("/getAllClasses",async (req,res)=>{
  let currentData = JSON.parse(fs.readFileSync("./src/data/classes.json"))
  res.json(currentData)
})


// non router logic magik, (idk ima wing this)

async function saveJSONdata(path,data) {
  try {
    await fs.writeFile(path, data);
  } catch (err) {
    console.log(err);
  }
}

// validate classes.json cuz undefined is bad.
// also make it async so it wont screw with the rest of the app


// I think typescript had something for this 


// before I forget, format:
/*

{
  class:{
    grade:string
    period:string
    homeworkCategories{
      category: weight number
    }
    homework:[
      {
        name:string,
        grade:0-100,
        category:string
      }
    ]
  }
}
*/
async function validateClassesJSON() {
  let currentData = JSON.parse(fs.readFileSync("./src/data/classes.json"))

  // properties of each class (its gonna become a nightmare later)
  // TODO: add defaults later
  let properties = {
    grade:0,
    period:1,
    homeworkCategories:{
      default:100
    },
    homework:[]
  }

  for(let i in currentData){
    let theClass = currentData[i]
    for(let o in properties){
      if(!theClass[o]){
        currentData[i][o] = properties[o]
      }
    }
    
  }
  // had to add  --ignore '*.json' or else the dam thing restarts itself
  fs.writeFileSync("./src/data/classes.json",JSON.stringify(currentData))
}
validateClassesJSON()
export default router