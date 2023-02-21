const { getTodo, addTodo, deleteTodo } = require('../controllers/todo')

const router = require('express').Router()

router.get('/', getTodo)

router.post('/', addTodo)

router.delete('/:id', deleteTodo)

module.exports = router