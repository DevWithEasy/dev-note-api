const { createBook, updateBook, deleteBook, getBook, getAllBook } = require('../controllers/bookControllers')
const authenticated = require('../middleware/authenticated')

const router = require('express').Router()

router.post('/create',authenticated,createBook)
router.put('/',updateBook)
router.delete('/',deleteBook)
router.get('/',getBook)
router.post('/',getAllBook)

module.exports = router