/**
 * Created by liguanjian on 2016/4/7.
 */
var Util = (function () {
    function Util() {
    }
    var d = __define,c=Util,p=c.prototype;
    d(Util, "instance"
        ,function () {
            if (!this._instance) {
                this._instance = new Util();
            }
            return this._instance;
        }
    );
    /**
     *删除数组指定下标或指定对象
     *removeObjFromArray( 数组，元素 )
     */
    Util.removeObjFromArray = function (arr, obj) {
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
    };
    Util.now = function () {
        // 修改移动速度
        // 修改移动速度
        // 修改骨骼动画播放速度
        return Date.now() - this.timeDelay;
    };
    Util.stopTime = function () {
        this.stopStartTime = Date.now();
    };
    Util.resumeTime = function () {
        if (this.stopStartTime) {
            this.timeDelay += Date.now() - this.stopStartTime;
        }
    };
    Util.timeDelay = 0;
    return Util;
}());
egret.registerClass(Util,'Util');
