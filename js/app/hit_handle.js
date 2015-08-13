define(function() {

    /**
     * overlap hittest with handler main program
     * @param {object} group
     * @param {object} group
     * @param {function} hit handler  function(obj1,obj2)
     */

    function _overlap(_Group1, _Group2, _handler) {

        if (typeof(_handler) != "function") {
            return false;
        }

        _Group1 = _Group1.children;
        _Group2 = _Group2.children;

        for (var i = 0; i < _Group1.length; i++) {
            for (var j = 0; j < _Group2.length; j++) {

                if (_Group1[i].visible == true && _Group1[i].willHit == true && _Group2[j].visible == true && _Group2[j].willHit == true) {
                    if (hitTest(_Group1[i], _Group2[j])) {
                        _handler(_Group1[i], _Group2[j]);
                    }
                }
            }
        }
    }

    /**/

    function _enemyHitHandle(_enemy, _bullet) {

        if (Date.now() > _enemy.overlapTime) {
            _enemy.damageEffect(firesparkGroup);
            _enemy.beHit();
            _enemy.life -= _bullet.pow;
            _enemy.overlapTime = Date.now() + 200;

            if (_enemy.life <= 0) {
                var _enemyexplode = enemyexplodeGroup.getUnusedSprite();
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
            _player.damageEffect(firesparkGroup);
            if (_player.life <= 0) {

                switch (_player.shipType) {
                    case "mothership":

                        currentControl = playerGroup.children[1];
                        currentControl.visible = true;
                        currentControl.x = _player.x;
                        currentControl.y = _player.y;                      
                        currentControl.overlapTime = Date.now() + 1000;

                        _player.destoryEffect();
                        _player.overlapTime = Date.now() + 10000;                      
                        _player.willHit = false;

                        break;

                    default:
                        _player.visible = false;

                }

            }

            _player.overlapTime = Date.now() + 200;
        }

        _bullet.remove();
    }

    return {
    	overlap:_overlap,
    	enemyHitHandle:_enemyHitHandle,
    	playerHitHandle:_playerHitHandle
    }

});
