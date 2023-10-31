const express = require('express')
const router = express.Router()
const db = require('../db')
const utils = require('../utils')

router.post('/insert',(request , response)=>{
    const {title , details} = request.body

    const statement = `insert into note (title , details ,userId) values(?,?,?)`

    db.pool.query(statement , [title , details , request['userId']] ,(error , result)=>{
        response.send(utils.createResponse(error,result))
    })

    // console.log(`User Name = ${request['userName']}`)
    // console.log(`User Id = ${request['userId']}`)
})

//show all notes
router.get('/show',(request , response)=>{
    const statement = `select note.id,concat(firstName ,' ', lastName) as name, title , details from user join note on
    user.id = note.userId ; `

    db.pool.query(statement ,(error , result)=>{
        response.send(utils.createResponse(error,result))
    })
})

//show notes by id
router.get('/showbyid/:id',(request , response)=>{
    const {id} = request.params
    const statement = `select * from note where Id = ?`

    db.pool.query(statement , [id] ,(error , result)=>{
        response.send(utils.createResponse(error,result))
    })
})

//update note by id
router.put('/update/:id',(request , response)=>{
    const {id} = request.params
    const {title , details} = request.body
    const statement = `update note set title = ? , details = ? where Id = ?`

    db.pool.query(statement , [title ,details, id] ,(error , result)=>{
        response.send(utils.createResponse(error,result))
    })
})

//delete note by id
router.delete('/delete/:id',(request , response)=>{
    const {id} = request.params
    console.log(" id "+id)
    const statement = `delete from note where Id = ?`

    db.pool.query(statement , [id] ,(error , result)=>{
        response.send(utils.createResponse(error,result))
    })
})

module.exports = router