const express = require('express')
const router = express.Router()
const db = require('../db')
const utils = require('../utils')
const crypto = require('crypto-js') // for encoding password
const jwt = require('jsonwebtoken')
const config = require('../config')


router.post('/signup',(request , response)=>{
     const{ firstName, lastName, password, email}= request.body

     const encryptedPassword = String(crypto.SHA256(password))

     const statement = `insert into user(firstName, lastName, email, password) values(?,?,?,?)`

     db.pool.query(statement , [firstName, lastName, email, encryptedPassword],(error , result) => {
        if(error) {
            response.send(utils.createErrorResponse(error))
        } else{
            response.send(utils.createSuccessResponse(result))
        }
     })
})

//This is without JSON-WEB-TOKEN
// router.post('/signin',(request , response)=>{
//     const{ email, password}= request.body

//     const encryptedPassword = String(crypto.SHA256(password))

//     const statement = `select id , firstName, lastName from user where email= ? and password = ?  `

//     db.pool.query(statement , [email ,encryptedPassword],(error,users)=>{
//         if(error){
//             response.send(utils.createErrorResponse(error))
//         } else{
//             //check if user exist
//             if(users.length > 0){
//                 const user = users[0]
//                 response.send(utils.createSuccessResponse(user))
//             } else{
//                 response.send(utils.createErrorResponse('User does not exist or check user Name or Password'))
//             }
//         }
//     })

// })

//with JSON-TOKEN
router.post('/signin',(request , response)=>{
    const{ email, password}= request.body
    const encryptedPassword = String(crypto.SHA256(password))

    const statement = `select id , firstName, lastName from user where email= ? and password = ?  `

    db.pool.query(statement , [email ,encryptedPassword],(error,users)=>{
        if(error){
            response.send(utils.createErrorResponse(error))
        } else{
            //check if user exist
            if(users.length > 0){
                const user = users[0]

                //paylod => information  that we wnt to post inside token
                const payload = {
                    id : user['id'],
                    name : `${user['firstName']} ${user['lastName']}`
                }

                //create token 
                const token = jwt.sign(payload ,config.secret )
                response.send(utils.createSuccessResponse({
                    token,
                    name : `${user['firstName']} ${user['lastName']}`,
                }))
            } else{
                response.send(utils.createErrorResponse('User does not exist or check user Name or Password'))
            }
        }
    })

})

module.exports = router