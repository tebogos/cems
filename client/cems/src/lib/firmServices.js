import {baseUrl} from '../../baseUrl';
// const  baseUrl = process.env.REACT_APP_BASE_URL

var myHeaders = myHeaders = new Headers({
  'Accept': 'application/json',
  'Content-Type': 'application/json charset=UTF-8"',  
  "Access-Control-Allow-Methods":"GET, POST, OPTIONS, PUT, DELETE",  
  'Access-Control-Allow-Origin': '*',
  "Access-Control-Request-Headers": "X-Requested-With, accept, content-type",
  'Access-Control-Allow-Headers': "Content-Type"
});






export const getFirmsService= (searchString) => {
  return fetch(`${baseUrl}/firm/get-firm?firmName=${searchString}`)
    .then(res =>res.json())
}
