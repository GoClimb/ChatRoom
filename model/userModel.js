const mongoose = require('../config/db')
let bcryptjs = require('bcryptjs')

let schema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    // nickname:{
    //     type:String,
    //     default:'新手用户778'
    // },
    avatar:{
        type:String,
        default:`${process.env.BASEURL}assets/img/avatar.png`
    }
})

schema.pre('save',function(next){
    this.password = bcryptjs.hashSync(this.password,10)
    next()
})

schema.methods.comparePassword = function(password){
    return bcryptjs.compareSync(password,this.password)
}
module.exports = mongoose.model('user',schema)