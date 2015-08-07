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
        bulletLayer.checkOutArea();
        stage.addChild(playerLayer);
        stage.addChild(bulletLayer);

        var smoke = new PIXI.extras.MovieClip(spriteAnimeManager['smoke']);
        smoke.animationSpeed = 0.1;
        stage.addChild(smoke);
        smoke.play();
        smoke.x = 200;
        smoke.y = 200;

        for (var i = 0; i < 10; i++) {

            var bullet = new PIXI.Sprite.fromFrame('bullet_big.png');
            bullet.rotation = degree2Radian(-90);
            bullet.x = Math.floor(Math.random() * renderer.height);
            bullet.y = Math.floor(Math.random() * renderer.width);
            bullet.vx = 0;
            bullet.vy = 0;
            bullet.overlapTime = 0;
            // bullet.visible = false;
            //  console.log(bullet.x+"/"+bullet.y);
            bulletLayer.addChild(bullet);
        }



        var ship = new PIXI.extras.MovieClip(spriteAnimeManager['shipCenterToLeft']);

        ship.loop = false;

        ship.setAnchor(0.5);
        ship.fire = false;
        ship.vx = 0;
        ship.vy = 0;
        ship.overlapTime = 0;

        ship.state;
        ship.x = renderer.width / 2;
        ship.y = renderer.height / 2;
        ship.firingTimer = 0;


        ship.animationSpeed = 0.2;
        //ship.gotoAndPlay(2);

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

                var b = bulletLayer.getUnusedSprite();
                if (typeof(b) != "undefined") {

                    b.x = this.x + Math.floor(Math.random() * 10) * deviation[Math.floor(Math.random() * 2)];
                    b.y = this.y + Math.floor(Math.random() * 10) * deviation[Math.floor(Math.random() * 2)];


                    b.velocity(ship.x, 0, 7, true);

                    ship.firingTimer = Date.now() + 120;
                }
            }
        }

        function playing() {
            ship.x += ship.vx;
            ship.y += ship.vy;

            var _child = bulletLayer.children;
            for (var i = 0; i < _child.length; i++) {
                if (_child[i].visible == true) {
                    _child[i].x += _child[i].vx;
                    _child[i].y += _child[i].vy;
                }
            }

            if (ship.fire) {
                _fire.call(ship);
            }


            _overlap(playerLayer, bulletLayer, _hitHandle);

        }


        gameAction = playing;





        //update        
        _update();

    }

    function _hitHandle(_player, _bullet) {

        //_bullet.visible = false;
       // console.log(Date.now()+"/"+ _bullet.overlapTime);
        if (Date.now() > _bullet.overlapTime) {
            console.log("hit");
             _bullet.overlapTime = Date.now() + 200;
        }


       
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
            if (_layer1[i].visible == true) {
                for (var j = 0; j < _layer2.length; j++) {
                    if (_layer2[j].visible == true) {
                        if (hitTest(_layer1[i], _layer2[j])) {
                            //_handler()
                            _handler(_layer1[i], _layer2[j]);
                        }
                    }
                }
            }
        }

    }



    return {
        init: _init
    }




})
