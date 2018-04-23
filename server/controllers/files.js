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

    upload:(req,res,next)=>{
        console.log("I am in file upload server");
        
        if (!req.file) {
            res.status(400).send('No file uploaded.');
            return;
          }
   console.log("Original filename ----- ",req.file.originalname);
   
   
   
          // Create a new blob in the bucket and upload the file data.
  const blob = bucket.file(req.file.originalname);
  
  const blobStream = blob.createWriteStream();

  
  blobStream.on('error', (err) => {
    next(err);
  });
  blobStream.on('finish', () => {
    // The public URL can be used to directly access the file via HTTP.
    const publicUrl = format(`https://storage.googleapis.com/siyandiza/${blob.name}`);
   console.log("publicURL -------......------",publicUrl);
   
    res.status(200).send(publicUrl);
  });

  blobStream.end(req.file.buffer);

    }
}