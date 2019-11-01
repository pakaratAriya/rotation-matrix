// =========================== the game controller script ===============================
const global_string = require('../public/js/constant')
const gameModel = require('../model/gameModel')

// export function that get all the sorted players to the leader board
exports.getAllScore = (req,res,next) => {
    res.send(gameModel.getAllPlayers())
}

// export function that start the puzzle
exports.startPuzzle = (req,res,next) => {
    res.render('gamePlay',{gamePlay: true})
}

// export function that start the game
exports.startGame = (req,res,next) => {
    gameModel.getAllPlayers().then((data)=>{
        data.toArray((err,arr)=>{
            arr = arr.slice(0,5)
            res.render('startPage',{...global_string,startPage: true,players: arr})
        })
    })
}

// export function that save the player's score to the server
exports.saveScore = (req,res,next) => {
    gameModel.saveScore(Number(req.body.score))
    gameModel.saveLevel(Number(req.body.level))
    res.sendStatus(200)
}

// export the function that save the player to leaderboard
exports.savePlayer = (req,res,next) => {
    gameModel.savePlayer(req.body).then((data)=>{
        gameModel.saveScore(0)
        gameModel.saveLevel(1)
        res.redirect('/')
    })
}

// export the function that go to the summary page
exports.summaryPage = (req,res,next) => {
    gameModel.getAllPlayers().then((data)=>{
        data.toArray((err,arr)=>{
            let i = 0
            // get the current rank of the player
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
