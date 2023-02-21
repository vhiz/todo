const Express = require('express')
const { Login, Register } = require('../controllers/auth')
const router = Express.Router()

router.post('/register', Register)

router.post('/login', Login)


module.exports = router