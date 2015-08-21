define(function() {

    function _create() {
        //define group
        playerGroup = new PIXI.Container();
        bulletGroup = new PIXI.Container();
        smallbulletGroup = new PIXI.Container();
        enemyGroup = new PIXI.Container();
        firesparkGroup = new PIXI.Container();
        enemyexplodeGroup = new PIXI.Container();
        enemybulletGroup = new PIXI.Container();
        smokeGroup = new PIXI.Container();


        uiLayer = new PIXI.Container();





        //create bullet
        for (var i = 0; i < 50; i++) {
            var bullet = new PIXI.Sprite.fromFrame('bullet_big.png');
            bullet.pow = 2;
            bullet.id = i;
            bullet.actorInit();
            bullet.rotation = degree2Radian(90);
            bulletGroup.addChild(bullet);
        }

        //create small bullet
        for (var i = 0; i < 50; i++) {
            var bullet = new PIXI.Sprite.fromFrame('bullet_small.png');
            bullet.pow = 1;
            bullet.id = i;
            bullet.actorInit();
            smallbulletGroup.addChild(bullet);
        }

        //creat enemy bullet
        for (var i = 0; i < 20; i++) {
            var enemybullet = new PIXI.Sprite.fromFrame('enemy-bullet.png');
            enemybullet.pow = 1;
            enemybullet.id = i;
            enemybullet.actorInit();
            enemybulletGroup.addChild(enemybullet);

        }

        //create smoke
        for (var i = 0; i < 20; i++) {
            var smoke = new PIXI.extras.MovieClip(spriteAnimeStorage['smoke']);
            smoke.actorInit();
            smoke.animationSpeed = 0.3;
            smoke.loop = false;
            smoke.onComplete = function() {
                this.visible = false;
                this.gotoAndStop(0);
            }
            smokeGroup.addChild(smoke);

        }

        //create firespark
        for (var i = 0; i < 20; i++) {
            var firespark = new PIXI.extras.MovieClip(spriteAnimeStorage['firespark']);
            firespark.actorInit();
            firespark.animationSpeed = 0.3;
            firespark.loop = false;
            firespark.onComplete = function() {
                this.visible = false;
                this.gotoAndStop(0);
            }

            firesparkGroup.addChild(firespark);
        }
        //create explode
        for (var i = 0; i < 20; i++) {
            var explode = new PIXI.extras.MovieClip(spriteAnimeStorage['explode']);
            explode.actorInit();
            explode.animationSpeed = 0.3;
            explode.loop = false;
            explode.onComplete = function() {
                this.visible = false;
                this.gotoAndStop(0);
            }

            enemyexplodeGroup.addChild(explode);
        }

        //create enemy
        for (var i = 0; i < 50; i++) {
            var enemy = new PIXI.extras.MovieClip(spriteAnimeStorage['enemy']);
            enemy.actorInit();
            enemy.animationSpeed = 0.2;
            enemy.life = 3;
            enemy.id = i;
            enemy.destoryEffect = _explodeEffect;
            enemy.overlapDelayTime = 40;
            enemyGroup.addChild(enemy);
        }

        //create player mothership
        var ship = new PIXI.extras.MovieClip(spriteAnimeStorage['ship']);
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
        ship.overheat = 0;
        ship.penaltyCount = 0;
        ship.speed = 3;
        ship.bulletFiringTime = 120;
        ship.overlapDelayTime = 200;
        ship.hitarea = {
            width: 20,
            height: 20
        }
        ship.bullet = bulletGroup;

        ship.cooling = setInterval(function() {

            if (this.penaltyCount < 1) {
                if (!this.fire) {
                    if (this.overheat > 0) {
                        this.overheat--;
                    }
                }
            } else {
                this.penaltyCount--;
                if (this.penaltyCount < 1) {
                    this.overheat = 0;
                    console.log("penalty over");
                }
            }

           

            for(var i=0;i<this.children.length;i++){

                this.children[i].overheatDisplay.gotoAndStop(Math.floor(this.overheat/10)); 

            }

        }.bind(ship), 100);

        motherShipCreateFort.call(ship);

        ship.destoryEffect = _mothershipExplodeEffect;

        currentControl = ship;

        playerGroup.addChild(ship);
        //small ship
        for (var i = 0; i < 2; i++) {
            var ship = new PIXI.Sprite.fromFrame('small_player.png');
            ship.fire = false;
            ship.actorInit();
            ship.firingTimer = 0;
            ship.visible = false;
            ship.shipType = "ship";
            ship.speed = 5;
            ship.life = 1;
            ship.bullet = smallbulletGroup;
            ship.destoryEffect = _explodeEffect;
            ship.overlapDelayTime = 200;
            ship.bulletFiringTime = 120;
            playerGroup.addChild(ship);
        }


        bulletGroup.checkOutArea();
        bulletGroup.movement();
        bulletGroup.hit();


        smallbulletGroup.checkOutArea();
        smallbulletGroup.movement();
        smallbulletGroup.hit();

        enemyGroup.checkOutArea();
        enemyGroup.movement();
        enemyGroup.hit();

        enemybulletGroup.checkOutArea();
        enemybulletGroup.movement();
        enemybulletGroup.hit();

        playerGroup.movement();
        playerGroup.hit();

        playerGroup.children[0].willHit = true;

        // add to stage
        stage.addChild(playerGroup);
        stage.addChild(bulletGroup);
        stage.addChild(smallbulletGroup);
        stage.addChild(enemyGroup);
        stage.addChild(firesparkGroup);
        stage.addChild(enemyexplodeGroup);
        stage.addChild(enemybulletGroup);
        stage.addChild(smokeGroup);
        stage.addChild(uiLayer);
    }

    //set actor appearance

    function _actorOrder() {

        var enemysOrder = [];

        enemysOrder.push({
            delayTime: 200,
            enemyCount: 3,
            enemy: {
                x: 40,
                y: 0,
                vx: 1,
                vy: 1,
                sprite: enemyGroup,
                delay: 500
            },
            attack: {
                attackDelay: 500,
                attackCount: 2,
                bullet: enemybulletGroup
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
                sprite: enemyGroup,
                delay: 500
            },
            attack: {
                attackDelay: 500,
                attackCount: 2,
                bullet: enemybulletGroup
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
                sprite: enemyGroup,
                delay: 500
            },
            attack: {
                attackDelay: 500,
                attackCount: 2,
                bullet: enemybulletGroup
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
                sprite: enemyGroup,
                delay: 800
            },
            attack: {
                attackDelay: 500,
                attackCount: 1,
                bullet: enemybulletGroup
            }
        })

        return enemysOrder;

    }

    /**
     * @param {object} 
     */

    function _actorSchedule(_order) {

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

    /**
     * start Schedule
     */

    function _startSchedule() {
        _actorSchedule(_actorOrder());
    }

    /**
     * players fire
     */

    function _fire() {

        if (Date.now() > this.firingTimer) {

            switch (this.shipType) {
                case "mothership":
                    if (this.overheat < 100) {
                        for (var i = 0; i < this.children.length; i++) {
                            var _child = this.children[i];
                            var _b = this.bullet.getUnusedSprite();

                            if (typeof(_b) != "undefined") {

                                var _d = [1, -1];
                                var _t = _d[i] * 40;
                                /* _b.x = this.x + _t + Math.floor(Math.random() * 10) * getDeviation();
                                 _b.y = this.y + Math.floor(Math.random() * 10) * getDeviation() - 40;*/
                                _b.x = this.x + _child.x;
                                _b.y = this.y + _child.y;
                                var dgre = degree2Radian(_child.angle) + degree2Radian(Math.random() * (_child.de / 2)) * getDeviation();

                                var _xx = _b.x + Math.sin(dgre) * _child.te;
                                var _yy = _b.y + Math.cos(dgre) * _child.te * -1;

                                _b.velocity(_xx, _yy, 7, true);
                            }

                           _child.overheatDisplay.gotoAndStop(Math.floor(this.overheat/10)); 

                        }

                        this.overheat+=1;
                    } else {
                        if (this.penaltyCount == 0) {

                            this.penaltyCount = 100;
                            console.log("overheat");
                        }
                    }

                    break;

                default:

                    var _b = this.bullet.getUnusedSprite();

                    if (typeof(_b) != "undefined") {

                        _b.x = this.x + Math.floor(Math.random() * 10) * getDeviation();
                        _b.y = this.y + Math.floor(Math.random() * 10) * getDeviation() - 40;

                        _b.velocity(this.x, 0, 7, false);
                    }

            }

            this.firingTimer = Date.now() + this.bulletFiringTime;
        }
    }

    /**
     */

    function _explodeEffect() {

        var _e = enemyexplodeGroup.getUnusedSprite();
        if (typeof(_e) != "undefined") {
            _e.x = this.x;
            _e.y = this.y;
            _e.play();
            this.remove();
        }

    }


    function _mothershipExplodeEffect() {

        for (var i = 0; i < 20; i++) {
            setTimeout(function() {
                var _e = enemyexplodeGroup.getUnusedSprite();
                if (typeof(_e) != "undefined") {
                    _e.x = this.x + Math.floor(Math.random() * (this.width / 2)) * getDeviation();
                    _e.y = this.y + Math.floor(Math.random() * (this.height / 2)) * getDeviation();
                    _e.play();
                }

            }.bind(this), 250 * i);
        }

        var _iter = setInterval(function() {
            this.vy = -1;
            this.vx = 0;
            this.alpha -= 0.1;
            this.scale.x -= 0.01;
            this.scale.y -= 0.01;

            if (this.alpha <= 0) {
                this.remove();
                this.alpha = 0;
                clearInterval(_iter);
            }

        }.bind(this), 500);

    }


    function motherShipCreateFort() {
        _d = [1, -1];
        for (var i = 0; i < 2; i++) {
            var _g = new PIXI.Graphics();
            _g.x = (this.width / 2 * _d[i]);
            _g.y = _g.y - 20;
            _g.angle = 0;
            _g.av = 0;
            _g.de = 10;
            _g.te = 270;
            this.addChild(_g);

            // icon

            var _gun = new PIXI.extras.MovieClip(spriteAnimeStorage['gatling_icon']);

            uiLayer.addChild(_gun);
           
            _gun.y =renderer.height - _gun.height-5;          

            if (_d[i] > 0) {
                _gun.x = renderer.width - _gun.width -5;
            } else {
                _gun.x = 5;
            }

            _g.overheatDisplay = _gun;          




        }

        PIXI.ticker.shared.add(_ud.bind(this));

        function _ud() {
            var _c = this.children;

            for (var i = 0; i < _c.length; i++) {
                _c[i].angle += _c[i].av;
                _c[i].beginFill(0xa000f3, 0.2);
                _c[i].arc(0, 0, _c[i].te, 0, degree2Radian(_c[i].de) * -1, 1);
                _c[i].rotation = degree2Radian(_c[i].angle) + degree2Radian(Math.abs(90 - (_c[i].de / 2))) * -1;
            }
        }






    }



    return {
        create: _create,
        startSchedule: _startSchedule,
        playerFire: _fire
    }

})
