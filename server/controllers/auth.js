const { genSaltSync, hashSync, compareSync } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const { db } = require("../connect");
const { User } = require("../model/User");
require("dotenv/config");
// const Register = (req, res) => {
//     const q = "SELECT * FROM users WHERE username = ?"
//     db.query(q, [req.body.username], (err, data) => {
//         if (err) return res.status(404).send(err)

//         if (data.length) return res.status(409).json('user already exist')

//         const salt = genSaltSync(10)
//         const hashed = hashSync(req.body.password, salt)

//         const q = "INSERT INTO users (`username`, `password`) VALUE (?)"

//         const values = [req.body.username, hashed]
//         db.query(q, [values], (err, data) => {
//             if (err) res.status(400).send(err)
//             return res.status(201).json('User Created')
//         })
//     })

// }

const Register = async (req, res) => {
  try {
    const existingUser = await User.findOne({
      username: new RegExp(req.body.username, "i"),
    });
    if (existingUser) {
      return res.status(409).json("User already exists");
    }

    const salt = genSaltSync(10);
    const hashedPassword = hashSync(req.body.password, salt);

    await User.create({
      username: req.body.username,
      password: hashedPassword,
    });

    return res.status(201).json("User created");
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

// const Login = (req, res) => {
//   const q = "SELECT * FROM users WHERE username = ?";
//   db.query(q, [req.body.username], (err, data) => {
//     if (err) res.status(400).send(err);

//     if (data.length === 0) return res.status(404).send("User does not exist");

//     const valid = compareSync(req.body.password, data[0].password);

//     if (!valid) return res.status(401).send("Invalid Passowrd");
//     const token = sign({ id: data[0].id }, process.env.KEY);
//     res.cookie("acesstoken", token, {
//       httpOnly: true,
//     });
//     const { password, ...other } = data[0];
//     return res.status(200).send(other);
//   });
// };

const Login = async (req, res) => {
  try {
    const existingUser = await User.findOne({
      username: new RegExp(req.body.username, "i"),
    });
    if (!existingUser) {
      return res.status(404).json("User not found");
    }

    const validPassword = compareSync(req.body.password, existingUser.password);
    if (!validPassword) {
      return res.status(403).json("Invalid password");
    }

    const { password, ...otherUserDetails } = existingUser.toObject();
    return res.json(otherUserDetails);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = { Register, Login };
