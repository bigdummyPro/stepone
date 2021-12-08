
let users = [];

const socketServer = (socket) => {
    // Connect - Disconnect
    socket.on('joinUser', user => {
        if(users.length === 0) users.push({id: user._id, socketId: socket.id, followers: user.followers})
        else{
            const findIndex = users.findIndex(item => item.id === user._id);
            if(findIndex === -1){
                users.push({id: user._id, socketId: socket.id, followers: user.followers})
            }
        }
        console.log('current: ', users)
    })

    socket.on('disconnect', () => {
        const data = users.find(user => user.socketId === socket.id)
        if(data){
            const clients = users.filter(user => 
                data.followers.find(item => item._id === user.id)
            )

            // if(clients.length > 0){
            //     clients.forEach(client => {
            //         socket.to(`${client.socketId}`).emit('CheckUserOffline', data.id)
            //     })
            // }

            // if(data.call){
            //     const callUser = users.find(user => user.id === data.call)
            //     if(callUser){
            //         users = EditData(users, callUser.id, null)
            //         socket.to(`${callUser.socketId}`).emit('callerDisconnect')
            //     }
            // }
        }

        users = users.filter(user => user.socketId !== socket.id)
    })

    // Follow
    socket.on('follow', newUser => {
        const user = users.find(user => user.id === newUser._id)
        user && socket.to(`${user.socketId}`).emit('followToClient', newUser)
    })

    socket.on('unFollow', newUser => {
        const user = users.find(user => user.id === newUser._id)
        user && socket.to(`${user.socketId}`).emit('unFollowToClient', newUser)
    })


    //Notification
    socket.on('createNotification', message => {
        const clients = users.filter(user => message.recipients.includes(user.id));
        
        clients.length > 0 && clients.forEach(client => {
            socket.to(`${client.socketId}`).emit('createNotificationToClient', message)
        });
    })

    socket.on('removeNotification', message => {console.log('uu')
        const clients = users.filter(user => message.recipients.includes(user.id));
        console.log(clients)
        clients.length > 0 && clients.forEach(client => {
            socket.to(`${client.socketId}`).emit('removeNotificationToClient', message)
        });

    })
    // Likes - Unlike
    socket.on('likePost', newPost => {
        const ids = [...newPost.user.followers, newPost.user._id]
        const clients = users.filter(user => ids.includes(user.id))

        if(clients.length > 0){
            clients.forEach(client => {
                socket.to(`${client.socketId}`).emit('likeToClient', newPost)
            })
        }
    })

    socket.on('unLikePost', newPost => {
        const ids = [...newPost.user.followers, newPost.user._id]
        const clients = users.filter(user => ids.includes(user.id))

        if(clients.length > 0){
            clients.forEach(client => {
                socket.to(`${client.socketId}`).emit('unLikeToClient', newPost)
            })
        }
    })
}

module.exports = socketServer;