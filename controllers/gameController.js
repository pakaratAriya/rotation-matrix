const global_string = require('../public/js/constant')
const gameModel = require('../model/gameModel')

exports.getAllScore = (req,res,next) => {
    res.send(gameModel.getAllPlayers())
}

exports.startPuzzle = (req,res,next) => {
    res.render('gamePlay',{gamePlay: true})
}

exports.startGame = (req,res,next) => {
    gameModel.getAllPlayers().then((data)=>{
        data.toArray((err,arr)=>{
            arr = arr.slice(0,5)
            res.render('startPage',{...global_string,startPage: true,players: arr})
        })
        
    })
    
}

exports.saveScore = (req,res,next) => {
    console.log(req.body)
    gameModel.saveScore(Number(req.body.score))
    gameModel.saveLevel(Number(req.body.level))
    res.sendStatus(200)
}

exports.savePlayer = (req,res,next) => {
    gameModel.savePlayer(req.body).then((data)=>{
        gameModel.saveScore(0)
        gameModel.saveLevel(1)
        res.redirect('/')
    })
}

exports.summaryPage = (req,res,next) => {
    gameModel.getAllPlayers().then((data)=>{
        data.toArray((err,arr)=>{
            let i = 0
            for(; i < arr.length; i++){
                if(arr[i].score <= gameModel.getScore())
                    if(arr[i].score == gameModel.getScore()){
                        if(arr[i].level <= gameModel.getLevel()){
                            break;
                        }
                    }else{
                        break;
                    }       
            }
            res.render('summaryPage',{...global_string,score:gameModel.getScore(),
                 level:gameModel.getLevel(),startPage:true, currentRank: (i+1)})        
        })
    })
    
}
