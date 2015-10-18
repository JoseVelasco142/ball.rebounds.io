$(document).ready(function() {


    var socket = io();
    // Test comunicación
    socket.on('connect', function(){
        console.log('Hello Server');
    });

    //CANVAS GAME
    var canvas = CE.defines("canvas").
        extend(Animation).
        extend(Input).
        extend(Hit).
        ready(function() {
            canvas.Scene.call("MyScene",{
            });

        });

    //DEFINICION DEL JUEGO
    canvas.Scene.New({

        //Nombre
        name: "MyScene", // Obligatory

        //Texturas
        materials: {
            images: {
                background: "/images/background.jpg",    //Stage
                bola: "/images/bola.gif"
            }
        },

        //METODOS
        ready: function(stage, params) {            //PREPARA LA INTERFAZ

            //STAGE
            this.dimensions = this.getCanvas();
            var scene = canvas.Scene.get("MyScene");

            //escenario
            this.background = this.createElement();
            this.background.drawImage("background");
            stage.append(this.background);


            //NUEVO JUGADOR(CREA UNA BOLA COMO ELEMNTO SIN AÑADIRLA)
            this.bola = this.createElement();
            this.bola.drawImage("bola");
            this.bola.scaleTo(0.15);
            socket.emit("NewPlayer", socket.id); //AVISA AL SERVER QUE SE HA CONECTADO Y LE ENVIA SU ID


            // RECIBE POSICION DE LA BOLA
            socket.on("BallPosition", function(currentX, currentY){
                scene.bola.x = currentX;  //LE ASIGNA LA X RECIBIDA AL OBJETO LOCAL
                scene.bola.y= currentY;   //LE ASIGNA LA Y RECIBIDA AL OBJETO LOCAL
                stage.append(scene.bola); //PINTA LA BOLA
            });


            //MOVIMIENTOS
            canvas.Input.keyDown(Input.Left, function() {
                socket.emit("ClientsMove", "LEFT");     //EMITE LEFT
            });
            canvas.Input.keyDown(Input.Right, function() {
                socket.emit("ClientsMove", "RIGHT");    //EMITE RIGHT
            });
            canvas.Input.keyDown(Input.Up, function() {
                socket.emit("ClientsMove", "UP");       //EMITE UP
            });
            canvas.Input.keyDown(Input.Bottom, function() {
                socket.emit("ClientsMove", "DOWN");     //EMITE DOWN
            });

        },

        render: function(stage){
            stage.refresh();
        }
    });
});