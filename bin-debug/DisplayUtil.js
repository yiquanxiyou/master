/**
 * Created by liguanjian on 2016/4/4.
 */
var DisplayUtil = (function () {
    function DisplayUtil() {
    }
    var d = __define,c=DisplayUtil,p=c.prototype;
    /*龙骨元件*/
    DisplayUtil.getArmatureByFlaLibName = function (sourceName, flaLibName) {
        var skeletonData = RES.getRes(sourceName + "/skeleton");
        var textureData = RES.getRes(sourceName + "/texture");
        var texture = RES.getRes(sourceName + "/pic");
        var factory = new dragonBones.EgretFactory();
        factory.addSkeletonData(dragonBones.DataParser.parseDragonBonesData(skeletonData));
        factory.addTextureAtlas(new dragonBones.EgretTextureAtlas(texture, textureData));
        var armature = factory.buildFastArmature(flaLibName);
        if (armature) {
            var animationCachManager = armature.enableAnimationCache(25);
        }
        dragonBones.WorldClock.clock.add(armature);
        return armature;
    };
    return DisplayUtil;
}());
egret.registerClass(DisplayUtil,'DisplayUtil');
