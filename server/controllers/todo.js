const { verify } = require("jsonwebtoken");
const { db } = require("../connect");
const { Todo } = require("../model/Todo");
require("dotenv/config");

// const getTodo = async (req, res) => {

//     const token = req.cookies.acesstoken
//     if (!token) return res.status(401).json("Not logged in!");

//     verify(token, process.env.KEY, (err, userInfo) => {
//         if (err) return res.status(403).json("Token is not valid!");

//         const q = `SELECT * FROM todos WHERE userid = ?`

//         const values = [userInfo.id]
//         db.query(q, values, (err, data) => {
//             if (err) return res.status(500).json(err);
//             return res.status(200).json(data);
//         })
//     })
// }

const getTodo = async (req, res) => {
  try {
    const todos = await Todo.find({ userid: req.params.id });
    return res.status(200).json(todos);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

// const addTodo = async (req, res) => {
//   const token = req.cookies.acesstoken;
//   if (!token) return res.status(401).json("Not logged in!");

//   verify(token, process.env.KEY, (err, userInfo) => {
//     if (err) return res.status(403).json("Token is not valid!");

//     const q = "INSERT INTO todos (`items`, `userid`) VALUE (?)";

//     const values = [req.body.items, userInfo.id];

//     db.query(q, [values], (err, data) => {
//       if (err) return res.status(400).json(err);

//       return res.status(201).json("Item added.");
//     });
//   });
// };

const addTodo = async (req, res) => {
  try {
    await Todo.create({
      items: req.body.items,
      userid: req.params.id,
    });

    return res.sendStatus(201);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

// const deleteTodo = async (req, res) => {
//   const todoid = req.params.id;
//   const q = "DELETE FROM todos WHERE id = ?";
//   db.query(q, [todoid], (err, data) => {
//     if (err) return res.status(400).json(err);

//     return res.status(200).json("Item has been deleted sucessful.");
//   });
// };

const deleteTodo = async (req, res) => {
  try {
    const todoid = req.params.id;
    await Todo.findByIdAndDelete(todoid);

    return res.sendStatus(204);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = { getTodo, addTodo, deleteTodo };
