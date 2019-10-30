const express = require('express')
const app = express();
const dotenv = require('dotenv')
dotenv.config()
const path = require('path')
const mongo = require('mongodb').MongoClient
const url = process.env.MONGODB_URL
const expressHbs = require('express-handlebars')
const global_string = require('./public/js/constant')
app.engine(
    'hbs',
    expressHbs({
        layoutsDir: 'views/layouts/',
        defaultLayout: 'main-layout',
        extname: 'hbs'
    })
)
app.set('view engine','hbs')
app.set('views','views')


const rotationMatrixRoutes = require('./routes/manager')

app.use(express.static(path.join(__dirname,'public')))

app.use(rotationMatrixRoutes)

app.listen(process.env.PORT,process.env.IP,()=>{
    console.log("Server started")
})