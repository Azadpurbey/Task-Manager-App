const mongoose=require('mongoose')
// const validator=require('validator')
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false
})

// const User=mongoose.model(("users"),{
//     name:{
//       type:String,
//       trim:true,
//       required:true
//     },
//     age:{
//       type:Number,
//       default:0,
//       validate(value){
//         if(value<0){
//           throw new Error('age is not valid')
//         }
//       }
//     },
//     email:{
//       type:String,
//       lowercase:true,
//       validate(value){
//         if(!validator.isEmail(value)){
//           throw new Error('Email is not valid')
//         }
//       }
//     },
//     password:{
//       type:String,
//       required:true,
//       trim:true,
//       validate(value){
//         if(value.length<7){
//           throw new Error('password is weak')
//         }
//         if(value.includes("password")){
//           throw new Error('password is not valid')
//         }
//       }
//     }
// })

// const me=new User({
//     name:'Africa',
//     email:'Azad@123.com',
//     password:"anfs"
// })

// me.save().then(()=>{
//   console.log(me)
// }).catch((error)=>{
//   console.log(error)
// })

// const task=mongoose.model(('tasks'),{
//   description:{
//     type:String,
//     trim:true,
//     required:true
//   },
//   completion:{
//     type:Boolean,
//     default:false
//   }
// })

// new task({
//   description:"    second    ",
// }).save().then((data)=>{
//   console.log(data)
// }).catch((error)=>{
//   console.log(error)
// })












