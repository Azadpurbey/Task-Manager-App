 //CRUD create read update and delete data from mongodb database
const mongodb=require('mongodb')
const {MongoClient,ObjectID}=mongodb               
const connectionURL='mongodb://127.0.0.1:27017'
const databaseName='task-manager'

MongoClient.connect(connectionURL,{useNewUrlParser:true},(error,client)=>{
    if(error){
       return console.log("unable to connect with database!")
    }

   const db=client.db(databaseName)
   // db.collection('users').insertOne({                       // INSERTION
   //     name:'anand',
   //     age:23
   // },(error,result)=>{
   //     if(error){
   //         return console.log('unable to insert data into database')
   //     }
   //     console.log(result.ops)

   // })

   //   db.collection('tasks').insertMany([
   //       {
   //          description:"morning walk",
   //          completed:true
   //       },
   //       {
   //          description:"evening walk",
   //          completed:true
   //       },
   //       {
   //          description:"exercise",
   //          completed:false
   //       }
   //   ],(error,result)=>{
   //      if(error){
   //          return console.log('unable to insert data into database')
   //      }
   //      console.log(result.ops)
   //   })
   

   //  db.collection('users').find({name:'azad'}).toArray((erreo,users)=>{   //READING DATA
   //   console.log(users)
   //  })
   //  db.collection('users').find({name:'azad'}).count((erreo,count)=>{     
   //    console.log(count)
   //   })
   // db.collection('tasks').find({completed:true}).toArray((error,data)=>{
   //    console.log(data)
   // })
   // db.collection('tasks').findOne({_id :new ObjectID("5de52f4c9b9436281c2c4d76")},(error,data)=>{
   //    console.log(data)
   // })
   

   // db.collection('users').updateOne({_id:new ObjectID("5de6037733fa9e21e0164c34") },{    //UPDATE
   //     $inc:{                                                                           // inc is used for increment
   //       age:100
   //     }
   //  }).then((result)=>{
   //     console.log(result)
   //  }).catch((error)=>{
   //    console.log(error)
   //  })
  
   //db.collection('tasks').updateMany({completed:true},{            //UPDATE
   //    $set:{
   //       completed:false
   //    }
   // }).then((result)=>{
   //    console.log(result)
   // }).catch((error)=>{
   //    console.log(error)
   // })
 
   //  db.collection('tasks').deleteMany({                                // DELETION
   //     description:"morning walk"
   //  }).then((data)=>{
   //     console.log(data)
   //  }).catch((error)=>{
   //    console.log(error)
   //  })


})