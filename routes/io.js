
var io = require('socket.io')();
Ball = require("./Ball").Ball;

ball = new Ball(0,0);




io.sockets.on('connection', function(socket){
    // Test comunicación
    socket.on('connection', function(socket){
        console.log('Hello Clients');
        console.log(bola.x);
    });

    socket.on('NewPlayer', function(clientID){
        console.log("NUEVO JUGADOR. LISTA ACTUALIZADA");
        console.log(clientID);
        console.log("Posicion de la bola para el nuevo jugador "+ ball.getX() +" - "+ ball.getY());
        io.emit("BallPosition", ball.getX(),ball.getY());

    });

    //MOVIMIENTO
    socket.on("ClientsMove", function(motion){
        if(motion == "KEYUP"){
            ball.setY(ball.getY() - 25);
        }
        else if(motion == "KEYDOWN"){
            ball.setY(ball.getY() + 25);
        }
        else if(motion == "KEYLEFT"){
            ball.setX(ball.getX() - 25);
        }
        else if(motion == "KEYRIGHT"){
            ball.setX(ball.getX() + 25);
        }
        io.emit("BallPosition", ball.getX(),ball.getY());

    });


    setInterval(function(){
        ball.setX(ball.getX() + 5);
        ball.setY(ball.getY() + 5);
        io.emit("BallPosition", ball.getX(),ball.getY());
    }, 50);

});

module.exports = io;