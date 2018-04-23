export const getDefinitionsService= () => {
    return fetch('http://localhost:8081/process-defination/start-process')
      .then(res =>res.json())
  }