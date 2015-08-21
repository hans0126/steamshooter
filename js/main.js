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
        create: "app/create",
        spriteAnimeManager: "app/sprite_anime_manager",
        hitHandle : "app/hit_handle",
        actor : "app/actor",
        control:"app/control"
    }
})




var stage;
var renderer;
var displayWidth;
var displayHeight;

var currentControl;

var playerGroup;
var bulletGroup;
var smallbulletGroup;
var smokeGroup;
var enemyGroup;
var firesparkGroup;
var enemyexplodeGroup;
var enemybulletGroup;


var uiLayer;


 var deviation = [1, -1];

var gameAction = function(){};

var spriteAnimeStorage = [];


requirejs(['pixi_custom', 'create', 'jquery', 'pixi', 'TweenMax', 'EasePack', 'meter', 'help'], function(pixi_custom, create) {

    pixi_custom.init();

    loader = new PIXI.loaders.Loader();
    loader.add("ship", "source/ship.json");
   
    loader.on("complete", loaded);
    loader.load();



    function loaded(loader, re) {
        resource = re;
        
        create.init();
    }




})
