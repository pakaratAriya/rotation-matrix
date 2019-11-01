const mongoClient = require('mongodb').MongoClient
const url = "mongodb+srv://game123:game123@matrixrotation-zovnx.azure.mongodb.net/test?retryWrites=true&w=majority"
let collections = {}
mongoClient.connect(url, {
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
