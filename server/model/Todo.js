const { Schema, model } = require("mongoose");

const todoSchma = new Schema(
  {
    items: {
      type: String,
      required: true,
    },
    userid: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Todo = model("Todo", todoSchma);

module.exports = { Todo };
