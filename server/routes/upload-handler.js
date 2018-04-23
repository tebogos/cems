const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');
const passportConf = require('../passport');

const { validateBody, schemas } = require('../helpers/routeHelpers');
const TaskController = require('../controllers/tasks');
const FileController = require('../controllers/files');
const passportSignIn = passport.authenticate('local', { session: false });
const passportJWT = passport.authenticate('jwt', { session: false });
const Multer = require('multer');
const helmet = require('helmet');
const Storage = require('@google-cloud/storage');
const storage = Storage();


const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
      fileSize: 5 * 1024 * 1024 // no larger than 5mb, you can change as needed.
    }
  });

 



router.route('/')
.post(multer.single('file'),FileController.upload);

module.exports = router;
