export const postProcessForm = (form) => {
    return fetch('http://localhost:8081/process-defination/start-selected-process', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    })
      .then(res => res.json())
  }
  