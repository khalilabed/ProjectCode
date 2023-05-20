const express = require('express')
const expenseController = require('../controller/expense');
// const isAuthenticated = require('../middlewares/auth').isAuthenticated;


const router = express.Router();


//Ahmed Al-barbari
router.get('/', expenseController.findAll);
router.get('/average', expenseController.average);
//-----------------------------------------------------------
router.get('/:id', expenseController.findOne);
router.post('/', expenseController.create);
router.patch('/:id', expenseController.update);
router.delete('/:id', expenseController.destroy);

module.exports = router