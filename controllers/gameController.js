const global_string = require('../public/js/constant')
const gameModel = require('../model/gameModel')
exports.getAllScore = (req,res,next) => {
    res.send(gameModel.getAllPlayers())

}

exports.startGame = (req,res,next)=>{
    res.render('startPage',{...global_string,startPage: true})
}