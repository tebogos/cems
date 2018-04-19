const baseUrl = process.env.REACT_APP_BASE_URL

var myHeaders = myHeaders = new Headers({
  'Accept': 'application/json',
  'Content-Type': 'application/json charset=UTF-8"',  
  "Access-Control-Allow-Methods":"GET, POST, OPTIONS, PUT, DELETE",  
  'Access-Control-Allow-Origin': '*',
  "Access-Control-Request-Headers": "X-Requested-With, accept, content-type",
  'Access-Control-Allow-Headers': "Content-Type"
});



export const assignUserService = (data) => {
  return fetch('http://localhost:8081/process-defination//assign-first-task-to-user', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
}


export const getFirmsService= (searchString) => {
  return fetch(`http://localhost:8081/firm/get-firm?firmName=${searchString}`)
    .then(res =>res.json())
}
export const getAllProcessUserService = () => {
  return fetch('http://localhost:8081/process-defination/get-all-users')
    .then(res =>res.json())
}

export const getTasks = () => {
  return fetch('http://localhost:8081/process-defination/get-unassigned-tasks')
    .then(res =>res.json())
}

export const getMyTasks = (userId) => {
  return fetch(`http://localhost:8081/process-defination/get-my-tasks/${userId}`)
    .then(res =>res.json())
}

export const createTask = (name) => {
  return fetch('http://localhost:8081/tasks/task', {
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
  var myRequest = new Request(`http://localhost:8081/process-defination/complete-task`, {
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
  var myRequest = new Request(`http://localhost:8081/tasks/task/${task._id}`, {
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
  var myRequest = new Request(`http://localhost:8081/tasks/task/${id}`, deleteInit);
  return fetch(myRequest)
}
