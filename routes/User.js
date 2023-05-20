// // const express = require('express')
// // const UserController = require('../controller/User')
// // const router = express.Router();
//
// // router.get('/', UserController.findAll);
// // router.get('/:id', UserController.findOne);
// // router.post('/', UserController.create);
// // router.patch('/:id', UserController.update);
// // router.delete('/:id', UserController.destroy);
//
// // module.exports = router
//
// const express = require('express');
// const passport = require('passport');
// const User = require('./userModel');
//
// const router = express.Router();
//
// router.post('/register', async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const user = new User({ email, password });
//         await user.save();
//         res.redirect('/'); // redirect to the home page
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// });
//
//
// router.post('/login', passport.authenticate('local'), (req, res) => {
//     res.json({ message: 'Authentication successful' });
// });
//
// module.exports = router;
