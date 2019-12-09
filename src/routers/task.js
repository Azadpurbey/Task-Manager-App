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
 
 router.get('/tasks/me',auth,async(req,res)=>{        //read all tasks
     const match={}
     const sort={}
  
     if(req.query.completion){
        match.completion=req.query.completion==='true'
     }
     if(req.query.sortBy){
        const parts=req.query.sortBy.split(':')
        sort[parts[0]]= (parts[1]==="decs")?-1:1
        console.log(typeof(parts[1]))
        console.log(parts[0],parts[1])
        console.log(sort.createdAt)
     }
   
   try{
      // const tasks=await Task.find({owner:req.user._id,completion:true})
      await req.user.populate({
         path:"tasks",
         match,
         options:{
            limit:parseInt(req.query.limit),
            skip:parseInt(req.query.skip),
            sort
         }
        
        
      }).execPopulate()
      res.status(200).send(req.user.tasks)
    }catch{
       res.status(400).send(error)
    }
 })
 
 router.get('/tasks/:id',auth,async(req,res)=>{             //read task by id
    const _id=req.params.id
    try{
       const task=await Task.findOne({_id,owner:req.user._id})
       if(!task){
          return res.status(404).send("task not found")
        }
          res.send(task)
    }catch(e){
       res.status(500).send(e)
    }
 })
 
 router.patch('/tasks/:id',auth,async(req,res)=>{        //update task by id
    const updates= Object.keys(req.body) 
    const allowedUpdates=['description']
    const isValidOperation=updates.every((update)=>allowedUpdates.includes(update))
  
    if(!isValidOperation){
       res.status(400).send({error:"This update is not allowed"})
    }

   try{
       const task=await Task.findOne({_id:req.params.id,owner:req.user._id})
       if(!task){
         return res.status(404).send("you are not allowed to update this task")
      }
       updates.forEach((update)=>task[update]=req.body[update])
       
       

      //  const task=await Task.findByIdAndUpdate(req.params.id,req.body,{new:true, runValidators:true})

       await task.save()
       res.send(task)
 
    }catch(e){
       res.status(400).send(e)
    }
 })
 
 router.delete('/tasks/:id',auth,async(req,res)=>{       //delete task by id
    try{
      const task=await Task.findOne({_id:req.params.id,owner:req.user._id})
      // const task=await Task.findByIdAndDelete(req.params.id)
      if(!task){
        res.status(400).send("you are not allowed to delete this task")
      }
      res.send(task)
    }catch(e){
      res.status(500).send("Something went wrong! "+ e)
    }
 })

 module.exports=router