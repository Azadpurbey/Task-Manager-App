const express=require('express')
const multer=require('multer')
const router=new express.Router()
const User=require('../models/user')
const auth=require('../middleware/auth')

router.post('/users',async(req,res)=>{     //create user
    const user=new User(req.body) 
    try{
      await user.save()
       const token=await user.generateAuthToken()
       res.status(201).send({user,token})
    }catch(error){
       res.status(400).send(error)
    }
 })

 router.post('/users/login',async(req,res)=>{         //login
   try{
      const user=await User.findByCredentials(req.body.email,req.body.password)
      const token=await user.generateAuthToken()
       res.send({user,token})
   }catch(e){
      res.status(400).send(e)
   }
})

router.post('/users/logout',auth,async(req,res)=>{    //logout
   try{
      req.user.tokens=req.user.tokens.filter((token)=>{
         return token.token!==req.token
      })
      await req.user.save()
      res.send()

   }catch(e){
      res.status(500).send(e)
   }
})

router.post('/users/logoutAll',auth,async(req,res)=>{   //logoutAll
   try{
      req.user.tokens=[]
      await req.user.save()
      res.send()
   }catch(e){
      res.status(500).send(e)
   }
})


 router.get('/users/me',auth,async(req,res)=>{           //read profile
     res.send(req.user)
 })
 
 router.patch('/users/me',auth,async(req,res)=>{     //update user
    const updates= Object.keys(req.body) 
    console.log(updates)
    const allowedUpdates=['name','password','email','age']
    const isValidOperation=updates.every((update)=>allowedUpdates.includes(update))
    if(!isValidOperation){
       return res.status(400).send({error:"Invalid update!"})
    }
    
    try{
      // const user = req.user    
      updates.forEach((update) => req.user[update] = req.body[update])

      await req.user.save()
      //  const user=await User.findByIdAndUpdate(req.params.id,req.body,{new:true, runValidators:true})
       res.send(req.user) 
     }catch(e){
       res.status(400).send("I am the one" +e)
     }
 })
 
 router.delete('/users/me',auth,async(req,res)=>{          //delete user
    try{
      await req.user.remove()
      res.send(req.user)
    }catch(e){
      res.status(500).send("Something went wrong! "+e)
    }
 }) 





const upload=multer({
   dest:'avatars',
   limits:{
      fileSize:1000000
   }
})

router.post('/users/me/avatar',upload.single('avatars'),(req,res)=>{
   res.send()
})




module.exports=router