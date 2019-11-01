const express = require('express')
const app = express();
const dotenv = require('dotenv')
dotenv.config()
const path = require('path')
const mongo = require('mongodb').MongoClient
const url = process.env.MONGODB_URL
const expressHbs = require('express-handlebars')

const port = process.env.PORT || 3000
app.engine(
    'hbs',
    expressHbs({
        layoutsDir: 'views/layouts/',
        defaultLayout: 'main-layout',
        extname: 'hbs',
        helpers: {
            inc: i => (i+1)  
        }
    })
)
app.set('view engine','hbs')
app.set('views','views')


const rotationMatrixRoutes = require('./routes/manager')

app.use(express.static(path.join(__dirname,'public')))

app.use(rotationMatrixRoutes)

app.listen(port,()=>{
    console.log("Server started")
})