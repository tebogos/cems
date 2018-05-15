import {baseUrl} from '../../baseUrl';
// let baseUrl="";
// if(process.env.NODE_ENV === 'production')
//    baseUrl = process.env.REACT_APP_PROD_BASE_URL
// else
  // const  baseUrl = process.env.REACT_APP_BASE_URL


export const postProcessForm = (form,showMessage) => {
    return fetch(`${baseUrl}/process-defination/start-selected-process`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    })
      .then(res =>showMessage("Form added successfuly")||res.json())
  }
  