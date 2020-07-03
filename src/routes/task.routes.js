const express= require('express');

const router= express.Router();

const Task = require('../models/task');

router.get('/',async (req,res)=>{

   
        const tasks= await Task.find();
        console.log(tasks);
        res.json(tasks)
   
    
})

router.post('/',async (req,res)=>{
    let title=""
    let description=""
    let prioridad=""
    if(!req.body.prioridad){

        prioridad="secondary"
        title=req.body.title
        description=req.body.description    

    }else if(!req.body.prioridad.includes("primary") && !req.body.prioridad.includes("secondary") &&
    !req.body.prioridad.includes("success") && !req.body.prioridad.includes("danger") && !req.body.prioridad.includes("warning")
    && !req.body.prioridad.includes("info") && !req.body.prioridad.includes("light") && !req.body.prioridad.includes("dark") ){
        prioridad="secondary"
        title=req.body.title
        description=req.body.description
    }else{
        prioridad=req.body.prioridad
        title=req.body.title
        description=req.body.description
    }

     
    
  const task=  new Task({
        title,
        description,
        prioridad
        
    })

    await task.save()

    console.log(task)
    res.json({status:"Tarea guardada"})
})

router.put('/', async (req,res)=>{
    const {title, description}=req.body
    const newTask= {title, description};
    
    console.log("hola soy body"+" "+req.body)
     await Task.findOneAndUpdate()

//    await  Task.findOneAndUpdate(title, update, {
//         description: req.body.description,
//         : true,
//         rawResult: true // Return the raw result from the MongoDB driver
//       });
   await Task.findByIdAndUpdate(req.body.id,newTask)
    console.log("hola soy id"+ " "+ req.body.id)

    res.json("Tarea actualizada")
})

router.delete('/',async (req,res)=>{
    await Task.findByIdAndDelete(req.body.id);
    res.json({status:"Tarea eliminada"})
})

router.get('/:id',async (req,res)=>{
     let taskEncontrado=  await Task.findById(req.params.id)
    console.log(req.params.id)
    res.json({status:200,data: taskEncontrado})
})

module.exports=router;