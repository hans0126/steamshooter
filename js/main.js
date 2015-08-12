/**/
requirejs.config({
    baseUrl: "js",
    paths: {
        jquery: "https://code.jquery.com/jquery-2.1.4.min",
        pixi: "lib/pixi",
        TweenLite: "lib/greensock-js/src/minified/TweenLite.min",
        TweenMax: "lib/greensock-js/src/minified/TweenMax.min",
        EasePack: "lib/greensock-js/src/minified/easing/EasePack.min",
        meter: "lib/stats.js-master/build/stats.min",
        pixi_custom: "pixi_custom",
        help: "help",
        create: "app/create"
    }
})




var stage;
var renderer;
var displayWidth;
var displayHeight;

var currentControl;

var playerLayer;
var bulletLayer;
var smallbulletLayer;
var smokeLayer;
var enemyLayer;
var firesparkLayer;
var enemyexplodeLayer;
var enemybulletLayer;

var gameAction = function(){};

var spriteAnimeManager = [];


requirejs(['pixi_custom', 'create', 'jquery', 'pixi', 'TweenMax', 'EasePack', 'meter', 'help'], function(pixi_custom, create) {

    pixi_custom.init();

    loader = new PIXI.loaders.Loader();
    loader.add("ship", "source/ship.json");
    /*loader.add("ui", "images/ui.json");
    loader.add("role", "images/role.json");
    loader.add("blade", "images/effect_blade.json");
    loader.add("police_bg", "images/police_bg.jpg");
    loader.add("crackhouse", "images/crackhouse.fnt");*/

    loader.on("complete", loaded);
    loader.load();



    function loaded(loader, re) {
        resource = re;
        
        create.init();
    }




})
