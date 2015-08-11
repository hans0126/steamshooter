define(function() {

    var stats;

    var deviation = [1, -1];

    function _init() {

        _createMeter(); //create fps test
        _createSpriteAnime(); // create sprite frame

        displayWidth = 750;
        displayHeight = 500;

        stage = new PIXI.Container();

        renderer = PIXI.autoDetectRenderer(displayWidth, displayHeight, {
            backgroundColor: 0x000000
        });

        document.getElementById("gameView").appendChild(renderer.view);

        playerLayer = new PIXI.Container();
        bulletLayer = new PIXI.Container();
        enemyLayer = new PIXI.Container();
        firesparkLayer = new PIXI.Container();
        enemyexplodeLayer = new PIXI.Container();

        bulletLayer.checkOutArea();
        bulletLayer.movement();
        enemyLayer.checkOutArea();
        enemyLayer.movement();
        playerLayer.movement();

        stage.addChild(playerLayer);
        stage.addChild(bulletLayer);
        stage.addChild(enemyLayer);
        stage.addChild(firesparkLayer);
        stage.addChild(enemyexplodeLayer);


        //bullet
        for (var i = 0; i < 50; i++) {
            var bullet = new PIXI.Sprite.fromFrame('bullet_big.png');
            bullet.pow = 2;
            bullet.id = i;
            bullet.actorInit();
            bulletLayer.addChild(bullet);

        }
        //firespark
        for (var i = 0; i < 20; i++) {
            var firespark = new PIXI.extras.MovieClip(spriteAnimeManager['firespark']);
            firespark.actorInit();
            firespark.animationSpeed = 0.3;
            firespark.loop = false;
            firespark.onComplete = function() {
                this.visible = false;
                this.gotoAndStop(0);
            }

            firesparkLayer.addChild(firespark);
        }
        // enemy explode
        for (var i = 0; i < 20; i++) {
            var explode = new PIXI.extras.MovieClip(spriteAnimeManager['explode']);
            explode.actorInit();
            explode.animationSpeed = 0.3;
            explode.loop = false;
            explode.onComplete = function() {
                this.visible = false;
                this.gotoAndStop(0);
            }

            enemyexplodeLayer.addChild(explode);
        }

        // enemy
        for (var i = 0; i < 50; i++) {
            var enemy = new PIXI.extras.MovieClip(spriteAnimeManager['enemy']);
            enemy.actorInit();
            enemy.animationSpeed = 0.2;
            enemy.life = 3;
            enemy.id = i;
            enemyLayer.addChild(enemy);
        }

        // deploy enemy

        /*  for (var i = 0; i < 3; i++) {
              for (var j = 0; j < 10; j++) {
                  var _e = enemyLayer.getUnusedSprite();
                  _e.x = _e.width * j + 10 * j;
                  _e.y = _e.height * i + 10 * i;
                  _e.play();

              }
          }*/

        for (var i = 0; i < 5; i++) {
            setTimeout(function() {
                var _e = enemyLayer.getUnusedSprite();
                _e.x = 40;
                _e.y = 0;
                _e.vy = 1;
                 _e.vx = 1;
                _e.play();
            }, 500*i);
        }




        var ship = new PIXI.extras.MovieClip(spriteAnimeManager['ship']);
        ship.loop = false;
        ship.fire = false;
        ship.actorInit();
        ship.state;
        ship.x = renderer.width / 2;
        ship.y = renderer.height / 2;
        ship.firingTimer = 0;
        ship.animationSpeed = 0.2;
        ship.visible = true;

        var left = keyboard(37),
            up = keyboard(38),
            right = keyboard(39),
            down = keyboard(40),
            fire = keyboard(32);


        left.press = function() {
            ship.setTextures = spriteAnimeManager['shipCenterToLeft'];
            ship.vx = -2;
        }

        left.release = function() {
            ship.setTextures = spriteAnimeManager['shipLeftToCenter'];
            ship.vx = 0;
        }

        right.press = function() {
            ship.setTextures = spriteAnimeManager['shipCenterToRight'];
            ship.vx = 2;
        }

        right.release = function() {
            ship.setTextures = spriteAnimeManager['shipRightToCenter'];
            ship.vx = 0;
        }

        up.press = function() {
            ship.vy = -2;
        }

        up.release = function() {
            ship.vy = 0;
        }

        down.press = function() {
            ship.vy = 2;
        }

        down.release = function() {
            ship.vy = 0;
        }


        fire.press = function() {
            ship.fire = true;
        }

        fire.release = function() {

            ship.fire = false;
        }

        playerLayer.addChild(ship);

        stage.interactive = true;

        // set the mousedown and touchstart callback..
        stage.mousedown = function(data) {



        }


        function _fire() {

            if (Date.now() > ship.firingTimer) {

                var _b = bulletLayer.getUnusedSprite();

                if (typeof(_b) != "undefined") {

                    _b.x = this.x + Math.floor(Math.random() * 10) * deviation[Math.floor(Math.random() * 2)];
                    _b.y = this.y + Math.floor(Math.random() * 10) * deviation[Math.floor(Math.random() * 2)] - 40;

                    _b.velocity(ship.x, 0, 7, false);

                    ship.firingTimer = Date.now() + 120;
                }
            }
        }

        function playing() {          

            if (ship.fire) {
                _fire.call(ship);
            }

            _overlap(enemyLayer, bulletLayer, _hitHandle);
            // _overlap(enemyLayer, playerLayer, _playerHitHandle);

        }

        gameAction = playing;

        //update        
        _update();

    }

    function _hitHandle(_enemy, _bullet) {

        if (Date.now() > _enemy.overlapTime) {
            var _firespark = firesparkLayer.getUnusedSprite();
            if (typeof(_firespark) != "undefined") {
                _firespark.x = _enemy.x + Math.floor(Math.random() * 16) * deviation[Math.floor(Math.random() * 2)];
                _firespark.y = _enemy.y + Math.floor(Math.random() * 16) * deviation[Math.floor(Math.random() * 2)];
                _firespark.play();
            }
            _enemy.beHit();
            _enemy.life -= _bullet.pow;
            _enemy.overlapTime = Date.now() + 200;

            if (_enemy.life <= 0) {
                var _enemyexplode = enemyexplodeLayer.getUnusedSprite();
                if (typeof(_enemyexplode) != "undefined") {
                    _enemyexplode.x = _enemy.x;
                    _enemyexplode.y = _enemy.y;
                    _enemy.remove();
                    _enemyexplode.play();
                }
            }
        }
        _bullet.hitTest = false;
        _bullet.remove();


        return;

    }

    function _playerHitHandle(_enemy, _player) {
        console.log(_player.getBounds());
        /* if (Date.now() > _player.overlapTime) { 
           
         } 
         _player.overlapTime = Date.now() + 200;*/
    }


    function _createMeter() {
        stats = new Stats();
        stats.setMode(0); // 0: fps, 1: ms
        // align top-left
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.right = '0px';
        stats.domElement.style.top = '0px';
        document.body.appendChild(stats.domElement);
    }

    function _update() {
        stats.begin();
        renderer.render(stage);
        gameAction();
        stats.end();
        requestAnimFrame(_update);
    }

    function _createSpriteAnime() {

        var _frames = [];

        for (var i = 1; i < 17; i++) {
            _frames.push(PIXI.Texture.fromFrame("smoke_" + i + ".png"));
        }

        spriteAnimeManager['smoke'] = _frames;

        var _frames = [];

        for (var i = 1; i < 6; i++) {
            _frames.push(PIXI.Texture.fromFrame("ship_" + i + ".png"));
        }

        spriteAnimeManager['ship'] = _getFrame(_frames, [2]);
        spriteAnimeManager['shipCenterToLeft'] = _getFrame(_frames, [2, 1, 0]);
        spriteAnimeManager['shipLeftToCenter'] = _getFrame(_frames, [0, 1, 2]);
        spriteAnimeManager['shipCenterToRight'] = _getFrame(_frames, [2, 3, 4]);
        spriteAnimeManager['shipRightToCenter'] = _getFrame(_frames, [4, 3, 2]);

        var _frames = [];

        for (var i = 1; i < 11; i++) {
            _frames.push(PIXI.Texture.fromFrame("firespark_" + i + ".png"));
        }

        spriteAnimeManager['firespark'] = _frames;

        var _frames = [];

        for (var i = 1; i < 5; i++) {
            _frames.push(PIXI.Texture.fromFrame("enemy_" + i + ".png"));
        }

        spriteAnimeManager['enemy'] = _frames;

        var _frames = [];

        for (var i = 1; i < 17; i++) {
            _frames.push(PIXI.Texture.fromFrame("explode_typa_a_" + i + ".png"));
        }

        spriteAnimeManager['explode'] = _frames;

    }

    /**
     * get frame from spriteAnimeManager
     * @param {array} _frames 
     * @param {array} _frames - select frames
     * 
     * @return {array}
     */

    function _getFrame(_frames, _frame) {
        var temp = [];
        for (var i = 0; i < _frame.length; i++) {
            temp.push(_frames[_frame[i]]);
        }

        return temp;
    }

    /**
     *
     *
     */

    function _overlap(_layer1, _layer2, _handler) {

        if (typeof(_handler) != "function") {
            return false;
        }

        _layer1 = _layer1.children;
        _layer2 = _layer2.children;

        for (var i = 0; i < _layer1.length; i++) {
            for (var j = 0; j < _layer2.length; j++) {

                if (_layer1[i].visible == true && _layer2[j].visible == true) {
                    if (hitTest(_layer1[i], _layer2[j])) {
                        _handler(_layer1[i], _layer2[j]);
                    }
                }
            }
        }

    }



    return {
        init: _init
    }




})
