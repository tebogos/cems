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



export const getAllProcessUserService = () => {
  return fetch('http://localhost:8081/process-defination/get-all-users')
    .then(res =>res.json())
}

export const getTodos = () => {
  return fetch('http://localhost:8081/process-defination/get-unassigned-tasks')
    .then(res =>res.json())
}

export const createTodo = (name) => {
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


export const completeTodoService = (todo) => {
  console.log('update todo --> fecch ',todo );
  
  var updateInit = { 
              method: 'PUT',
               headers: myHeaders,
               mode: 'cors',
               cache: 'default' ,
               body: JSON.stringify(todo)};
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
               body: JSON.stringify(todo)
    },
  });
  return fetch(myRequest)
    .then(res => res.json())
}

export const updateTodo = (todo) => {
  console.log('update todo --> fecch ',todo );
  
  var updateInit = { 
              method: 'PUT',
               headers: myHeaders,
               mode: 'cors',
               cache: 'default' ,
               body: JSON.stringify(todo)};
  var myRequest = new Request(`http://localhost:8081/tasks/task/${todo._id}`, {
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
               body: JSON.stringify(todo)
    },
  });
  return fetch(myRequest)
    .then(res => res.json())
}


var deleteInit = { method: 'DELETE',
               headers: myHeaders,
               mode: 'cors',
               cache: 'default' };
export const destroyTodo = (id) => {
  var myRequest = new Request(`http://localhost:8081/tasks/task/${id}`, deleteInit);
  return fetch(myRequest)
}
