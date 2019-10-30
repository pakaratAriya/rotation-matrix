const collections = require('../utils/mongodb')

function addNewScore(data){
    collections.insertOne(data,(err,result)=>{
        if(err){
            console.error(err)
        }else{
            console.log(result)
        }
    })
}

function getAllPlayers(){
    return "test"
    return collections.find();
}

function getPlayer(id){
    return collections.find({id})
}

function getHighestScore(){

}

module.exports = {
    add: addNewScore,
    getAll: getAllPlayers,
    get: getPlayer
}