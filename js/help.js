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
    return _degrees * (Math.PI / 180);
}


/**
 * hittest for anchor 0.5 (center,center)
 * @param {object} 
 * @param {object} 
 */

function hitTest(_object1, _object2) {

    var r1 = _getInfo(_object1);
    var r2 = _getInfo(_object2);



    if (r1.x + (r1.width / 2) > r2.x - (r2.width / 2) &&
        r1.y + (r1.height / 2) > r2.y - (r2.height / 2) &&
        r1.x - (r1.width / 2) < r2.x + (r2.width / 2) &&
        r1.y - (r1.height / 2) < r2.y + (r2.height / 2)) {
        return true;
    } else {
        return false;
    }

    function _getInfo(_obj) {
        var _o = {};
        _o.x = _obj.x;
        _o.y = _obj.y;

        if (typeof(_obj.hitarea) != "undefined") {
            _o.width = _obj.hitarea.width;
            _o.height = _obj.hitarea.height;
        } else {
            _o.width = _obj.width;
            _o.height = _obj.height;
        }

        return _o;

    }
}


function getDeviation(){
    var _d = [1,-1];
    return _d[Math.floor(Math.random()*2)];
}
