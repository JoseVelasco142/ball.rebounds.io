var Ball = function(startX, startY) {  //CONTRUCTOR
    var x = startX,
        y = startY;
    //GETTERS
    var getX = function() { return x;};
    var getY = function() { return y;};
    //SETTERS
    var setX = function(newX) {x = newX;};
    var setY = function(newY) {y = newY;};

    return {
        getX: getX,
        getY: getY,
        setX: setX,
        setY: setY
    };  //DEVUELVE LOS METODOS DISPONIBLES
};

exports.Ball = Ball;