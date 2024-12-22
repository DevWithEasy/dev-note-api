const { createBook, updateBook, deleteBook, getBook, getAllBook } = require('../controllers/bookControllers')

const router = require('express').Router()

router.post('/',createBook)
router.put('/',updateBook)
router.delete('/',deleteBook)
router.get('/',getBook)
router.post('/',getAllBook)

module.exports = router