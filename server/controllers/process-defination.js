const CamSDK = require('camunda-bpm-sdk-js');

var fs = require('fs');
var path = require('path');
var inquirer = require('inquirer');
var Table = require('cli-table');
const camClient = new CamSDK.Client({
    mock: false,
    // the following URL does not need authentication,
    // but the tradeof is that some requests will fail
    // e.g.: some filters use the reference to the user performing the request
    apiUri: 'http://localhost:8082/engine-rest'
  });

const processDefinitionService  = new camClient.resource('process-definition');
const processInstanceService    = new camClient.resource('process-instance');
const filterService             = new camClient.resource('filter');
const deploymentService         = new camClient.resource('deployment');
const taskService        = new camClient.resource('task');
const userService        = new camClient.resource('user');





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
        res.json({definitions:definitions})
    });
    },
    submitSelectedProcess:(req, res, next)=>{
 // ask which process should be started
 const {processId } = req.body;
        // start the choosed process definition
        processDefinitionService.submitForm({
            id:processId,
            variables:{firstAssignee:{value:"",type:"String"}},
            businessKey:"GRO123456-zone1"
          }, function (err) {
            thr(err);
    
            console.log('Process started');
            res.json({status:"Process started successfuly"})
          });
    },
    getUnassignedTasks:(req,res)=>{
        const {processDefinitionName}=req.body;
        taskService.list({unassigned:true,processDefinitionNameLike:processDefinitionName},
    (err,data)=>{
        if(err){
            res.status(403).json({ error: 'err'});
        }
        else{
            res.json(data);
        }
    })
    },
    getMyTasks:(req,res)=>{
        // const {processDefinitionName}=req.body;
        console.log("userId in ---000---000---",req.params.id);
        const userId= req.params.id;
        console.log("userId in ---000---000---",userId);
        
        taskService.list({assignee:userId,active:"true"},
    (err,data)=>{
        if(err){
            res.status(403).json({ error: 'err'});
        }
        else{
            res.json(data);
        }
    })
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
    completeTask:(req,res)=>{
      const {taskId,variables}=req.body;
        taskService.complete({id:taskId,variables:variables},(err,data)=>{
        if(err)
           res.status(404).json({err:err});
        else
           res.status(200).json(data);
        })
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
    }
    
}
  