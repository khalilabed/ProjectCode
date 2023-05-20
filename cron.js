// const cron = require('node-cron');
// const expenseModel = require('./models/Expense')
// const salaryModel = require('./models/Salary')
//
// // Schedule the task to run on the first day of every month at 12:00 AM
// cron.schedule('0 0 1 * *', async () => {
//     try {
//         // Replace 'userId' with the ID of the user whose expenses and salary you want to delete
//         const userId = '1234567890';
//         await expenseModel.deleteMany({ user: userId });
//         await salaryModel.deleteMany({ user: userId });
//         console.log('Expenses and salary deleted for user', userId);
//     } catch (error) {
//         console.error('Error deleting expenses and salary:', error);
//     }
// });
