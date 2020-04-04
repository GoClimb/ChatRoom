const mongoose = require('mongoose')

let url = 'mongodb://localhost:27017/chatRoom'

mongoose.connect(url,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log('数据库连接成功...')

}).catch((err)=>{
    console.log('数据库连接失败...')
    console.log(err)
})

module.exports = mongoose