$(function () {
    var $message = $('.message');

    var socket = io();

    function changeMessage(data) {
        $message.fadeOut(2000).fadeIn(2000);

        setTimeout(
            function()
            {
                $message.text(data.message);
                }, 2000);
    }

    socket.on('new message', function (data) {
        console.log("new message");
        changeMessage(data);
    });

});