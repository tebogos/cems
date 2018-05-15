import axios from 'axios';
// let baseUrl="";
// if(process.env.NODE_ENV === 'production')
//    baseUrl = process.env.REACT_APP_PROD_BASE_URL
// else
  // const  baseUrl = process.env.REACT_APP_BASE_URL

  import {baseUrl} from '../../baseUrl';


var myHeaders = myHeaders = new Headers({
  'Accept': 'application/json',
  'Content-Type': 'application/json charset=UTF-8"',  
  "Access-Control-Allow-Methods":"GET, POST, OPTIONS, PUT, DELETE",  
  'Access-Control-Allow-Origin': '*',
  "Access-Control-Request-Headers": "X-Requested-With, accept, content-type",
  'Access-Control-Allow-Headers': "Content-Type"
});



export const assignUserService = (data) => {
  return fetch(`${baseUrl}/process-defination/assign-first-task-to-user`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
}

export const postScheduleTaskForm = (form) => {
  return fetch(`${baseUrl}/tasks/schedule-task-completion-form`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  })
    .then(res => res.json())
}
// export const postAddNoteForm = (form,getTaskCommets) => {
//   return fetch('${baseUrl}/tasks/add-task-note', {
//     method: 'POST',
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(form)
//   })
//     .then(res=>getTaskCommets(form.taskId)||res).then(res => res.json())
// }
export const postAddNoteForm=(form,getTaskCommets)=>{

try {
    return axios.post(`${baseUrl}/tasks/add-task-note,form`).then(res=>{
   getTaskCommets(form.taskId);
  return res
});
}
catch(err){
 return err;
}
}

export const postTask=(form)=>{

  try {
      return axios.post(`${baseUrl}/tasks/complete-task`,form).then(res=>{
    //  getTaskCommets(form.taskId);
    return res
  });
  }
  catch(err){
   return err;
  }
  }

export const getFirmsService= (searchString) => {
  return fetch(`${baseUrl}/firm/get-firm?firmName=${searchString}`)
    .then(res =>res.json())
}
export const getAllProcessUserService = () => {
  return fetch(`${baseUrl}${baseUrl}/process-defination/get-all-users`)
    .then(res =>res.json())
}

export const getTasks = () => {
  return fetch(`${baseUrl}/process-defination/get-unassigned-tasks`)
    .then(res =>res.json())
}

export const getMyTasks = (userId) => {
  return fetch(`${baseUrl}/process-defination/get-my-tasks/${userId}`)
    .then(res =>res.json())
}

export const createTask = (name) => {
  return fetch('${baseUrl}/tasks/task', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({name: name, isComplete: false})
  })
    .then(res => res.json())
}


export const completeTaskService = (task) => {
  console.log('update task --> fecch ',task );
  
  var updateInit = { 
              method: 'PUT',
               headers: myHeaders,
               mode: 'cors',
               cache: 'default' ,
               body: JSON.stringify(task)};
  var myRequest = new Request(`${baseUrl}/process-defination/complete-task`, {
    method: 'POST',
    header:{
      'Accept': 'application/json',
      'Content-Type': 'application/json charset=UTF-8"',  
      "Access-Control-Allow-Methods":"GET, POST, OPTIONS, PUT, DELETE",  
      'Access-Control-Allow-Origin': '*',
      "Access-Control-Request-Headers": "X-Requested-With, accept, content-type",
      'Access-Control-Allow-Headers': "Content-Type",
      mode: 'cors',
               cache: 'default' ,
               body: JSON.stringify(task)
    },
  });
  return fetch(myRequest)
    .then(res => res.json())
}

export const updateTask = (task) => {
  console.log('update task --> fecch ',task );
  
  var updateInit = { 
              method: 'PUT',
               headers: myHeaders,
               mode: 'cors',
               cache: 'default' ,
               body: JSON.stringify(task)};
  var myRequest = new Request(`${baseUrl}/tasks/task/${task._id}`, {
    method: 'PUT',
    header:{
      'Accept': 'application/json',
      'Content-Type': 'application/json charset=UTF-8"',  
      "Access-Control-Allow-Methods":"GET, POST, OPTIONS, PUT, DELETE",  
      'Access-Control-Allow-Origin': '*',
      "Access-Control-Request-Headers": "X-Requested-With, accept, content-type",
      'Access-Control-Allow-Headers': "Content-Type",
      mode: 'cors',
               cache: 'default' ,
               body: JSON.stringify(task)
    },
  });
  return fetch(myRequest)
    .then(res => res.json())
}


var deleteInit = { method: 'DELETE',
               headers: myHeaders,
               mode: 'cors',
               cache: 'default' };
export const destroyTask = (id) => {
  var myRequest = new Request(`${baseUrl}/tasks/task/${id}`, deleteInit);
  return fetch(myRequest)
}
