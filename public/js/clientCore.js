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

            //NUEVO JUGADOR
            this.bola = this.createElement();
            this.bola.drawImage("bola");
            this.bola.scaleTo(0.15);
            socket.emit("NewPlayer", socket.id); //EMITE QUE SE HA CONECTADO

            //MOVIMIENTOS
            canvas.Input.keyDown(Input.Left, function() {
                console.log("aaa iz");
                socket.emit("ClientsMove", "LEFT");
            });
            canvas.Input.keyDown(Input.Right, function() {
                socket.emit("ClientsMove", "RIGHT");
            });
            canvas.Input.keyDown(Input.Up, function() {
                socket.emit("ClientsMove", "UP");
            });
            canvas.Input.keyDown(Input.Bottom, function() {
                socket.emit("ClientsMove", "DOWN");
            });

            socket.on("BallPosition", function(currentX, currentY){
                scene.bola.x = currentX;
                scene.bola.y= currentY;
                stage.append(scene.bola);
            });

        },

        render: function(stage){
            stage.refresh();
        }
    });
});