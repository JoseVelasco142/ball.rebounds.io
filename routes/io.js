
var io = require('socket.io')();
Ball = require("./Ball").Ball;


var ball = new Ball(-25,-25);  //CREA EL OBJECTO ball de la clase Ball
var MoveReceived = null;     //GUARDA EL ULTIMO MOVIMIENTO RECIBIDO

io.sockets.on('connection', function(socket){
    // Test comunicación
    socket.on('connection', function(socket){
        console.log('Hello Clients');
        console.log(bola.x);
    });

    //RECIBE QUE ALGUIEN SE HA CONECTADO
    socket.on('NewPlayer', function(clientID){
        console.log(clientID);
        io.emit("BallPosition", ball.getX(),ball.getY()); //LE EMITE LA POSICION ACTUAL DE LA BOLA CON EL EVENTO "BallPosition"

    });

    //RECIBE MOVIMIENTO
    socket.on("ClientsMove", function(motion){
        console.log("Recibido: " + motion);
        MoveReceived = motion; //ASIGNA A LA VARIABLE MoveReceived el ultimo movimiento enviado por alguien
    });

    //MOVIMIENTO
    setInterval(function(){

        if(MoveReceived != null) { //SI SE HA RECIBIDO ALGUN MOVIMIENTO


            /*(Si movimiento = "X")
                    (no esta en los limites)
                        {la mueve hacia ese sitio}
                    (Está en los limites)
                        {invierte la direccion}
                */


            if (MoveReceived == "UP") {if(ball.getY() >= -25){ball.setY(ball.getY() - 25);}else{MoveReceived = "DOWN"}}

            if (MoveReceived == "DOWN") {if(ball.getY() <= 3500){ ball.setY(ball.getY() + 25);}else{ MoveReceived = "UP"}}

            if (MoveReceived == "RIGHT") {if(ball.getX() <=  7300){ ball.setX(ball.getX() + 25);} else{ MoveReceived = "LEFT"}}

            if (MoveReceived == "LEFT") {if(ball.getX() >= -25){ball.setX(ball.getX() - 25);}else{MoveReceived = "RIGHT"}}

            io.emit("BallPosition", ball.getX(), ball.getY());  // EMITE LA POSICION ACTUAL DE LA BOLA
        }
    }, 25); //ACTUALIZA CADA 25ms

});

module.exports = io;