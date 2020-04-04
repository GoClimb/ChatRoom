let userModel = require('../model/userModel')

exports.login = async (req,res)=>{
    let {username,password} = req.body
    let user = await userModel.findOne({username})
    if(!user){
        user = await userModel.create({ username,password })
    }
    if(user.comparePassword(password)){
        req.session.auth = {
            id:user._id,
            username:user.username
        }
        let redirect = req.session.redirect || '/'
        res.redirect(redirect)
    }else{
        throw new Error('用户名或密码不正确')
    }
}