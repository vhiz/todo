const Express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const app = Express()
const helmet = require('helmet')

app.use(Express.json())

app.use(cookieParser())
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', true)
    next()
})

app.use(helmet())
app.use(cors(
    {
        origin: "http://localhost:3000"
    }
))

const authRoute = require('./routes/auth')
const todoRoute = require('./routes/todo')

app.use('/api/users', authRoute)
app.use('/api/todos', todoRoute)
const Port = process.env.PORT || 3002

app.listen(Port, () => {
    console.log(`Working on Port ${Port}`)
})