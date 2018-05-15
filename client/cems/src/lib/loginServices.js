

import {baseUrl} from '../../baseUrl';
  // const  baseUrl = process.env.REACT_APP_BASE_URL

    console.log("process.env.NODE_ENV",process.env.NODE_ENV);
    

var myHeaders = new Headers({
  'Accept': 'application/json',
  'Content-Type': 'application/json charset=UTF-8"',  
  "Access-Control-Allow-Methods":"GET, POST, OPTIONS, PUT, DELETE",  
  'Access-Control-Allow-Origin': '*',
  "Access-Control-Request-Headers": "X-Requested-With, accept, content-type",
  'Access-Control-Allow-Headers': "Content-Type"
});
export const httpLoginUser = (tokenId) => {
    return fetch(`${baseUrl}/users/oauth/google`,{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "access_token":tokenId
        })
    })
      .then(res => res.json())
  }


  