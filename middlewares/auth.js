module.exports = (req,res,next)=>{
    if(req.session.auth){
        req.auth = req.session.auth
        next()

    }else{
        req.session.redirect = req.url
        res.redirect('/login')
    }
}