const JWT = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_SECRET } = require('../configuration');
const fetch = require('node-fetch');
const {getTask}=require('../helpers/taskApi');
const todo=require('../models/db.json');
const Tasks = require('../models/task');
const mongoose =require('mongoose');
const {baseUrl} = require('../base-url');

const CamSDK = require('camunda-bpm-sdk-js');

var fs = require('fs');
var path = require('path');
var inquirer = require('inquirer');
var Table = require('cli-table');
const moment =require('moment');
const camClient = new CamSDK.Client({
    mock: false,
    // the following URL does not need authentication,
    // but the tradeof is that some requests will fail
    // e.g.: some filters use the reference to the user performing the request
    apiUri: `${baseUrl}http://localhost:8082/engine-rest`
  });

const processDefinitionService  = new camClient.resource('process-definition');
const processInstanceService    = new camClient.resource('process-instance');
const filterService             = new camClient.resource('filter');
const deploymentService         = new camClient.resource('deployment');
const taskService        = new camClient.resource('task');
const userService        = new camClient.resource('user');
const variableService        = new camClient.resource('variable');





const deployDir = __dirname + '/bpmn';


const  thr=(err) =>{
    if (err) {
      throw err;
    }
  }

  const toArray=(obj)=> {
    var arr = [];
    Object.keys(obj).forEach(function (key) {
      arr.push(obj[key]);
    });
    return arr;
  }
// returns an array of functions reading the content of files.
// To be used in CamSDK.utils.series()
function readFiles(dirPath, filenames) {
    return filenames.map(function (filename) {
      return function (cb) {
        fs.readFile(path.join(dirPath, filename), function (err, content) {
          if (err) { return cb(err); }
  
          cb(null, {
            name:    filename,
            content: content.toString()
          });
        });
      };
    });
  }
  
  
 const  deployProcesses=(options)=> {
     console.log("deployDir 2 --> ",deployDir);
     
    // get the files of the choosed direcory
    fs.readdir(options.dirPath, function (err, dirFiles) {
      thr(err);
  
      // store the path to be used as default value next time it's used
    //   deployDir = options.dirPath;
  
      
        // collect the content of the choosed files to be then uploaded
        CamSDK.utils.series(readFiles(options.dirPath, ['perform_inspection_subprocess.bpmn','start_sub_process.bpmn','verify_jurisdiction_supprocess.bpmn']), function (err, files) {
          thr(err);
  
          console.info(Object.keys(files).length + ' files will be deployed');
          // create a deployment with...
          deploymentService.create({
            // ... the settings
            deploymentName:           options.deploymentName,
            enableDuplicateFiltering: options.enableDuplicateFiltering,
            deployChangedOnly:        options.deployChangedOnly,
            // ... and the files
            files:                    toArray(files)
          }, function (err, deployment) {
            thr(err);
  
            console.log('deployment "' + deployment.name + '" succeeded, ' + deployment.deploymentTime);
          });
        });
    
    });
  }
  

  const updateVariable=(processInstanceVariableId,variable)=>{    
    processInstanceService.setVariable(processInstanceVariableId,variable,()=>{
        // res.status(200).json({responce:"success"});
    })
}

signToken = user => {
  return JWT.sign({
    iss: 'siyandiza',
    sub: user.id,
    iat: new Date().getTime(), // current time
    exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day ahead
  }, JWT_SECRET);
}

module.exports = {  

  getTaskComments:(req,res,next)=>{
      
     console.log("req.params",req.query.taskId);
     
       const {taskId} = req.query;
       console.log("taskId",taskId);
       taskService.comments(taskId,(err,data)=>{
        if(err)
           res.status(500).json({err:err});
        else
          res.status(200).json({comments:data})
       });
  },
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
    completeTask:(req,res)=>{
      const {taskId,variables}=req.body;
        taskService.complete({id:taskId,variables:variables},(err,data)=>{
        if(err)
           res.status(404).json({err:err});
        else
           res.status(200).json(data);
        })
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
    sheduleTaskCompletionForm: async (req, res, next) => {
      const {taskId,schDateFrom,schTimeFrom,schDateTo,schTimeTo}=req.body;
     console.log("in sheduleTaskCompletionForm task post controller and id is : ",taskId);
     taskService.complete({id:taskId,variables:{taskId:{value:taskId},schDateFrom:{value:taskId},schDateTo:{value:schDateTo},schTimeFrom:{value:schTimeFrom},schTimeTo:{value:schTimeTo}}},(err,results)=>{
       if(err)
         res.status(500).json({err:err});
       else
         res.status(200).json({status:"Task completed successfuly"})
     });
        
    },
    addTaskNote: async (req, res, next) => {
      const {taskId,note}=req.body;
     console.log("in addtask task post controller and id is : ",taskId);
     taskService.createComment(taskId,note,(err,results)=>{
       if(err)
         res.status(500).json({err:err});
       else
         res.status(200).json({status:"Task note added successfuly"})
     });
        
    }
    ,
  task: async (req,res,next)=>{
//  console.log("<--user ID--->",req.user.id);
//     const usr = await User.findById(req.user.id);
//     const usernameArray=usr.google.email.split('@');
//     const username=usernameArray[0];
// console.log("<--user Email--->",username);
//     const url =
//     "${baseUrl}/engine-rest/task?assignee="+username;
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
