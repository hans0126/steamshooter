define(function() {

    function _start() {

        var left = keyboard(37),
            up = keyboard(38),
            right = keyboard(39),
            down = keyboard(40),
            fire = keyboard(32),
            slowDown = keyboard(65), //A
            speedUp = keyboard(83), //S
            fort1AngleReduce = keyboard(81), //Q
            fort1AnglePlus = keyboard(87); //W


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


        slowDown.press = function() {
            if (currentControl.shipType == "mothership") {
                if (currentControl.speed > 1) {
                    currentControl.speed--;
                    currentControl.bulletFiringTime -= 30;

                    _renewVelocity.bind(currentControl);

                }
            }
        }

        speedUp.press = function() {
            if (currentControl.shipType == "mothership") {
                if (currentControl.speed < 5) {
                    currentControl.speed++;
                    currentControl.bulletFiringTime += 30;

                    _renewVelocity.bind(currentControl);

                }
            }
        }


        fort1AngleReduce.press = function() {
            if (currentControl.shipType == "mothership") {
                currentControl.children[0].av = -1;
            }

        }

        fort1AngleReduce.release = function() {
            if (currentControl.shipType == "mothership") {
                currentControl.children[0].av = 0;
            }
        }

        fort1AnglePlus.press = function() {
            if (currentControl.shipType == "mothership") {
                currentControl.children[0].av = 1;
            }
        }

        fort1AnglePlus.release = function() {
            if (currentControl.shipType == "mothership") {
                currentControl.children[0].av = 0;
            }
        }

        stage.interactive = true;

    }

    function _renewVelocity() {

        if (this.vx > 0) {
            this.vx = this.speed;
        } else if (this.vx < 0) {
            this.vx = this.speed * -1
        }

        if (this.vy > 0) {
            this.vy = this.speed;
        } else if (this.vy < 0) {
            this.vy = this.speed * -1
        }
    }



    return {
        start: _start
    }
})
