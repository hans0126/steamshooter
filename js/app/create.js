define(["spriteAnimeManager", "hitHandle", "actor", "control"], function(spriteAnimeManager, hitHandle, actor, control) {

    var stats;

    var deviation = [1, -1];

    var enemysOrder = [];

    function _init() {

        _createMeter(); //create fps test
        spriteAnimeManager.create(); // create sprite frame

        displayWidth = 750;
        displayHeight = 500;

        stage = new PIXI.Container();

        renderer = PIXI.autoDetectRenderer(displayWidth, displayHeight, {
            backgroundColor: 0x000000
        });

        document.getElementById("gameView").appendChild(renderer.view);
        // create game actor
        actor.create();
        
        // start game
        //actor.startSchedule();

        // game control
        control.start();

        // when game playing...loop
        function playing() {

            if (currentControl.fire) {
                actor.playerFire.call(currentControl);
            }

            hitHandle.overlap(enemyGroup, bulletGroup, hitHandle.enemyHitHandle);
            hitHandle.overlap(enemyGroup, smallbulletGroup, hitHandle.enemyHitHandle);
            hitHandle.overlap(enemybulletGroup, playerGroup, hitHandle.playerHitHandle);
            hitHandle.overlap(enemyGroup, playerGroup, hitHandle.playerEnemyHitHandle);
        }

        gameAction = playing;

        //update        
        _update();

    }

    // create fps meter
    function _createMeter() {
        stats = new Stats();
        stats.setMode(0); // 0: fps, 1: ms
        // align top-left
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.right = '0px';
        stats.domElement.style.top = '0px';
        document.body.appendChild(stats.domElement);
    }
    // game loop
    function _update() {
        stats.begin();
        renderer.render(stage);
        gameAction();
        stats.end();
        requestAnimFrame(_update);
    }


    return {
        init: _init
    }

})
