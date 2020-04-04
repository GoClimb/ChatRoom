exports.index = (req,res)=>{
    res.render('index')
}

exports.chatroom = (req,res)=>{
    res.render('chatroom',{username:req.auth.username})
}

exports.posts = (req,res)=>{
    res.render('post/posts')
}

exports.login = (req,res)=>{
    res.render('login')
}