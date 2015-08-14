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
                    _child[i].willHit = true;
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
                        var _b = _child[i];

                        if (_b.y < 0 || _b.x < 0 || _b.y > renderer.height || _b.x > renderer.width) {
                            _child[i].remove();
                        }
                    }
                }
            }

            PIXI.ticker.shared.add(_t.bind(this));

        }


        PIXI.DisplayObject.prototype.movement = function() {

            function _t() {
                var _child = this.children;
                for (var i = 0; i < _child.length; i++) {
                    if (_child[i].visible == true) {
                        _child[i].x += _child[i].vx;
                        _child[i].y += _child[i].vy;
                    }
                }
            }

            PIXI.ticker.shared.add(_t.bind(this));
        }


        PIXI.DisplayObject.prototype.hit = function() {

            var _child = this.children;
            for (var i = 0; i < _child.length; i++) {
                _child[i].willHit = true;
            }


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

        PIXI.Container.prototype.beHit = function() {

            var colorMatrix = [
                1, 0, 0, 0.5,
                0, 2, 0, 0.5,
                0, 0, 2, 0.5,
                0, 0, 0, 2
            ];

            var filter = new PIXI.filters.ColorMatrixFilter();
            filter.matrix = colorMatrix;
            this.filters = [filter];

            setTimeout(function() {
                this.filters = null;
            }.bind(this), 100);

        }

        PIXI.Container.prototype.actorInit = function() {
            this.vx = 0;
            this.vy = 0;
            this.overlapTime = 0;
            this.visible = false;
            this.setAnchor(0.5);
        }

        PIXI.Container.prototype.remove = function() {
            this.vx = 0;
            this.vy = 0;
            this.x = 0;
            this.y = 0;
            this.visible = false;
        }

        /**
         * enemy attack mode
         * @param {number} enemy fire delay time
         * @param {number} enemy attack count
         * @param {object} bullet layer
         */


        PIXI.Container.prototype.enemyAttackMode = function(_attackDelayTime, _attackCount, _bulletGroup) {

            this.attack = true;
            this.currentTime = Date.now() + _attackDelayTime;
            this.attackDelayTime = _attackDelayTime;
            this.attackCount = _attackCount;

            function _process() {
                if (this.attack) {
                    if (Date.now() > this.currentTime) {

                        var _b = _bulletGroup.getUnusedSprite();
                        var _t = playerGroup.children[0];

                        if (typeof(_b) != "undefined" && typeof(_t) != "undefined") {
                            _b.x = this.x;
                            _b.y = this.y;
                            _b.velocity(_t.x, _t.y, 3, false);
                        }

                        this.currentTime = Date.now() + this.attackDelayTime;

                        this.attackCount--;
                        if (this.attackCount <= 0) {
                            this.attack = false;
                        }
                    }
                }
            }

            PIXI.ticker.shared.add(_process.bind(this));
        }

        PIXI.Container.prototype.damageEffect = function(_effectGroup) {

            var _e = _effectGroup.getUnusedSprite();
            var _deviation = [1, -1];

            if (typeof(_e) != "undefined") {
                _e.x = this.x + Math.floor(Math.random() * this.width / 2) * _deviation[Math.floor(Math.random() * 2)];
                _e.y = this.y + Math.floor(Math.random() * this.height / 2) * _deviation[Math.floor(Math.random() * 2)];
                _e.play();
            }

        }




    }

    return {
        init: _init
    }

})
