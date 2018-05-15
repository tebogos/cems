const format = require('util').format;
const helmet = require('helmet');
const Storage = require('@google-cloud/storage');
const storage = Storage({
    projectId: 'meibc-siyandiza1',
    keyFilename: './server/meibc-siyandiza1-73a1c79d9463.json'
  });


  const bucketName = 'siyandiza'
   // A bucket is a container for objects (files).
const bucket = storage.bucket(bucketName);
module.exports = {  

    upload:async(req,res,next)=>{
        console.log("I am in file upload server");
        
        if (!req.file) {
            res.status(400).send('No file uploaded.');
            return;
          }
   console.log("Original filename ----- ",req.file.originalname);
   
   
   
          // Create a new blob in the bucket and upload the file data.
  const blob = bucket.file(req.file.originalname);
  
  const blobStream = blob.createWriteStream({public:true});

  
  blobStream.on('error', (err) => {
    next(err);
  });
  await blobStream.on('finish', () => {
    // The public URL can be used to directly access the file via HTTP.
    const publicUrl = format(`https://storage.googleapis.com/siyandiza/${blob.name}`);
   console.log("publicURL -------......------",publicUrl);
   
    res.status(200).send(publicUrl);
  });

  await blobStream.end(req.file.buffer);

// const makePublic=()=>{
//   blob.makePublic()
//   .then(() => {
//     console.log(`gs://${bucketName}/${req.file.originalname} is now public.`);
//   })
//   .catch(err => {
//     console.error('ERROR:', err);
//   })
// }

//   setTimeout(
//     makePublic
//     ,20000)
  

    }
}