window.requestAnimFrame = (function() {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();


/**
 *
 */

function keyboard(keyCode) {
    var key = {};
    key.code = keyCode;
    key.isDown = false;
    key.isUp = true;
    key.press = undefined;
    key.release = undefined;
    //The `downHandler`
    key.downHandler = function(event) {
        if (event.keyCode === key.code) {
            if (key.isUp && key.press) key.press();
            key.isDown = true;
            key.isUp = false;
        }
        event.preventDefault();
    };

    //The `upHandler`
    key.upHandler = function(event) {
        if (event.keyCode === key.code) {
            if (key.isDown && key.release) key.release();
            key.isDown = false;
            key.isUp = true;
        }
        event.preventDefault();
    };

    //Attach event listeners
    window.addEventListener(
        "keydown", key.downHandler.bind(key), false
    );
    window.addEventListener(
        "keyup", key.upHandler.bind(key), false
    );
    return key;
}



/**
 *
 *
 */

function degree2Radian(_degrees) {
    return  _degrees * (Math.PI / 180);
}


/**
*/

function hitTest(r1, r2) {
    r1 = r1.getBounds();
    r2 = r2.getBounds();


    if (r1.x + r1.width > r2.x &&
        r1.y + r1.height > r2.y &&
        r1.x < r2.x + r2.width &&
        r1.y < r2.y + r2.height) {
        return true;
    } else {
        return false;
    }
}
