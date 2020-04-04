$(function(){
    let socket = io('http://localhost:4000')
    socket.emit('setName','<%= username %>')
    
    socket.on('message',data=>{
        if(data.username == '<%= username %>'){
            $('#messages').append(`
                <div class="my-4 d-flex justify-content-end">
                    <div>${data.message}</div>
                </div>
            `)
        }else{
            $('#messages').append(`
            <div class="my-4 d-flex">
                <div class="mr-2"> <small class="text-black-50">${data.username}</small></div>
                <div>${data.message}</div>
            </div>
            `)
        }
    })
    $('#btn').click(function(){
        socket.emit('message',{
            username:'<%= username %>',
            message:`${$('#value').val()}`
        })
    })
})