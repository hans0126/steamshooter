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
 */

function hitTest(r1, r2) {
    /*
    console.log("x:%s,y:%s,width:%s,height:%s",r1.x,r1.y,r1.width,r1.height);
    r1 = r1.getBounds();  
    console.log("x:%s,y:%s,width:%s,height:%s",r1.x,r1.y,r1.width,r1.height);
console.log("---");
    console.log("x:%s,y:%s,width:%s,height:%s",r2.x,r2.y,r2.width,r2.height);
      r2 = r2.getBounds();
       console.log("x:%s,y:%s,width:%s,height:%s",r2.x,r2.y,r2.width,r2.height);
    console.log("***");*/



    if (r1.x - (r1.width / 2) + r1.width > r2.x - (r2.width / 2) &&
        r1.y - (r1.height / 2) + r1.height > r2.y - (r2.height / 2) &&
        r1.x - (r1.width / 2) < r2.x - (r2.width / 2) + r2.width &&
        r1.y - (r1.height / 2) < r2.y - (r2.height / 2) + r2.height) {
        return true;
    } else {
        return false;
    }

}
