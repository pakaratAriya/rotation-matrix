const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const router = express.Router()
const global_string = require('../public/js/constant')
const controller = require('../controllers/gameController')
router.use(bodyParser.urlencoded({extended: false}))
router.use(bodyParser.json())

router.get("/",controller.startGame)

router.get('/gamePlay',(req,res)=>{
    res.render('gamePlay',{gamePlay: true})
})

router.post('/saveScore', (req,res)=>{
    console.log(req.body)
})

module.exports = router