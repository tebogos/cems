import {baseUrl} from '../../baseUrl';
// let baseUrl="";
// if(process.env.NODE_ENV === 'production')
//    baseUrl = process.env.REACT_APP_PROD_BASE_URL
// else
//  const   baseUrl = process.env.REACT_APP_BASE_URL



export const getDefinitionsService= () => {
    return fetch(`${baseUrl}/process-defination/start-process`)
      .then(res =>res.json())
  }