const baseUrl = process.env.REACT_APP_BASE_URL

export const getTodos = () => {
  return fetch('http://localhost:8081/tasks/task')
    .then(res => res.json())
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

export const updateTodo = (todo) => {
  return fetch(`http://localhost:8081/tasks/task/${todo.id}`, {
    method: 'PUT',
    mode: 'cors',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
      'Origen':'*',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*'
    },
    body: JSON.stringify(todo)
  })
    .then(res => res.json())
}

export const destroyTodo = (id) => {
  return fetch(`${baseUrl}/${id}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
}
