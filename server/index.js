const Express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = Express();
const helmet = require("helmet");
require("dotenv/config");
const { connect } = require("mongoose");

app.use(Express.json());

app.use(cookieParser());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

const db = async () => {
  try {
    connect(process.env.URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("connected to database");
  } catch (error) {
    console.log(error.message);
  }
};

app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS,
  })
);

const authRoute = require("./routes/auth");
const todoRoute = require("./routes/todo");

app.use("/api/users", authRoute);
app.use("/api/todos", todoRoute);
const Port = process.env.PORT || 3002;

app.listen(Port, () => {
  db();
  console.log(`Working on Port ${Port}`);
});
