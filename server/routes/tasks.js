const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');
const passportConf = require('../passport');

const { validateBody, schemas } = require('../helpers/routeHelpers');
const TaskController = require('../controllers/tasks');
const passportSignIn = passport.authenticate('local', { session: false });
const passportJWT = passport.authenticate('jwt', { session: false });


router.route('/task')
.get(TaskController.task);
router.route('/task')
.post(TaskController.saveTask);
router.route('/task/:id')
.put(TaskController.updateTask);
router.route('/task/:id')
.delete(TaskController.deleteTask);
module.exports = router;
