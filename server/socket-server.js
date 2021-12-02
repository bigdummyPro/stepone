
let users = [];

const socketServer = (socket) => {
    // Connect - Disconnect
    socket.on('joinUser', user => {
        users.push({id: user._id, socketId: socket.id, followers: user.followers})
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
}

module.exports = socketServer;