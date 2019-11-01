const express = require('express')
const app = express();
const dotenv = require('dotenv')
dotenv.config()
const path = require('path')
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

// load the router
const rotationMatrixRoutes = require('./routes/manager')
// set where to load the file info
app.use(express.static(path.join(__dirname,'public')))
// use the imported router
app.use(rotationMatrixRoutes)

app.listen(port,()=>{
    console.log("Server started")
})