define(function() {

    function _init() {
        //layer order
        PIXI.Container.prototype.updateLayersOrder = function() {
                this.children.sort(function(a, b) {
                    a.zIndex = a.zIndex || 0;
                    b.zIndex = b.zIndex || 0;
                    return a.zIndex - b.zIndex
                });
            }
            // new properties scaleX scaleY for green seek
        Object.defineProperties(PIXI.Container.prototype, {
            scaleX: {
                get: function() {
                    return this.scale.x;
                },
                set: function(v) {
                    this.scale.x = v;
                }
            },
            scaleY: {
                get: function() {
                    return this.scale.y;
                },
                set: function(v) {
                    this.scale.y = v;
                }
            }
        });

        // change texture, current frame reset
        Object.defineProperties(PIXI.extras.MovieClip.prototype, {
            setTextures: {
                get: function() {
                    return this._textures;
                },
                set: function(value) {
                    this._textures = value;
                    this.texture = this._textures[Math.floor(this._currentTime) % this._textures.length];
                    //reset currentTime, go to 0
                    this._currentTime = 0;
                    this.play();
                }
            }

        });

        // set anchor 
        PIXI.Sprite.prototype.setAnchor = function(v) {
                this.anchor.x = v;
                this.anchor.y = v;
            }
            // get unused element
        PIXI.DisplayObject.prototype.getUnusedSprite = function() {
            var _child = this.children;
            for (var i = 0; i < _child.length; i++) {
                if (_child[i].visible == false) {
                    _child[i].visible = true;
                    return _child[i];
                    break;
                }
            }
        }

        PIXI.DisplayObject.prototype.checkOutArea = function() {

            function _t() {
                var _child = this.children;
                for (var i = 0; i < _child.length; i++) {
                    if (_child[i].visible == true) {
                        if (_child[i].y < 0 || _child[i].x < 0 || _child[i].y > renderer.height || _child[i].x > renderer.width) {
                            _child[i].vx = 0;
                            _child[i].vy = 0;
                            _child[i].visible = false;
                        }
                    }
                }
            }

            PIXI.ticker.shared.add(_t.bind(this));

        }

        //set child property
        PIXI.DisplayObject.prototype.setAll = function(_property, _value) {
            var _child = this.children;
            for (var i = 0; i < _child.length; i++) {
                _child[i][_property] = _value;
            }
        }


        PIXI.Container.prototype.velocity = function(_targetX, _targetY, _speed, _rotation) {
            var _t = Math.atan2(_targetY - this.y, _targetX - this.x);
            this.vx = Math.cos(_t) * _speed;
            this.vy = Math.sin(_t) * _speed;
            if (_rotation) {
                this.rotation = _t;
            }
        }



    }

    return {
        init: _init
    }

})
