const collections = require('../utils/mongodb')
let score = 0
let level = 1

// the function to get all the players in leaderboard in descending order
// return: 
//     Promise of find function
async function getAllPlayers(){
    return collections.players.find({}).sort({"score":-1})
}

// function to save the score on the server side
// parameters:
//     s: saving score
function saveScore(s){
    score=s
}

// function to get the score on the server side
// return:
//     score: saved score
function getScore(){
    return score
}

// function to save the level on the server side
// parameters:
//     lv: saving level
function saveLevel(lv){
    level = lv
}

// function to get the level on the server side
// return:
//     level: saved level
function getLevel(){
    return level
}

// function to save the player to the leaderboard (database)
// return:
//     score: Promise of insertOne function
async function savePlayer(playerObj){
    let jsonObj = {...playerObj, score:getScore(), level: getLevel()}
    return collections.players.insertOne(jsonObj)
}

module.exports = {
    getAllPlayers,
    saveScore,
    getScore,
    saveLevel,
    savePlayer,
    getLevel
}