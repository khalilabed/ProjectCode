const expenseModel = require('../models/Expense')
const salaryModel = require('../models/Salary')

// Create 
exports.create = async (req, res) => {
    if (!req.body.type && !req.body.amount && !req.body.createdAt && !req.body.comments) {
        res.status(400).send({ message: "Content can not be empty!" });
    }

    const expense = new expenseModel({
        type: req.body.type,
        amount: req.body.amount,
        createdAt: req.body.createdAt,
        comments: req.body.comments
    });

    await expense.save().then(data => {
        res.send({
            message: "User created successfully!!",
            expense: data
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating user"
        });
    });
};


exports.findAll = async (req, res) => {
    try {
        // Retrieve expenses
        const expenses = await expenseModel.find();

        // Calculate total expense
        const totalExpense = expenses.reduce((acc, expense) => acc + parseInt(expense.amount), 0);

        // Retrieve all salary
        const salary = await salaryModel.find();

        // Calculate monthly average account
        const monthlyAverageAccount = salary.reduce((acc, salary) => acc + parseInt(salary.monthly_salary), 0) / salary.length;

        // Calculate remaining balance
        const remainingBalance = monthlyAverageAccount - totalExpense;

        // Calculate spent balance
        const spentBalance = totalExpense;

        // Calculate percentage of monthly expense according to salary
        const expensePercentage = (totalExpense / monthlyAverageAccount) * 100;

        // Get types of expenses and their count
        const expenseTypes = expenses.reduce((acc, expense) => {
            acc[expense.type] = acc[expense.type] || { count: 0, total: 0, percentage: 0 };
            acc[expense.type].count += 1;
            acc[expense.type].total += parseInt(expense.amount);
            acc[expense.type].percentage = ((acc[expense.type].total / salary.reduce((acc, salary) => acc + parseInt(salary.monthly_salary), 0)) * 100).toFixed(2) + "%";
            return acc;
        }, {});

        // Construct response object
        const response = {
            expenses,
            totalExpense: totalExpense.toString().trim(),
            totalSalary: monthlyAverageAccount.toString().trim(),
            remainingBalance: remainingBalance.toString(),
            spentBalance: spentBalance.toString(),
            expensePercentage: expensePercentage.toFixed(2) + "%",
            expenseTypes,
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// exports.average = async (req, res) => {
//     try {
//         const expenses = await expenseModel.find();
//         const salary = await salaryModel.find();
//         const expenseTypes = expenses.reduce((acc, expense) => {
//             acc[expense.type] = acc[expense.type] || { count: 0, total: 0, percentage: 0 };
//             acc[expense.type].count += 1;
//             acc[expense.type].total += parseInt(expense.amount);
//             acc[expense.type].percentage = ((acc[expense.type].total / salary.reduce((acc, salary) => acc + parseInt(salary.monthly_salary), 0)) * 100).toFixed(2) + "%";
//             return acc;
//         }, {});

//         const response = {
//             expenseTypes,
//         };

//         res.status(200).json(response);

//     } catch (error) {
//         res.status(404).json({ message: error.message });
//     }

// };


// Find a single with an id
exports.findOne = async (req, res) => {
    try {
        const expense = await expenseModel.findById(req.params.id);
        res.status(200).json(expense);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Update 
exports.update = async (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    await expenseModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
        if (!data) {
            res.status(404).send({
                message: `Expense not found.`
            });
        } else {
            res.send({ message: "Expense updated successfully." })
        }
    }).catch(err => {
        console.log(err.message);
        res.status(500).send({
            message: err.message
        });
    });
};

// Delete 
exports.destroy = async (req, res) => {
    await expenseModel.findByIdAndRemove(req.params.id).then(data => {
        if (!data) {
            res.status(404).send({
                message: `Expense not found.`
            });
        } else {
            res.send({
                message: "Expense deleted successfully!"
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};