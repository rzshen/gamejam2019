
    var config = {
        type: Phaser.AUTO,
        width: 656,
        height: 656,
        parent: 'gamecanvas',
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 0},
                debug: false
            }
        },
        scene: {
            preload: preload,
            create: create,
            update: update
        }
    };

    var game = new Phaser.Game(config);
    var cellSize = 41;
    var numberOfColumns = 16;
    var numberOfRows = 16;
    var gridPosX = 0;   // this number is center of 1st cell
    var gridPosY = 0;   // center of 1st cell
    var scoreText;
    var score = 0;
    var isMoving = false;
    var red = 0xcb0626;
    var green = 0x4a911b;
    var blue = 0x0299f1;
    var yellow = 0xc70ade; // is now purple
    var bullRed;
    var bullBlue;
    var bullGreen;
    var bullYellow;
    var goal;
    var goalColor;
    var goalPoints = [];
    var level;
    var moveList = [];
    var particles;
    var emitter;
    var numberOfMoves = 0;
    var resetButton;

    function preload ()
    {
        this.load.setBaseURL('assets/');

        this.load.image('star', 'star.png' );
        this.load.image('tiles', 'tiles.png');
        this.load.image('reset', 'reset.png');
        this.load.image('bull', 'bullWhite.png');
        this.load.image('dust', 'dust.png');
        this.load.image('red', 'red.png');
    }

    function create ()
    {
        // Draw Map

        level = [
        [ 8, 7, 7, 6, 8, 7, 7, 7, 7, 7, 7, 6, 8, 7, 7, 6 ],//1
        [ 5, 4, 4, 4, 4, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 3 ],//2
        [ 5, 4, 4, 4, 4, 6, 5, 4, 4, 4, 4, 0, 5, 1, 4, 3 ],//3
        [ 5, 4, 1, 4, 4, 4, 4, 4, 4, 4, 4, 7, 4, 6, 5, 3 ],//4
        [ 2, 4, 6, 5, 4, 4, 4, 4, 4, 3, 2, 4, 1, 4, 4, 3 ],//5
        [ 8, 1, 4, 4, 4, 4, 3, 2, 4, 4, 7, 3, 8, 4, 4, 0 ],//6
        [ 10,8, 4, 4, 4, 4, 4, 11,1, 4, 4, 4, 4, 4, 4, 6 ],//7
        [ 5, 4, 4, 4, 4, 4, 3, 9, 9, 5, 4, 4, 4, 4, 4, 3 ],//8
        [ 5, 4, 4, 4, 4, 4, 3, 9, 9, 5, 4, 4, 0, 5, 4, 3 ],//9
        [ 5, 4, 4, 3, 2, 4, 1, 7, 7, 4, 4, 4, 7, 4, 4, 0 ],//10
        [ 2, 4, 4, 4, 7, 3, 8, 4, 4, 4, 4, 4, 4, 4, 4, 6 ],//11
        [ 8, 4, 4, 4, 4, 4, 4, 1, 4, 1, 4, 4, 4, 4, 4, 3 ],//12
        [ 5, 1, 4, 4, 4, 4, 4, 6, 10,8, 4, 4, 4, 4, 4, 3 ],//13
        [ 5, 6, 5, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 3, 2, 3 ],//14
        [ 5, 4, 4, 0, 5, 4, 4, 4, 4, 4, 4, 0, 5, 4, 7, 3 ],//15
        [ 2, 1, 1, 11,0, 2, 1, 1, 1, 1, 1, 11,1, 0, 2, 0 ]//16
    ]; 
        var grid = this.make.tilemap({ tileWidth: cellSize, tileHeight: cellSize, data: level });
        var tiles = grid.addTilesetImage('tiles', null, cellSize, cellSize);
        var layer = grid.createStaticLayer(0, tiles, gridPosX, gridPosY);
        
        // find all possible locations for goal
        for (var i = 1 ; i < 15 ; i++) {
            for (var j = 1 ; j < 15 ; j++) {
                if (level[i][j] == 0 || level[i][j] == 2 || level[i][j] == 6 || level[i][j] == 8 )
                    goalPoints.push([i,j]);
            }
        }

        console.log(goalPoints);

        particles = this.add.particles('dust');

        emitter = particles.createEmitter({
            lifespan: 500,
            speed: { min: 50, max: 75 },
            scale: { start: 0.3, end: 0 },
            //blendMode: 'ADD'
        });

        // spawn goal
        //spawnRandomGoal();
        goalColor = getRandomColor();
        var randomGoalPosition = Phaser.Math.Between(0, goalPoints.length);
        var goalX = goalPoints[randomGoalPosition][1];
        var goalY = goalPoints[randomGoalPosition][0];
        goal = this.add.sprite(goalX*cellSize + cellSize/2, goalY*cellSize + cellSize/2,'star').setTint(goalColor);

        // dust particles
       


        // spawn bulls
        var bullX = 4;
        var bullY = 13;
        bullRed = this.physics.add.sprite(cellSize/2 + cellSize*bullX + gridPosX, cellSize/2 + cellSize*bullY + gridPosY, 'bull').setTint(red).setInteractive();
        bullX = 10;
        bullY = 6;
        bullBlue = this.physics.add.sprite(cellSize/2 + cellSize*bullX + gridPosX, cellSize/2 + cellSize*bullY + gridPosY, 'bull').setTint(blue).setInteractive();
        bullX = 1;
        bullY = 9;
        bullGreen = this.physics.add.sprite(cellSize/2 + cellSize*bullX + gridPosX, cellSize/2 + cellSize*bullY + gridPosY, 'bull').setTint(green).setInteractive();
        bullX = 14;
        bullY = 10;
        bullYellow = this.physics.add.sprite(cellSize/2 + cellSize*bullX + gridPosX, cellSize/2 + cellSize*bullY + gridPosY, 'bull').setTint(yellow).setInteractive();
        selectBullRed();
        
        bullRed.on('pointerdown', function() {
            selectBullRed();
        });
        bullGreen.on('pointerdown', function() {
            selectBullGreen();
        });
        bullBlue.on('pointerdown', function() {
            selectBullBlue();
        });
        bullYellow.on('pointerdown', function() {
            selectBullYellow();
        });

        resetButton = this.add.image(656/2,656/2,'reset').setInteractive();
        resetButton.on('pointerdown', function() {
            resetBoard();
        });

        // debug text

        scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });

        // Inputs



      /*this.tweens.add({
                    targets: player,
                    y: {
                        value: 100, 
                        duration: 1000
                    }
                });*/


        this.input.keyboard.on('keydown_W', function (event) {
            if (isMoving == false)
            {
                //isMoving = true;
                //player.setVelocityY(-800);
                //player.setVelocityX(0);

                var tile = layer.getTileAtWorldXY(player.x, player.y, true);
                var newY = player.y;
                var isOc = isOccupied(player.x, newY - cellSize);
                while (tile.index != 6 && tile.index != 7 && tile.index != 8)
                {   
                    if(!isOc) 
                    {
                        newY = newY - cellSize;  
                        tile = layer.getTileAtWorldXY(player.x, newY, true);
                        isOc = isOccupied(player.x, newY - cellSize);
                    }
                    else
                        break; //exit while
                }
                if (player.y != newY)
                {
                    incrementNumberOfMoves();
                    moveList.push({ color: getPlayerColorString(), direction: 'up'});
                    player.y = newY;
                }

                //tween(player.x, newY);

            }
        });
        this.input.keyboard.on('keydown_S', function (event) {
            if (isMoving == false)
            {
                //isMoving = true;  
                //player.setVelocityY(800);
                //player.setVelocityX(0);

                var tile = layer.getTileAtWorldXY(player.x, player.y, true);
                var newY = player.y;
                var isOc = isOccupied(player.x, newY + cellSize);
                while (tile.index != 0 && tile.index != 1 && tile.index != 2)
                {
                    if(!isOc) 
                    {
                        newY = newY + cellSize;  
                        tile = layer.getTileAtWorldXY(player.x, newY, true);
                        isOc = isOccupied(player.x, newY + cellSize);
                    }
                    else
                        break; //exit while
                }
                if (player.y != newY)
                {
                    incrementNumberOfMoves();
                    moveList.push({ color: getPlayerColorString(), direction: 'down'});
                    player.y = newY;
                }
            }
        });
        this.input.keyboard.on('keydown_A', function (event) {
            if (isMoving == false)
            {
                //isMoving = true;
                //player.setVelocityX(-800);
                //player.setVelocityY(0);

                var tile = layer.getTileAtWorldXY(player.x, player.y, true);
                var newX = player.x;
                var isOc = isOccupied(newX - cellSize, player.y);
                while (tile.index != 2 && tile.index != 5 && tile.index != 8)
                {
                    if(!isOc) 
                    {
                        newX = newX - cellSize;  
                        tile = layer.getTileAtWorldXY(newX, player.y, true);
                        isOc = isOccupied(newX - cellSize, player.y);
                    }
                    else
                        break; //exit while
                }
                if (player.x != newX)
                {
                    incrementNumberOfMoves();
                    moveList.push({ color: getPlayerColorString(), direction: 'left'});
                    player.x = newX;
                }
            }
        });
        this.input.keyboard.on('keydown_D', function (event) {
            if (isMoving == false)
            {
                //isMoving = true;
                //player.setVelocityX(800);
                //player.setVelocityY(0);

                var tile = layer.getTileAtWorldXY(player.x, player.y, true);
                var newX = player.x;
                var isOc = isOccupied(newX + cellSize, player.y);
                while (tile.index != 0 && tile.index != 3 && tile.index != 6)
                {
                    if(!isOc) 
                    {
                        newX = newX + cellSize;  
                        tile = layer.getTileAtWorldXY(newX, player.y, true);
                        isOc = isOccupied(newX + cellSize, player.y);
                    }
                    else
                        break; //exit while
                }
                if (player.x != newX)
                {
                    incrementNumberOfMoves();
                    moveList.push({ color: getPlayerColorString(), direction: 'right'});
                    player.x = newX;
                }
            }
        });

        this.input.keyboard.on('keydown_Z', function (event) {
            selectBullRed();
        });
        this.input.keyboard.on('keydown_X', function (event) {
            selectBullBlue();
        });
        this.input.keyboard.on('keydown_C', function (event) {
            selectBullGreen();
        });
        this.input.keyboard.on('keydown_V', function (event) {
            selectBullYellow();
        });


        

    }



    function checkWin ()
    {
        var goalX = Math.floor(goal.x/cellSize);
        var goalY = Math.floor(goal.y/cellSize);
        // move goal and color

        var col;
        col = getPlayerColor();
        var bull;
        if (col == red)
            bull = bullRed;
        else if (col == green)
            bull = bullGreen;
        else if (col == blue)
            bull = bullBlue;
        else
            bull = bullYellow;

        if (goalColor == col)
        {
            if (Math.floor(bull.x/cellSize) == goalX  && Math.floor(bull.y/cellSize) == goalY)
            {
                goalAchieved();
            }
        }
    }

    function goalAchieved()
    {
        // create json
        var solve = new Object();
        solve.moves = moveList;
        solve.user = { name: 'hazel', active: true };
        solve.boardID = 1;
        var d = new Date();
        var n = d.getTime();
        solve.timestamp = n;

        var json = new Object();
        json.solve = solve;

        var jsonString = JSON.stringify(json);

        // send this somewhere

        moveList = [];
        numberOfMoves = 0;
        document.getElementById("bar").innerHTML = numberOfMoves;

        console.log(JSON.parse(jsonString));
        spawnRandomGoal ();
    }


    function isOccupied(x, y) 
    {
        x = x/cellSize;
        x = Math.floor(x);
        y = y/cellSize;
        y = Math.floor(y);
        var bullExists;
        if ( x == Math.floor(bullRed.x/cellSize) && y == Math.floor(bullRed.y/cellSize))
            bullExists = true;
        else if  ( x == Math.floor(bullBlue.x/cellSize) && y == Math.floor(bullBlue.y/cellSize))
            bullExists = true;
        else if  ( x == Math.floor(bullGreen.x/cellSize) && y == Math.floor(bullGreen.y/cellSize))
            bullExists = true;
        else if  ( x == Math.floor(bullYellow.x/cellSize) && y == Math.floor(bullYellow.y/cellSize))
            bullExists = true;
        else
            bullExists = false;

        return bullExists;
    }

    function getRandomColor ()
    {
        var color;
        var num = Phaser.Math.Between(1, 4);
        if ( num == 1 )
            color = red;
        else if ( num == 2 )
            color = green;
        else if ( num == 3 )
            color = blue;
        else
            color = yellow;
        return color;
    }

    function spawnRandomGoal ()
    {
        goalColor = getRandomColor();
        var randomGoalPosition = Phaser.Math.Between(0, goalPoints.length);
        goal.x = goalPoints[randomGoalPosition][1] * cellSize + cellSize/2;
        goal.y = goalPoints[randomGoalPosition][0] * cellSize + cellSize/2;
        goal.setTint(goalColor);
        score += 1;
        //scoreText.setText('Score: ' + score);
    }

    function getPlayerColor ()
    {
        if (player == bullRed)
            return red;
        else if (player == bullGreen)
            return green;
        else if (player == bullBlue)
            return blue;
        else
            return yellow;
    }

    function getPlayerColorString()
    {
        if (player == bullRed)
            return "red";
        else if (player == bullGreen)
            return "green";
        else if (player == bullBlue)
            return "blue";
        else
            return "yellow";
    }

    function selectBullRed()
    {
        player = bullRed;
        emitter.startFollow(bullRed);
    }

    function selectBullGreen()
    {
        player = bullGreen;
        emitter.startFollow(bullGreen);
    }

    function selectBullBlue()
    {
        player = bullBlue;
        emitter.startFollow(bullBlue);
    }

    function selectBullYellow()
    {
        player = bullYellow;
        emitter.startFollow(bullYellow);
    }

    function incrementNumberOfMoves()
    {
        numberOfMoves++;
        scoreText.setText('Moves: ' + numberOfMoves);
        // send this to counter box
        document.getElementById("bar").innerHTML = numberOfMoves;
    }

    function resetBoard()
    {
        numberOfMoves = 0;
        document.getElementById("bar").innerHTML = numberOfMoves;
        moveList = [];
    }

    function update ()
    {   
        checkWin();
    }
