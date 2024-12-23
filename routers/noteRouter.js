const { createNote, updateNoteTitle, deleteNote, getNote, getBookNotes } = require('../controllers/noteControllers')
const authenticated = require('../middleware/authenticated')

const router = require('express').Router()

router.post('/create', authenticated, createNote)
router.get('/:id', authenticated, getNote)
router.put('/update/:id',authenticated, updateNoteTitle)
router.delete('/delete/:id',authenticated, deleteNote)

module.exports = router