/**
 * Created by liguanjian on 2016/4/4.
 */

class DisplayUtil {
    constructor() {
    }

    /*龙骨元件*/
    public static getArmatureByFlaLibName(sourceName:string, flaLibName:string) {

        var factory = DBFactoryPool.instance.getFactoryByName(sourceName);
        var armature = factory.buildFastArmature(flaLibName);
        if (armature) {
            var animationCachManager = armature.enableAnimationCache(25);
            //var animationCachManager:any;
            //if (_.findIndex(this.animationCachManagers, {"sourceName":sourceName,"flaLibName":flaLibName})>=0) {
            //    animationCachManager = _.findWhere(this.animationCachManagers, {"sourceName":sourceName,"flaLibName":flaLibName})["animationCachManager"];
            //    animationCachManager.bindCacheUserArmature(armature);
            //    armature.enableCache = true;
            //} else {
            //    animationCachManager = armature.enableAnimationCache(30);
            //    this.animationCachManagers.push({
            //        sourceName: sourceName,
            //        flaLibName: flaLibName,
            //        animationCachManager: animationCachManager
            //    });
            //}
        }
        dragonBones.WorldClock.clock.add(armature);
        return armature;
    }

    public static disposeArmature(armature) {
        if (armature && (armature instanceof dragonBones.FastArmature || armature instanceof dragonBones.Armature)) {
            dragonBones.WorldClock.clock.remove(armature);//这一句不能删除，this.armature销毁了，必要移出WorldClock
            armature.dispose();
        }
    }

    /*删除全部的子元素*/
    public static removeAllChildren(contain:egret.DisplayObjectContainer) {
        var numChildren = contain.numChildren;
        for (var i = 0; i < numChildren; i++) {
            contain.removeChildAt(0);
        }
    }

}
