const { signin,signup, getDocCollection, getIndexData } = require('../controllers/userControllers')
const authenticated = require('../middleware/authenticated')

const router = require('express').Router()

router.post('/signup',signup)
router.post('/signin',signin)
router.get('/index',getIndexData)
router.get('/:id',authenticated,getDocCollection)

module.exports = router