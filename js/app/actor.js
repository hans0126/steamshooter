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


        //create bullet
        for (var i = 0; i < 50; i++) {
            var bullet = new PIXI.Sprite.fromFrame('bullet_big.png');
            bullet.pow = 2;
            bullet.id = i;
            bullet.actorInit();
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
            enemyGroup.addChild(enemy);
        }
        //create player
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
        ship.speed = 3;
        ship.hitarea = {
            width: 20,
            height: 20
        }
        ship.bullet = bulletGroup;

        ship.destoryEffect = function() {

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

        currentControl = ship;

        playerGroup.addChild(ship);

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

            var _b = this.bullet.getUnusedSprite();

            if (typeof(_b) != "undefined") {

                _b.x = this.x + Math.floor(Math.random() * 10) * deviation[Math.floor(Math.random() * 2)];
                _b.y = this.y + Math.floor(Math.random() * 10) * deviation[Math.floor(Math.random() * 2)] - 40;

                _b.velocity(this.x, 0, 7, false);

                this.firingTimer = Date.now() + 120;
            }
        }
    }

    return {
        create: _create,
        startSchedule: _startSchedule,
        playerFire: _fire
    }

})
