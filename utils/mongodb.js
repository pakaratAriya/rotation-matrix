const mongo = require('mongodb').MongoClient
const url = process.env.MONGODB_URL
let collections = {}
mongo.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err, client)=>{
    if(err){
        console.error(err) 
        return
    }
    let db = client.db('rotationMatrixGame')
    collections.players = db.collection('players')
})

module.exports = collections
