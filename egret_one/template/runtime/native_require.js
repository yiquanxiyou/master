
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/game/game.js",
	"libs/modules/game/game.native.js",
	"libs/modules/tween/tween.js",
	"libs/modules/when/when.js",
	"libs/modules/underscore/underscore.js",
	"libs/modules/res/res.js",
	"libs/modules/dragonBones/dragonBones.js",
	"bin-debug/DBFactoryPool.js",
	"bin-debug/DisplayUtil.js",
	"bin-debug/fight/Actor.js",
	"bin-debug/fight/Camp.js",
	"bin-debug/fight/Direct.js",
	"bin-debug/fight/Role.js",
	"bin-debug/fight/Skill.js",
	"bin-debug/fight/Timepiece.js",
	"bin-debug/fight/War.js",
	"bin-debug/LoadingUI.js",
	"bin-debug/Main.js",
	"bin-debug/PoolOfAnimate.js",
	"bin-debug/util/TimeoutPauser.js",
	"bin-debug/util/Util.js",
	//----auto game_file_list end----
];

var window = this;

egret_native.setSearchPaths([""]);

egret_native.requireFiles = function () {
    for (var key in game_file_list) {
        var src = game_file_list[key];
        require(src);
    }
};

egret_native.egretInit = function () {
    egret_native.requireFiles();
    egret.TextField.default_fontFamily = "/system/fonts/DroidSansFallback.ttf";
    //egret.dom为空实现
    egret.dom = {};
    egret.dom.drawAsCanvas = function () {
    };
};

egret_native.egretStart = function () {
    var option = {
        //以下为自动修改，请勿修改
        //----auto option start----
		entryClassName: "Main",
		frameRate: 30,
		scaleMode: "showAll",
		contentWidth: 540,
		contentHeight: 960,
		showPaintRect: false,
		showFPS: true,
		fpsStyles: "x:0,y:0,size:30,textColor:0x00c200,bgAlpha:0.9",
		showLog: true,
		logFilter: "",
		maxTouches: 2,
		textureScaleFactor: 1
		//----auto option end----
    };

    egret.native.NativePlayer.option = option;
    egret.runEgret();
    egret_native.Label.createLabel(egret.TextField.default_fontFamily, 20, "", 0);
    egret_native.EGTView.preSetOffScreenBufferEnable(true);
};