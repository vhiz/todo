const { getTodo, addTodo, deleteTodo } = require('../controllers/todo')

const router = require('express').Router()

router.get('/:id', getTodo)

router.post('/:id', addTodo)

router.delete('/:id', deleteTodo)

module.exports = router