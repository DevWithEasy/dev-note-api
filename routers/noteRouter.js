const { createNote, updateNoteTitle, updateNoteDescription, updateNoteIcon, deleteNote, getNote } = require('../controllers/noteControllers')
const authenticated = require('../middleware/authenticated')

const router = require('express').Router()

router.post('/create', authenticated, createNote)
router.get('/:id', authenticated, getNote)
router.put('/', updateNoteTitle)
router.put('/', updateNoteDescription)
router.put('/create', updateNoteIcon)
router.delete('/', deleteNote)

module.exports = router