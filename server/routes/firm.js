const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');
const passportConf = require('../passport');

const { validateBody, schemas } = require('../helpers/routeHelpers');
const FirmController = require('../controllers/firms');
const passportSignIn = passport.authenticate('local', { session: false });
const passportJWT = passport.authenticate('jwt', { session: false });



router.route('/save')
.post(validateBody(schemas.firmSchema),FirmController.saveFirm);
router.route('/get-firm')
.get(FirmController.getFirm);


module.exports = router;

