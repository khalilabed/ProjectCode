const express = require('express')
const bodyParser = require('body-parser')
const dbConfig = require('./config/db')
const mongoose = require('mongoose')
const cors = require('cors');
// const UserRoute = require('./routes/User')
const expenseRoute = require('./routes/expense')
const salaryRoute = require('./routes/salary')

const app = express();

app.use(bodyParser.urlencoded({
    extended:true
}))
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:8081', // مصدر المستخدم الذي يأتي منه الطلب
    credentials: true, // تمكين الاعتمادية
}))
app.use(bodyParser.json())
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url , {
    useNewUrlParser: true
}).then(() => {
    console.log("success")
}).catch(err => {
    console.log('not connect' , err)
    process.exit();
})



// app.use('/user',UserRoute)
app.use('/expense',expenseRoute)
app.use('/salary',salaryRoute)

app.get('/' , (req , res) =>{
    res.json("Hello")
})

app.listen(3000 , ()=> {
    console.log("Server is listening on port 3000");
})


