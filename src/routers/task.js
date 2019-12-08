const express=require('express')
const Task=require('../models/task')
const auth=require('../middleware/auth')
const router=new express.Router()

router.post('/tasks',auth,async(req,res)=>{   //creation of task
   //  const task=new Task(req.body)
   const task=new Task({
     ...req.body,
     owner:req.user._id
   })
    try{
       await task.save()
       res.status(201).send(task)
 
    }catch{
       res.status(400).send(error)
    }
 })
 
 router.get('/tasks',async(req,res)=>{
    try{
      const tasks=await Task.find({})
      res.status(200).send(tasks)
    }catch{
       res.status(400).send(error)
    }
 })
 
 router.get('/tasks/:id',auth,async(req,res)=>{
    const _id=req.params.id
    try{
       const task=await Task.findById({_id,owner:req.user._id})
       if(!task){
          return res.status(400).send("task not found")
        }
          res.send(task)
    }catch{
       res.status(400).send(error)
    }
 })
 
 router.patch('/tasks/:id',async(req,res)=>{
    const updates= Object.keys(req.body) 
    const allowedUpdates=['description']
    const isValidOperation=updates.every((update)=>allowedUpdates.includes(update))
    if(!isValidOperation){
       res.status(400).send("This update is not allowed")
    }
 
    try{
       const task=await Task.findById(req.params.id)
       updates.forEach((update)=>task[update]=req.body[update])
       
       await task.save()

      //  const task=await Task.findByIdAndUpdate(req.params.id,req.body,{new:true, runValidators:true})
       if(!task){
          return res.status(404).send()
       }
       res.send(task)
 
    }catch(e){
       res.status(400).send(e)
    }
 })
 
 router.delete('/tasks/:id',async(req,res)=>{
    try{
      const task=await Task.findByIdAndDelete(req.params.id)
      if(!task){
       return res.status(400).send("User not found")
      }
      res.send(task)
    }catch(e){
      res.status(500).send("Something went wrong! "+ e)
    }
 })

 module.exports=router