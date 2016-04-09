/**
 * Created by liguanjian on 2016/4/6.
 */
var fight;
(function (fight) {
    var War = (function (_super) {
        __extends(War, _super);
        function War() {
            _super.call(this);
            this.initOur();
            this.initFoe();
            this.resetIndex();
            var direct = new fight.Direct(this);
        }
        var d = __define,c=War,p=c.prototype;
        p.reset = function () {
            //初始化角色
        };
        p.initOur = function () {
            this.teamOur = [];
            for (var i = 0; i <= 0; i++) {
                var r = new fight.Actor(new fight.Role());
                this.addChild(r.display);
                r.display.x = 80;
                r.display.y = 400 + Math.floor(Math.random() * 400);
                this.teamOur.push(r);
            }
        };
        p.initFoe = function () {
            this.teamFoe = [];
            for (var i = 0; i <= 0; i++) {
                var r = new fight.Actor(new fight.Role());
                this.addChild(r.display);
                r.display.x = 540 - 80;
                r.display.y = 400 + Math.floor(Math.random() * 400);
                r.displayTurnOver(true);
                this.teamFoe.push(r);
            }
        };
        p.resetIndex = function () {
            var numChildren = this.numChildren;
            console.log(numChildren);
            var yList = []; //y坐标数组
            var rList = []; //人物view
            for (var i = 0; i < numChildren; i++) {
                var c = this.getChildAt(i);
                yList.push(c.y);
                rList.push(c);
            }
            var nyL = _.clone(yList).sort();
            nyL.forEach(function (it, d) {
                var id = _.indexOf(yList, it);
                yList[id] = 0;
                this.setChildIndex(rList[id], d);
            }, this);
        };
        p.getTeam = function (camp) {
            if (camp == fight.Camp.LEFT)
                return this.teamOur;
            else
                return this.teamFoe;
        };
        return War;
    }(egret.DisplayObjectContainer));
    fight.War = War;
    egret.registerClass(War,'fight.War');
})(fight || (fight = {}));
