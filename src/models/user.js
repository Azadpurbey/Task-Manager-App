const mongoose=require('mongoose')
const validator=require('validator')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')


const userSchema=new mongoose.Schema({
  name:{
    type:String,
    trim:true,
    required:true
  },
  age:{
    type:Number,
    default:0,
    validate(value){
      if(value<0){
        throw new Error('age is not valid')
      }
    }
  },
  email:{
    type:String,
    unique:true,
    lowercase:true,
    validate(value){
      if(!validator.isEmail(value)){
        throw new Error('Email is not valid')
      }
    }
  },
  password:{
    type:String,
    required:true,
    trim:true,
    validate(value){
      if(value.length<7){
        throw new Error('password is weak')
      }
      if(value.includes("password")){
        throw new Error('password is not valid')
      }
    }
  },
  tokens:[{
    token:{
      type:String,
      required:true
    }
  }]
})

userSchema.virtual('tasks',{
  ref:'Task',
  localField:'_id',
  foreignField:'owner'
})
userSchema.methods.toJSON=function(){
  const user=this
  userObject=user.toObject()
  delete userObject.password
  delete userObject.tokens
  return userObject
}
userSchema.methods.generateAuthToken=async function(){
  const user=this
  const token=jwt.sign({_id:user._id.toString()},'thisismynewcourse')
  user.tokens=user.tokens.concat({token})
  await user.save()
  return token
}

userSchema.statics.findByCredential=async (email,password)=>{
  const user=await User.findOne({email})
  if(!user){
    throw new Error('unable to connect')
  }
  const isMatct=await bcrypt.compare(password,user.password)
  if(!isMatct){
    throw new Error('unable to connect')
  }
  return user
}

//convert plain trxt into encrypted one before saving
userSchema.pre('save', async function(next){
  const user=this
  console.log("just before the saving!")
  if(user.isModified('password')){
    user.password=await bcrypt.hash(user.password,8)
  }

  next()
})

const User=mongoose.model(("users"),userSchema)

module.exports=User
