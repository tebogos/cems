
const express = require('express');
const router = require('express-promise-router')();


const ProcessDefinationController =require('../controllers/process-defination');

router.route('/deploy')
.get(ProcessDefinationController.deployProcesses);

router.route('/start-process')
.get(ProcessDefinationController.startProcess);

router.route('/start-selected-process')
.post(ProcessDefinationController.submitSelectedProcess);

router.route('/get-unassigned-tasks')
.get(ProcessDefinationController.getUnassignedTasks);
router.route('/get-my-tasks/:id')
.get(ProcessDefinationController.getMyTasks);

router.route('/get-all-users')
.get(ProcessDefinationController.getAllUsers);

router.route('/assign-task-to-user')
.post(ProcessDefinationController.assignTaskToUser);

router.route('/assign-first-task-to-user')
.post(ProcessDefinationController.assignFirstTaskToUser);

router.route('/complete-task')
.post(ProcessDefinationController.completeTask);

router.route('/get-task-by-variable')
.post(ProcessDefinationController.getTasksByVariable);

router.route('/get-task-by-assignee')
.post(ProcessDefinationController.getTasksByAssignee);

router.route('/update-variable')
.post(ProcessDefinationController.updateVariable);

module.exports = router;
