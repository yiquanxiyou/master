/**
 * Created by liguanjian on 2016/4/7.
 */
class Util {

    private static _instance:Util;

    public static get instance():Util {
        if (!this._instance) {
            this._instance = new Util();
        }
        return this._instance;
    }

    public constructor() {
    }

    /**
     *删除数组指定下标或指定对象
     *removeObjFromArray( 数组，元素 )
     */
    public static removeObjFromArray(arr, obj) {
        var hadDelete = false;
        for (var i = 0; i < arr.length; i++) {
            var temp = arr[i];
            if (!isNaN(obj)) {
                temp = i;
            }
            if (temp == obj) {
                for (var j = i; j < arr.length; j++) {
                    arr[j] = arr[j + 1];
                }
                arr.length = arr.length - 1;
                hadDelete = true;
            }
        }
        return hadDelete;
    }

    private static timeDelay=0;
    private static stopStartTime;
    public static now() {
        // 修改移动速度
        // 修改移动速度
        // 修改骨骼动画播放速度
        return Date.now()-this.timeDelay;
    }

    public static stopTime() {
        this.stopStartTime = Date.now();
    }

    public static resumeTime() {
        if (this.stopStartTime) {
            this.timeDelay += Date.now()-this.stopStartTime;
        }
    }
}