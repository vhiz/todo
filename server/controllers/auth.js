const { genSaltSync, hashSync, compareSync } = require('bcryptjs')
const { sign } = require('jsonwebtoken')
const { db } = require('../connect')
require('dotenv/config')
const Register = (req, res) => {
    const q = "SELECT * FROM users WHERE username = ?"
    db.query(q, [req.body.username], (err, data) => {
        if (err) return res.status(404).send(err)

        if (data.length) return res.status(409).json('user already exist')

        const salt = genSaltSync(10)
        const hashed = hashSync(req.body.password, salt)

        const q = "INSERT INTO users (`username`, `password`) VALUE (?)"

        const values = [req.body.username, hashed]
        db.query(q, [values], (err, data) => {
            if (err) res.status(400).send(err)
            return res.status(201).json('User Created')
        })
    })



}


const Login = (req, res) => {
    const q = "SELECT * FROM users WHERE username = ?"
    db.query(q, [req.body.username], (err, data) => {
        if (err) res.status(400).send(err)

        if (data.length === 0) return res.status(404).send('User does not exist')

        const valid = compareSync(req.body.password, data[0].password)

        if (!valid) return res.status(401).send('Invalid Passowrd')
        const token = sign({ id: data[0].id }, process.env.KEY)
        res.cookie('acesstoken', token, {
            httpOnly: true
        })
        const { password, ...other } = data[0]
        return res.status(200).send(other)
    })
}

module.exports = { Register, Login }