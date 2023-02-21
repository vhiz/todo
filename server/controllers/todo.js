const { verify } = require("jsonwebtoken");
const { db } = require("../connect")
require('dotenv/config')

const getTodo = async (req, res) => {

    const token = req.cookies.acesstoken
    if (!token) return res.status(401).json("Not logged in!");

    verify(token, process.env.KEY, (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const q = `SELECT * FROM todos WHERE userid = ?`

        const values = [userInfo.id]
        db.query(q, values, (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
        })
    })
}

const addTodo = async (req, res) => {
    const token = req.cookies.acesstoken
    if (!token) return res.status(401).json("Not logged in!");

    verify(token, process.env.KEY, (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const q = "INSERT INTO todos (`items`, `userid`) VALUE (?)"

        const values = [req.body.items, userInfo.id]

        db.query(q, [values], (err, data) => {
            if (err) return res.status(400).json(err)

            return res.status(201).json("Item added.")
        })
    })
}

const deleteTodo = async (req, res) => {
    const todoid = req.params.id
    const q = "DELETE FROM todos WHERE id = ?"
    db.query(q, [todoid], (err, data) => {
        if (err) return res.status(400).json(err)

        return res.status(200).json("Item has been deleted sucessful.")
    })

}

module.exports = { getTodo, addTodo, deleteTodo }