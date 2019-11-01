const collections = require('../utils/mongodb')

let score = 0
let level = 1
function addNewScore(data){
    collections.insertOne(data,(err,result)=>{
        if(err){
            console.error(err)
        }else{
            console.log(result)
        }
    })
}

async function getAllPlayers(){
    return collections.players.find({}).sort({"score":-1})
}

function getPlayer(id){
    return collections.find({id})
}

function saveScore(s){
    score=s
}

function getScore(){
    return score
}

function saveLevel(lv){
    level = lv
}

function getLevel(){
    return level
}

async function savePlayer(playerObj){
    let jsonObj = {...playerObj, score:getScore(), level: getLevel()}
    return collections.players.insertOne(jsonObj)
}

module.exports = {
    add: addNewScore,
    getAllPlayers,
    get: getPlayer,
    saveScore,
    getScore,
    saveLevel,
    savePlayer,
    getLevel
}