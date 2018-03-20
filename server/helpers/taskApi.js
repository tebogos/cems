
const fetch = require('node-fetch');



module.exports={

 getTask :async (url)=>{

   console.log("<--URL-->",url);
 fetch(url)
  .then(async (response) => {response.json()})

  .catch(error => {
    console.log(error);
  });

}
}
