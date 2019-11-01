const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()
const controller = require('../controllers/gameController')
router.use(bodyParser.urlencoded({extended: false}))
router.use(bodyParser.json())

// ===================== set the route for the index.js =======================
router.get("/",controller.startGame)
router.get('/gamePlay',controller.startPuzzle)
router.get('/summaryPage',controller.summaryPage)
router.post('/saveScore', controller.saveScore)
router.post('/recordScore', controller.savePlayer)
module.exports = router