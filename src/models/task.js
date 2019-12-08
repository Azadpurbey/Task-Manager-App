const mongoose=require('mongoose')


const taskSchema=new mongoose.Schema({
  description:{
    type:String,
    trim:true,
    required:true
  },
  completion:{
    type:Boolean,
    default:false
  },
  owner:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:'users'
  }

})

taskSchema.pre('save',async function(next){
  console.log("just before the saving!")

  next()
})

const task=mongoose.model(('tasks'),taskSchema)

module.exports=task