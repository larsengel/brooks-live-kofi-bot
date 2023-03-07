$(function () {
    let $message = $('.message');

    let socket = io();

    let messageList = [];

    socket.emit('cli_connected');

    function addMessage(msg) {
        messageList.push(msg)
    }

    socket.on('msg_received', function (msg) {
        addMessage(msg);
    });

    socket.on('msg_loaded', function(messages) {
        console.log('loaded')
        messageList = messages;

        let index = 0;

        setInterval(() => {
            let msg = messageList[index]
            $message.text(msg.content)
            index++;
            if (index === messages.length) {
                index = 0;
            }
        }, 5000);
    });
});