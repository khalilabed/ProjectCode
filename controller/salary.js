const salaryModel = require('../models/Salary')
const expenseModel = require('../models/Expense')
// Create 
exports.create = async (req, res) => {
    if (!req.body.monthly_salary) {
        res.status(400).send({ message: "Content can not be empty!" });
    }

    const salary = new salaryModel({
        monthly_salary: req.body.monthly_salary,
    });

    await salary.save().then(data => {
        res.send({
            message: "Salary created successfully!!",
            salary: data
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating salary"
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



        // Construct response object
        const response = {
            expenses,
            totalExpense: totalExpense.toString().trim(),
            totalSalary: monthlyAverageAccount.toString().trim(),
            remainingBalance: remainingBalance.toString(),
            spentBalance: spentBalance.toString(),
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};