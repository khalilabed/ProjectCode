const express = require('express')
const salaryController = require('../controller/salary')
const expenseController = require('../controller/expense')
const router = express.Router();


router.post('/', salaryController.create);
router.get('/', expenseController.findAll);


module.exports = router