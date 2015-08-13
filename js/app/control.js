define(function() {

    function _start() {

        var left = keyboard(37),
            up = keyboard(38),
            right = keyboard(39),
            down = keyboard(40),
            fire = keyboard(32);


        left.press = function() {

            switch (currentControl.shipType) {
                case "mothership":
                    currentControl.setTextures = spriteAnimeStorage['shipCenterToLeft'];
                    break;
            }

            currentControl.vx = currentControl.speed * -1;
        }

        left.release = function() {
            switch (currentControl.shipType) {
                case "mothership":
                    currentControl.setTextures = spriteAnimeStorage['shipLeftToCenter'];
                    break;
            }
            currentControl.vx = 0;
        }

        right.press = function() {

            switch (currentControl.shipType) {
                case "mothership":
                    currentControl.setTextures = spriteAnimeStorage['shipCenterToRight'];
                    break;
            }

            currentControl.vx = currentControl.speed;
        }

        right.release = function() {
            switch (currentControl.shipType) {
                case "mothership":
                    currentControl.setTextures = spriteAnimeStorage['shipRightToCenter'];
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

    }


    return {
    	start:_start
    }
})
