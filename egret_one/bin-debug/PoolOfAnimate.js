/**
 * Created by liguanjian on 2016/2/25.
 */
var fight;
(function (fight) {
    var PoolOfAnimate = (function () {
        function PoolOfAnimate() {
            this.map = {};
        }
        var d = __define,c=PoolOfAnimate,p=c.prototype;
        d(PoolOfAnimate, "instance"
            ,function () {
                if (!this._instance) {
                    this._instance = new PoolOfAnimate();
                }
                return this._instance;
            }
        );
        //积累
        p.accumulate = function (sourceName, sourcekey, display) {
            var k = sourceName + sourcekey;
            if (!this.map[k]) {
                this.map[k] = [];
            }
            this.map[k].push(display);
        };
        //消耗
        p.consume = function (sourceName, sourcekey) {
            var k = sourceName + sourcekey;
            var l = this.map[k];
            var r;
            if (l && l.length > 0) {
                r = l[0];
                l.shift();
            }
            else {
                r = DisplayUtil.getArmatureByFlaLibName(sourceName, sourcekey);
            }
            return r;
        };
        //释放
        p.destory = function () {
            for (var i in this.map) {
                DisplayUtil.disposeArmature(this.map[i]);
                this.map[i] = null;
                delete this.map[i];
            }
        };
        return PoolOfAnimate;
    }());
    fight.PoolOfAnimate = PoolOfAnimate;
    egret.registerClass(PoolOfAnimate,'fight.PoolOfAnimate');
})(fight || (fight = {}));
