const JWT = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_SECRET } = require('../configuration');
const fetch = require('node-fetch');
const {getTask}=require('../helpers/taskApi');
const todo=require('../models/db.json');
const Tasks = require('../models/task');
const mongoose =require('mongoose');

signToken = user => {
  return JWT.sign({
    iss: 'siyandiza',
    sub: user.id,
    iat: new Date().getTime(), // current time
    exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day ahead
  }, JWT_SECRET);
}

module.exports = {  
    saveTask: async (req, res, next) => {
      const {name,isComplete } = req.body;
     console.log("in save task post controller");
     
      // // Check if there is a user with the same email
      // const foundTask = await Tasks.findOne({ "name": name });
      // if (foundTask) {
      //   console.log("if it exist");
      //   return res.status(403).json({ error: 'Task is already in the list'});
      // }
     const newId=new mongoose.mongo.ObjectId();
     console.log("newId -->:",newId);
     
      // Create a new user
      const newTask = new Tasks({
        _id:newId,
        name: name,
        isComplete: isComplete
      });
      console.log("saving task");
      const tsk=await newTask.save();
      console.log("task saved --> ",tsk);
      // // Generate the token
      // const token = signToken(newUser);
      // Respond with token
      res.json(tsk);
    },
    updateTask: async (req, res, next) => {
      const id=req.params.id;
     console.log("in update task post controller and id is : ",id);
    //  console.log("isComplete is : ",isComplete);
     
     let isComplete;
     Tasks.findOne({_id:id},(err,task)=>{             
        isComplete=task.isComplete
        console.log("isComplete ::--::",isComplete);
        Tasks.findOneAndUpdate({_id:id},{$set:{isComplete:!isComplete}},{new:true},(err,task)=>{
          if(err)
           res.send('record uddated')
           else
          {
            console.log(task);
             res.json(task);
           }
        })
    
    
    }
    
    );
     
     
     
        
    },
    deleteTask: async (req, res, next) => {
      const id=req.params.id;
     console.log("in Delete task post controller and id is : ",id);
     
      
     Tasks.findByIdAndRemove({id:id},(err,task)=>{
       if(err)
        res.send('record deleted')
        else
        res.status(200);
     })
        
    },
  task: async (req,res,next)=>{
//  console.log("<--user ID--->",req.user.id);
//     const usr = await User.findById(req.user.id);
//     const usernameArray=usr.google.email.split('@');
//     const username=usernameArray[0];
// console.log("<--user Email--->",username);
//     const url =
//     "http://localhost:8080/engine-rest/task?assignee="+username;
  // fetch(url)
  //   .then(response => {
  //     response.json().then(json => {
  //       console.log(
  //         `Name: ${json[0].name} -`,
  //         `created: ${json[0].created} -`,
  //         `assignee: ${json[0].assignee}`
  //       );

  //       res.json(json);
  //     });
  //   })
  //   .catch(error => {
  //     console.log(error);
  //   });
  // Tasks.insertMany(
  //   {
  //     "id": 7,
  //     "name": "update records",
  //     "isComplete": false
  //   },
  //   {
  //     "name": "Final test",
  //     "isComplete": false,
  //     "id": 8
  //   },
  //   {
  //     "name": "My todo",
  //     "isComplete": true,
  //     "id": 9
  //   },
  //   {
  //     "name": "Morning Todo",
  //     "isComplete": true,
  //     "id": 10
  //   }
  // );
  Tasks.find({}).exec(function(err,tasks){
    //  console.log(tasks);
    
    res.json(tasks);
  })
    // res.json({todo:12345});
    }
}
