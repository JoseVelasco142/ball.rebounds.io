
var io = require('socket.io')();
Ball = require("./Ball").Ball;

ball = new Ball(15,15);

var MoveReceived = null;




io.sockets.on('connection', function(socket){
    // Test comunicación
    socket.on('connection', function(socket){
        console.log('Hello Clients');
        console.log(bola.x);
    });

    socket.on('NewPlayer', function(clientID){
        console.log("NUEVO JUGADOR. LISTA ACTUALIZADA");
        console.log(clientID);
        io.emit("BallPosition", ball.getX(),ball.getY());

    });

    //MOVIMIENTO
    socket.on("ClientsMove", function(motion){
        console.log("Recibido: " + motion);
        MoveReceived = motion;
    });


    setInterval(function(){

        if(MoveReceived != null) {

            if (MoveReceived == "UP") {if(ball.getY() >= 15){ball.setY(ball.getY() - 25);}else{MoveReceived = "DOWN"}}

            if (MoveReceived == "DOWN") {if(ball.getY() <= 3500){ ball.setY(ball.getY() + 25);}else{ MoveReceived = "UP"}}

            if (MoveReceived == "RIGHT") {if(ball.getX() <=  7300){ ball.setX(ball.getX() + 25);} else{ MoveReceived = "LEFT"}}

            if (MoveReceived == "LEFT") {if(ball.getX() >= 15){ball.setX(ball.getX() - 25);}else{MoveReceived = "RIGHT"}}

            io.emit("BallPosition", ball.getX(), ball.getY());
        }
    }, 25);

});

module.exports = io;