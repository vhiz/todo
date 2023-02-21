const mysql = require('mysql')
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "vhiz1234",
    database: "todo"
})

module.exports = { db }