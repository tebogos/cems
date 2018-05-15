const fetch = require('node-fetch');
const CamSDK = require('camunda-bpm-sdk-js');

var fs = require('fs');
var path = require('path');
var inquirer = require('inquirer');
var Table = require('cli-table');
const moment =require('moment');
var FormData = require('form-data');
const {baseUrl} = require('../base-url');


const camClient = new CamSDK.Client({
    mock: false,
    // the following URL does not need authentication,
    // but the tradeof is that some requests will fail
    // e.g.: some filters use the reference to the user performing the request
    apiUri: `${baseUrl}/engine-rest`
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

const postTaskAttachments=(attachments,taskId)=>{
    var form = new FormData();
    attachments.map(field=>{
        form.append('attachment-name', field.name);
        form.append('attachment-description', field.description);
        form.append('attachment-type', field.type);
        form.append('url', field.url);
    });   

    form.submit('http:8082//engine-rest/task/taskId/attachment/creat', function(err, res) {
// res – response object (http.IncomingMessage)  //
res.resume();
});
}

  module.exports = {
    deployProcesses:(req, res, next)=>{
        console.log("deployDir 2 --> ",deployDir);
         deployProcesses({dirPath:deployDir,deploymentName:"timi-extenal-worker-process",enableDuplicateFiltering:true,deployChangedOnly:true});
    
  },
  startProcess:(req, res, next)=>{
      
      // get the list of available process definitions
    processDefinitionService.list({}, function (err, results) {
        thr(err);
    
        // make the results suitable for inquirer choices
        var definitions = results.items.map(function (definition) {
          return {
            value: definition.id,
            name: definition.name || definition.key || definition.id
          };
        });
        console.log("difinitions on server ",definitions );
        
        res.json({definitions:definitions})
    });
    },
    submitSelectedProcess:(req, res, next)=>{
     console.log("startin the sending process...");
       
 // ask which process should be started
 const {processId,requestorName,
    requetorId,workType,zone,region,firms,notes } = req.body;
    console.log("processId...",processId);
     const businessKey=zone+"-"+moment().year()+"-"+moment().month()+"-"+
     moment().day()+"-"+moment().hour()+"-"+moment().minute()+"-"+moment().second();
     console.log("businessKey...",businessKey);
     let variables={}
     
     if(req.body.attachments){
        variables={
            firstAssignee:{value:"",type:"String"},
            requetorId:{value:requetorId,type:"String"},
            workType:{value:workType,type:"String"},
            zone:{value:zone,type:"String"},
            region:{value:region,type:"String"},
            firms:{value:firms,type:"String"},
            notes:{value:notes,type:"String"},
            firmFound:{value:true,type:"boolean"},
            businessKey:{value:businessKey,type:"String"},
            attachmentName:{value:req.body.attachments.name,type:"String"},
            attachmentDescription:{value:req.body.attachments.description,type:"String"},
            attachmentType:{value:req.body.attachments.type,type:"String"},
        }
     }
     else{
        variables={
            firstAssignee:{value:"",type:"String"},
            requetorId:{value:requetorId,type:"String"},
            workType:{value:workType,type:"String"},
            zone:{value:zone,type:"String"},
            region:{value:region,type:"String"},
            firms:{value:firms,type:"String"},
            notes:{value:notes,type:"String"},
            firmFound:{value:true,type:"boolean"},
            businessKey:{value:businessKey,type:"String"}
        }
     }

      
        // start the choosed process definition
        processDefinitionService.submitForm({
            id:processId,
            variables:variables,
            businessKey:businessKey
          }, function (err) {
            thr(err);
    
            console.log('Process started');
            res.json({status:"Process started successfuly"})
          });
    },
    getUnassignedTasks:async (req,res)=>{
        console.log("req.query",req.query);
        
        const {region}=req.query;
        console.log("region",region);
        
        const regQuery="region_eq_"+region
        let tasks;
      await  taskService.list({unassigned:true,processVariables:regQuery},
    (err,data)=>{
        if(err){
            res.status(403).json({ error: 'err'});
        }
        else{
            // res.json(data);
             tasks=data;
        }
    });
    
    console.log("task 0000---111 ",tasks);
    if(tasks._embedded.task.length>0){
      const processInstanceId=tasks._embedded.task[0].processInstanceId;
    
    console.log("task 0000---111 ",processInstanceId);
    variableService.instances({processInstanceIdIn:[processInstanceId]},
        (err,data)=>{
            if(err){
                res.status(403).json({ error: 'err'});
            }
            else{
                res.status(200).json({tasks:tasks,variables:data});
                 
            }
        });
    }
    else{
        console.log("task suppose not to be found ",tasks._embedded.task);
        res.status(204).json({status:"Tasks not found"})
    }
    },
    getMyTasks:async(req,res)=>{
        // const {processDefinitionName}=req.body;
        console.log("userId in ---000---000---",req.query.userId);
        const userId= req.query.userId;
        console.log("userId in ---000---000---",userId);
        let tasks;
        
        await taskService.list({assignee:userId,active:"true"},
        (err,data)=>{
            if(err){
                res.status(403).json({ error: 'err'});
            }
            else{
                // res.json(data);
                 tasks=data;
            }
        });
        
        if(tasks._embedded.task.length>0){
            const processInstanceId=tasks._embedded.task[0].processInstanceId;
            console.log("task 0000---111 ",processInstanceId);
            variableService.instances({processInstanceIdIn:[processInstanceId]},
                (err,data)=>{
                    if(err){
                        res.status(403).json({ error: 'err'});
                    }
                    else{
                        res.json({tasks:tasks,variables:data});
                        
                    }
                });
            }
        else{
            console.log("task suppose not to be found ",tasks._embedded.task);
                res.status(204).json({status:"Tasks not found"})
        }
    },
    assignTaskToUser:(req,res)=>{
        const {taskId,userId} = req.body;
        console.log(`from post User ${userID} taskId : ${taskId} `);
        
        taskService.claim({taskId:taskId,userId:userId},()=>{
            res.status(200).json({responce:"success"})
        })
    },
    assignFirstTaskToUser:(req,res)=>{
        const {taskId,userId,processInstanceId} = req.body;
        console.log(`from post User ${userId} taskId : ${taskId} processInstanceId : ${processInstanceId}`);
        updateVariable(processInstanceId,{name:'firstAssignee',value:userId,type:'String'});
        taskService.claim({taskId:taskId,userId:userId},()=>{
            res.status(200).json({responce:"success"})
        })
    },
    getAllUsers:(req,res)=>{

        const users=userService.list({sortBy:"firstName",sortOrder:"asc"},(err,data)=>{
            if(err)
              res.status(200).json(err);
            else
             res.status(200).json(data);
        }
    )   
    },
   
    getTasksByVariable:(req,res)=>{
        const {processInstanceBusinessKey,taskVariables}=req.body;
        taskService.list({processInstanceBusinessKey:processInstanceBusinessKey,taskVariables:taskVariables},
    (err,data)=>{
        if(err){
            res.status(403).json({ error: 'err'});
        }
        else{
            res.json(data);
        }
    })
    },
    getTasksByAssignee:(req,res)=>{
        const {processInstanceBusinessKey,assignee}=req.body;
        taskService.list({processInstanceBusinessKey:processInstanceBusinessKey,assignee:assignee},
    (err,data)=>{
        if(err){
            res.status(403).json({ error: 'err'});
        }
        else{
            res.json(data);
        }
    })
    },
    updateVariable:(req,res)=>{
        const {processInstanceVariableId,variable} =req.body;
        processInstanceService.setVariable(processInstanceVariableId,variable,()=>{
            res.status(200).json({responce:"success"});
        })
    },
    getProcessDiagram:(req,res)=>{


    }
    
}
  