/**
 * Created by liguanjian on 2016/4/4.
 */

class DisplayUtil {
    constructor() {
    }

    /*龙骨元件*/
    public static getArmatureByFlaLibName(sourceName:string, flaLibName:string) {
        var skeletonData = RES.getRes(sourceName + "/skeleton");
        var textureData = RES.getRes(sourceName + "/texture");
        var texture = RES.getRes(sourceName + "/pic");

        var factory = new dragonBones.EgretFactory();
        factory.addSkeletonData(dragonBones.DataParser.parseDragonBonesData(skeletonData));
        factory.addTextureAtlas(new dragonBones.EgretTextureAtlas(texture, textureData));

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


}
