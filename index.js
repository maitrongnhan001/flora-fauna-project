require('dotenv').config()
const { connect } = require("./config/database");
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors');


const authRouter = require('./routes/auth')
const homeRouter = require('./routes/home')
const foodRouter = require('./routes/food')
const categoryRouter = require('./routes/category')
const orderRouter = require('./routes/order')
const userRouter = require('./routes/user')
const contactRouter = require('./routes/contact')

connect();
const app = express()

app.use(express.static('public'))
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(cors())

//localhost:3000 --> http://localhost:8000


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.json())



app.use('/api/users', userRouter)

app.use('/api/orders', orderRouter)

app.use('/api/categories', categoryRouter)

app.use('/api/foods', foodRouter)

app.use('/api/auth', authRouter)

app.use('/api/home', homeRouter)

app.use('/api/contact', contactRouter)


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

const PORT = process.env.APP_PORT || 8000

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})