const express = require('express')
const salaryController = require('../controller/salary')
const router = express.Router();

router.get('/', salaryController.findAll);
// router.get('/:id', salaryController.findOne);
router.post('/', salaryController.create);

// router.patch('/:id', salaryController.update);
// router.delete('/:id', salaryController.destroy);

module.exports = router