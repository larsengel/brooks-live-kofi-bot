$(function () {
    var $message = $('.message');

    var socket = io();

    function changeMessage(data) {
        $message.fadeIn("slow").delay(5000).fadeOut("slow")
        $message.text(data.message);
    }

    socket.on('new message', function (data) {
        console.log("new message");
        changeMessage(data);
    });

});