define(function() {

    var stats;

    var deviation = [1, -1];

    var enemysOrder = [];

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
        smallbulletLayer = new PIXI.Container();
        enemyLayer = new PIXI.Container();

        firesparkLayer = new PIXI.Container();
        enemyexplodeLayer = new PIXI.Container();
        enemybulletLayer = new PIXI.Container();
        smokeLayer = new PIXI.Container();

        bulletLayer.checkOutArea();
        bulletLayer.movement();
        smallbulletLayer.checkOutArea();
        smallbulletLayer.movement();
        enemyLayer.checkOutArea();
        enemyLayer.movement();
        playerLayer.movement();
        enemybulletLayer.checkOutArea();
        enemybulletLayer.movement();

        stage.addChild(playerLayer);
        stage.addChild(bulletLayer);
        stage.addChild(smallbulletLayer);
        stage.addChild(enemyLayer);
        stage.addChild(firesparkLayer);
        stage.addChild(enemyexplodeLayer);
        stage.addChild(enemybulletLayer);
        stage.addChild(smokeLayer);


        //bullet
        for (var i = 0; i < 50; i++) {
            var bullet = new PIXI.Sprite.fromFrame('bullet_big.png');
            bullet.pow = 2;
            bullet.id = i;
            bullet.actorInit();
            bulletLayer.addChild(bullet);
        }

        //small bullet
        for (var i = 0; i < 50; i++) {
            var bullet = new PIXI.Sprite.fromFrame('bullet_small.png');
            bullet.pow = 1;
            bullet.id = i;
            bullet.actorInit();
            smallbulletLayer.addChild(bullet);
        }

        //enemy bullet
        for (var i = 0; i < 20; i++) {
            var enemybullet = new PIXI.Sprite.fromFrame('enemy-bullet.png');
            enemybullet.pow = 1;
            enemybullet.id = i;
            enemybullet.actorInit();
            enemybulletLayer.addChild(enemybullet);
        }

        //smoke
        for (var i = 0; i < 20; i++) {
            var smoke = new PIXI.extras.MovieClip(spriteAnimeManager['smoke']);
            smoke.actorInit();
            smoke.animationSpeed = 0.3;
            smoke.loop = false;
            smoke.onComplete = function() {
                this.visible = false;
                this.gotoAndStop(0);
            }
            smokeLayer.addChild(smoke);

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

        enemysOrder.push({
            delayTime: 200,
            enemyCount: 3,
            enemy: {
                x: 40,
                y: 0,
                vx: 1,
                vy: 1,
                sprite: enemyLayer,
                delay: 500
            },
            attack: {
                attackDelay: 500,
                attackCount: 2,
                bullet: enemybulletLayer
            }
        })


        enemysOrder.push({
            delayTime: 1600,
            enemyCount: 3,
            enemy: {
                x: 600,
                y: 0,
                vx: -1,
                vy: 1,
                sprite: enemyLayer,
                delay: 500
            },
            attack: {
                attackDelay: 500,
                attackCount: 2,
                bullet: enemybulletLayer
            }
        })


        enemysOrder.push({
            delayTime: 2000,
            enemyCount: 5,
            enemy: {
                x: 40,
                y: 0,
                vx: 1,
                vy: 1,
                sprite: enemyLayer,
                delay: 500
            },
            attack: {
                attackDelay: 500,
                attackCount: 2,
                bullet: enemybulletLayer
            }
        })

         enemysOrder.push({
            delayTime: 4000,
            enemyCount: 5,
            enemy: {
                x: 40,
                y: 0,
                vx: 1,
                vy: 1,
                sprite: enemyLayer,
                delay: 800
            },
            attack: {
                attackDelay: 500,
                attackCount: 1,
                bullet: enemybulletLayer
            }
        })


        _enemySchedule(enemysOrder);




        var ship = new PIXI.extras.MovieClip(spriteAnimeManager['ship']);
        ship.loop = false;
        ship.fire = false;
        ship.life = 2;
        ship.actorInit();
        ship.x = renderer.width / 2;
        ship.y = renderer.height / 2;
        ship.firingTimer = 0;
        ship.animationSpeed = 0.2;
        ship.visible = true;
        ship.shipType = "mothership";
        ship.speed = 3;
        ship.bullet = bulletLayer;

        currentControl = ship;

        playerLayer.addChild(ship);

        for (var i = 0; i < 2; i++) {
            var ship = new PIXI.Sprite.fromFrame('small_player.png');
            ship.fire = false;
            ship.actorInit();
            ship.firingTimer = 0;
            ship.visible = false;
            ship.shipType = "ship";
            ship.speed = 5;
            ship.life = 1;
            ship.bullet = smallbulletLayer;
            playerLayer.addChild(ship);
        }

        var left = keyboard(37),
            up = keyboard(38),
            right = keyboard(39),
            down = keyboard(40),
            fire = keyboard(32);


        left.press = function() {

            switch (currentControl.shipType) {
                case "mothership":
                    currentControl.setTextures = spriteAnimeManager['shipCenterToLeft'];
                    break;
            }

            currentControl.vx = currentControl.speed * -1;
        }

        left.release = function() {
            switch (currentControl.shipType) {
                case "mothership":
                    currentControl.setTextures = spriteAnimeManager['shipLeftToCenter'];
                    break;
            }
            currentControl.vx = 0;
        }

        right.press = function() {

            switch (currentControl.shipType) {
                case "mothership":
                    currentControl.setTextures = spriteAnimeManager['shipCenterToRight'];
                    break;
            }

            currentControl.vx = currentControl.speed;
        }

        right.release = function() {
            switch (currentControl.shipType) {
                case "mothership":
                    currentControl.setTextures = spriteAnimeManager['shipRightToCenter'];
                    break;
            }

            currentControl.vx = 0;
        }

        up.press = function() {
            currentControl.vy = currentControl.speed * -1;
        }

        up.release = function() {
            currentControl.vy = 0;
        }

        down.press = function() {
            currentControl.vy = currentControl.speed;
        }

        down.release = function() {
            currentControl.vy = 0;
        }


        fire.press = function() {
            currentControl.fire = true;
        }

        fire.release = function() {
            currentControl.fire = false;
        }

        stage.interactive = true;

        // set the mousedown and touchstart callback..
        stage.mousedown = function(data) {



        }

        function _fire() {

            if (Date.now() > this.firingTimer) {

                var _b = this.bullet.getUnusedSprite();

                if (typeof(_b) != "undefined") {

                    _b.x = this.x + Math.floor(Math.random() * 10) * deviation[Math.floor(Math.random() * 2)];
                    _b.y = this.y + Math.floor(Math.random() * 10) * deviation[Math.floor(Math.random() * 2)] - 40;

                    _b.velocity(this.x, 0, 7, false);

                    this.firingTimer = Date.now() + 120;
                }
            }
        }

        function playing() {

            if (currentControl.fire) {
                _fire.call(currentControl);
            }

            _overlap(enemyLayer, bulletLayer, _hitHandle);
            _overlap(enemyLayer, smallbulletLayer, _hitHandle);
            _overlap(enemybulletLayer, playerLayer, _playerHitHandle);

        }

        gameAction = playing;

        //update        
        _update();

    }

    function _hitHandle(_enemy, _bullet) {

        if (Date.now() > _enemy.overlapTime) {
            _enemy.damageEffect(firesparkLayer);
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

        _bullet.remove();


        return;

    }

    function _playerHitHandle(_bullet, _player) {

        if (Date.now() > _player.overlapTime) {
            _player.beHit();
            _player.life -= _bullet.pow;
            _player.damageEffect(firesparkLayer);
            if (_player.life <= 0) {

                switch (_player.shipType) {
                    case "mothership":
                        currentControl = playerLayer.children[1];
                        currentControl.visible = true;
                        currentControl.x = _player.x;
                        currentControl.y = _player.y;
                        currentControl.overlapTime = Date.now() + 1000;
                        _player.visible = false;
                        break;

                    default:
                        _player.visible = false;

                }

            }

            _player.overlapTime = Date.now() + 200;
        }

        _bullet.remove();
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


    /**
     *
     */

    function _enemySchedule(_order) {

        for (var i = 0; i < _order.length; i++) {

            setTimeout(function() {

                for (var j = 0; j < this.enemyCount; j++) {

                    setTimeout(function() {
                        var _e = this.enemy.sprite.getUnusedSprite();
                        if (typeof(_e) != "undefined") {
                            _e.enemyAttackMode(this.attack.attackDelay, this.attack.attackCount, this.attack.bullet);
                            _e.x = this.enemy.x;
                            _e.y = this.enemy.y;
                            _e.vy = this.enemy.vy;
                            _e.vx = this.enemy.vx;
                            _e.play();
                        }
                    }.bind(this), this.enemy.delay * j);

                }


            }.bind(_order[i]), _order[i].delayTime);
        }

    }

    return {
        init: _init
    }




})
