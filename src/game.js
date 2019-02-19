
// 游戏
(function(){

    var that = null;

    function Game(map){
        this.food = new Food();
        this.snake = new Snake();
        this.map = map;
        that = this;
    };

    Game.prototype.init = function(){
        this.food.init(this.map);
        this.snake.init(this.map);

        this.run(this.food, this.map);

        this.key();
    };

    Game.prototype.run = function(food, map){

        var time = setInterval(function(){

            this.snake.move(food, map);
            this.snake.init(map);

            var maxX = map.offsetWidth / this.snake.width;
            var maxY = map.offsetHeight / this.snake.height;

            var headX = this.snake.body[0].x;
            var headY = this.snake.body[0].y;

            if(headX < 0 || headX >= maxX){
                clearInterval(time);
                alert("游戏结束");

            };

            if(headY < 0 || headY >= maxY){
                clearInterval(time);
                alert("游戏结束");

            };
            
        }.bind(that), 150);

    };

    Game.prototype.key = function(){
        document.addEventListener("keydown", function(e){
            switch (e.keyCode){
                case 37: this.snake.direction = "left";break;
                case 38: this.snake.direction = "top";break;
                case 39: this.snake.direction = "right";break;
                case 40: this.snake.direction = "bottom";break;
            }

        }.bind(that), false);

    };

    window.Game = Game;
}());

var gm = new Game(document.querySelector(".map"));
gm.init();