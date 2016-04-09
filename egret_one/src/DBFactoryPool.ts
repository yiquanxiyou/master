/**
 * Created by liguanjian on 2016/4/5.
 */
class DBFactoryPool{

    private data = {};

    private static _instance:DBFactoryPool;

    public static get instance():DBFactoryPool {
        if (!this._instance) {
            this._instance = new DBFactoryPool();
        }
        return this._instance;
    }

    constructor(){}

    public getFactoryByName(name){
        var r;
        if(this.data[name]){
            r = this.data[name];
        }else {
            var skeletonData = RES.getRes(name + "/skeleton");
            var textureData = RES.getRes(name + "/texture");
            var texture = RES.getRes(name + "/pic");

            var factory = new dragonBones.EgretFactory();
            factory.addSkeletonData(dragonBones.DataParser.parseDragonBonesData(skeletonData));
            factory.addTextureAtlas(new dragonBones.EgretTextureAtlas(texture, textureData));
            r = this.data[name] = factory;
        }
        return r;
    }
}