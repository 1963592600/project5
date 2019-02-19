
// 食物
(function (){

    var element = [];

    function Food(x, y, width, height, color){

        this.x = x || 0;
        this.y = y || 0;
        this.width = width || 20;
        this.height = height || 20;
        this.color = color || "green";

    }

    Food.prototype.init = function (map){
        
        remove();

        var div = document.createElement("div");
        map.appendChild(div);
        div.style.width = this.width + "px";
        div.style.height = this.height + "px";
        div.style.backgroundColor = this.color;
        div.style.position = "absolute";
        this.x = parseInt(Math.random() * (map.offsetWidth / this.width)) * this.width;
        this.y = parseInt(Math.random() * (map.offsetHeight / this.height)) * this.height;
        div.style.left = this.x + "px";
        div.style.top = this.y + "px";

        element.push(div);
    };

    function remove(){
        for(var i = 0; i < element.length; i++){
            var ele = element[i];
            ele.parentNode.removeChild(ele);
            element.splice(i, 1);
        }
    }

    window.Food = Food;
    
}());

// 小蛇
(function(){

    var element = [];

    function Snake(width, height, direction){

        this.width = width || 20;
        this.height = height || 20;

        this.body = [
            {x: 3, y: 2, color: "red"},
            {x: 2, y: 2, color: "orange"},
            {x: 1, y: 2, color: "orange"},
        ];

        this.direction = direction || "right";
    };

    Snake.prototype.init = function (map){

        remove();
   
        for(var i = 0; i < this.body.length; i++){

            var obj = this.body[i];
            var div = document.createElement("div");
            map.appendChild(div);

            div.style.position = "absolute";
            div.style.width = this.width + "px";
            div.style.height = this.height + "px";

            div.style.left = obj.x * this.width + "px";
            div.style.top = obj.y * this.height + "px";

            div.style.backgroundColor = obj.color;



            element.push(div);

        }
    };

    Snake.prototype.move = function (food, map){

        var i = this.body.length - 1;

        for(; i > 0; i--){

            this.body[i].x = this.body[i - 1].x;
            this.body[i].y = this.body[i - 1].y;
        };

        switch (this.direction){

            case "right":
            this.body[0].x += 1;
            break;

            case "left":
            this.body[0].x -= 1;
            break;

            case "top":
            this.body[0].y -= 1;
            break;

            case "bottom":
            this.body[0].y += 1;
            break;
        };

        var headX = this.body[0].x * this.width;
        var headY = this.body[0].y * this.height;

        if(headX == food.x && headY == food.y){

            var last = this.body[this.body.length - 1];
            this.body.push({
                x: last.x,
                y: last.y,
                color: last.color
            });

            food.init(map);

        }

    };

    function remove(){
        var i = element.length - 1;
        for (; i >= 0; i--){
            var ele = element[i];
            ele.parentNode.removeChild(ele);
            element.splice(i, 1);
        }
    }

    window.Snake = Snake;
}());

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