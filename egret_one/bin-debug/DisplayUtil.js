/**
 * Created by liguanjian on 2016/4/4.
 */
var DisplayUtil = (function () {
    function DisplayUtil() {
    }
    var d = __define,c=DisplayUtil,p=c.prototype;
    /*龙骨元件*/
    DisplayUtil.getArmatureByFlaLibName = function (sourceName, flaLibName) {
        var factory = DBFactoryPool.instance.getFactoryByName(sourceName);
        var armature = factory.buildFastArmature(flaLibName);
        if (armature) {
            var animationCachManager = armature.enableAnimationCache(25);
        }
        dragonBones.WorldClock.clock.add(armature);
        return armature;
    };
    DisplayUtil.disposeArmature = function (armature) {
        if (armature && (armature instanceof dragonBones.FastArmature || armature instanceof dragonBones.Armature)) {
            dragonBones.WorldClock.clock.remove(armature); //这一句不能删除，this.armature销毁了，必要移出WorldClock
            armature.dispose();
        }
    };
    /*删除全部的子元素*/
    DisplayUtil.removeAllChildren = function (contain) {
        var numChildren = contain.numChildren;
        for (var i = 0; i < numChildren; i++) {
            contain.removeChildAt(0);
        }
    };
    return DisplayUtil;
}());
egret.registerClass(DisplayUtil,'DisplayUtil');
