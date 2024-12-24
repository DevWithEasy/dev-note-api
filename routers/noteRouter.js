const { createNote, updateNoteTitle, deleteNote, getNote, getBookNotes, publishNote, getNoteSerachByKey, getNoteSerachBytext } = require('../controllers/noteControllers')
const authenticated = require('../middleware/authenticated')

const router = require('express').Router()

router.post('/create', authenticated, createNote)
router.get('/search_key', getNoteSerachByKey)
router.get('/search_text', getNoteSerachBytext)
router.get('/:id', authenticated, getNote)
router.put('/update/:id',authenticated, updateNoteTitle)
router.delete('/delete/:id',authenticated, deleteNote)
router.put('/publish/:id', authenticated, publishNote)

module.exports = router