define(function() {

    function _createSpriteAnime() {

        var _frames = [];

        for (var i = 1; i < 17; i++) {
            _frames.push(PIXI.Texture.fromFrame("smoke_" + i + ".png"));
        }

        spriteAnimeStorage['smoke'] = _frames;

        var _frames = [];

        for (var i = 1; i < 6; i++) {
            _frames.push(PIXI.Texture.fromFrame("ship_" + i + ".png"));
        }

        spriteAnimeStorage['ship'] = _getFrame(_frames, [2]);
        spriteAnimeStorage['shipCenterToLeft'] = _getFrame(_frames, [2, 1, 0]);
        spriteAnimeStorage['shipLeftToCenter'] = _getFrame(_frames, [0, 1, 2]);
        spriteAnimeStorage['shipCenterToRight'] = _getFrame(_frames, [2, 3, 4]);
        spriteAnimeStorage['shipRightToCenter'] = _getFrame(_frames, [4, 3, 2]);

        var _frames = [];

        for (var i = 1; i < 11; i++) {
            _frames.push(PIXI.Texture.fromFrame("firespark_" + i + ".png"));
        }

        spriteAnimeStorage['firespark'] = _frames;

        var _frames = [];

        for (var i = 1; i < 5; i++) {
            _frames.push(PIXI.Texture.fromFrame("enemy_" + i + ".png"));
        }

        spriteAnimeStorage['enemy'] = _frames;

        var _frames = [];

        for (var i = 1; i < 17; i++) {
            _frames.push(PIXI.Texture.fromFrame("explode_typa_a_" + i + ".png"));
        }

        spriteAnimeStorage['explode'] = _frames;

        var _frames = [];

        for (var i = 0; i < 11; i++) {
            _frames.push(PIXI.Texture.fromFrame("gatling_" + i + ".png"));
        }

        spriteAnimeStorage['gatling_icon'] = _frames;

    }

    /**
     * get frame from spriteAnimeStorage
     * @param {array} _frames 
     * @param {array} _frames - select frames
     * 
     * @return {array}
     */

    function _getFrame(_frames, _frame) {
        var temp = [];
        for (var i = 0; i < _frame.length; i++) {
            temp.push(_frames[_frame[i]]);
        }
        return temp;
    }


    return {
        create: _createSpriteAnime
    }
})
