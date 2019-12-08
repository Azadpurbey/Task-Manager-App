const express=require('express')
require('./db/mongoose')
const app=express()
const userRouter=require('./routers/user')
const taskRouter=require('./routers/task')

const port=process.env.PORT || 3000



// app.use((req,res,next)=>{
//    if(req.method==='GET'){
//       res.send("GET function is disabled")
//    }
//    else{
//       next()
//    }
// })

// app.use((req,res,next)=>{
//   res.status(503).send("site is in mantainance mode try again latter")
// })


app.use(express.json())
app.use(userRouter)
app.use(taskRouter)



app.listen(port,()=>{
   console.log("server is up on port no. "+ port)
})


const multer=require('multer')
const upload=multer({
   dest:'images',
   limits:{
      fileSize:1000000
   },
   fileFilter(req,file,cb){
      if(!file.originalname.match(/\.(doc|docx)$/)){
         return cb(new Error("please enter doc type file!"))
      }
        cb(undefined,true)
   }
})
app.post('/upload',upload.single('upload'),(req,res)=>{
   res.send()
})

const Task=require('./models/task')
const User=require('./models/user')

const main=async()=>{
   // const task=await Task.findById('5de9126df9b6e41f5c4a3208')
   // await task.populate('owner').execPopulate()
   // console.log(task.owner)
   const user=await User.findById('5de9124cf9b6e41f5c4a3205')
   await user.populate('tasks').execPopulate()
   console.log(user.tasks)
}
main()
