// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
//
// const userSchema = new mongoose.Schema({
//     email: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     password: {
//         type: String,
//         required: true
//     }
// });
//
// userSchema.pre('save', function(next) {
//     const user = this;
//     bcrypt.hash(user.password, 10, function(err, hash) {
//         if (err) {
//             return next(err);
//         }
//         user.password = hash;
//         next();
//     });
// });
//
// userSchema.methods.comparePassword = function(candidatePassword, callback) {
//     bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
//         if (err) {
//             return callback(err);
//         }
//         callback(null, isMatch);
//     });
// };
//
// module.exports = mongoose.model('User', userSchema);
