require('dotenv').config()
const express = require('express')
const session = require('express-session')
let socketIo = require('socket.io')
require('express-async-errors')

const app = express()

//使用一系列中间件
app.use(express.json())
app.use(express.urlencoded({ extended:true }))
app.use(express.static('./public'))     //处理静态资源托管
app.use(session({
    secret:process.env.session_secret,
    resave:false,
    saveUninitialized:true
}))

//设置 后端渲染的模版引擎 和 模版引擎目录
app.set('view engine','ejs')
app.set('views','./view')


//统一路由处理
app.use('/',require('./route/indexRouter'))
app.use('/users',require('./route/userRouter'))
app.use((err,req,res,next)=>{           //统一错误处理
    console.log(err)
    res.status(500).send(err.message)
})

let server = app.listen(4000,()=>{
    console.log('服务启动成功...')
})

let Io = socketIo.listen(server)

Io.on('connection',socket=>{
    socket.on('setName',data=>{
        socket.username = data

        socket.emit('message',{
            username:'System',
            message:`欢迎${socket.username}进入直播间`
        })
        socket.broadcast.emit('message',{
            username:'System',
            message:`欢迎${socket.username}进入直播间`
        })
    })
    socket.on('message',data=>{
        socket.emit('message',{
            username:socket.username,
            message:data.message
        })
        socket.broadcast.emit('message',{
            username:socket.username,
            message:data.message
        })
    })
})