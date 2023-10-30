const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const config = require('./config')
const utils = require('./utils')

const app = express()

//apply middleware
app.use(cors('*'))

//morgan is used for understanding what is happening right now , combined => is format in which morgan is tries to display  what currently being accepted by your application and what this application returning back to client.
app.use(morgan('combined'))
app.use(express.json())

//add middleware to check token 
app.use((request, response , next)=>{
    if(request.url == '/user/signup' || request.url == '/user/signin'){
    next() // token is not required for signin and signup  
    } else {
        //check if the token is available 
        const token = request.headers['token']
        if(!token){
            response.send(utils.createErrorResponse('Missing Token'))
            return
        }

        try{
            // get the jwt token payload
            const payload = jwt.verify(token,config.secret)

            //add the user details to request
            request['userId'] = payload['id']
            request['userName'] = payload['name']

            //call the next api
            next()
        } catch(ex){
            response.send(utils.createErrorResponse('Invalid Token'))
        }
    }
})
//  adding require routes
const userRouter = require('./routes/user')
const noteRouter = require('./routes/note')

app.use('/user',userRouter)
app.use('/note',noteRouter)

app.listen(4000 , '0.0.0.0',()=>{
    console.log(`server started successfully on port no 4000`)
})

//by using nodemon server.js there is no need to restart server every time after any new  updation it will automatically update the changes 