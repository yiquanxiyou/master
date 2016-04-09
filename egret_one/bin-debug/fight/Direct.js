/**
 * Created by liguanjian on 2016/4/7.
 */
var fight;
(function (fight) {
    var Direct = (function (_super) {
        __extends(Direct, _super);
        function Direct(war) {
            _super.call(this);
            this.war = war;
            this.addEventListener(egret.Event.ENTER_FRAME, this.findMonster, this);
        }
        var d = __define,c=Direct,p=c.prototype;
        p.findMonster = function () {
            var t = this.war.getTeam(fight.Camp.LEFT);
            var o = this.war.getTeam(fight.Camp.RIGHT);
            t.forEach(function (i) {
                var m = this.findNear(i, o);
                this.moveToward(i, m);
            }, this);
        };
        /*
        * 找到最近的一个敌人
        * a 自己 bArr 敌方全体
        * */
        p.findNear = function (a, bArr) {
            var near;
            var dist;
            bArr.forEach(function (b) {
                var td = this.distance(a, b);
                if (!dist)
                    dist = td;
                if (dist <= td) {
                    near = b;
                }
            }, this);
            return near;
        };
        p.moveToward = function (a, b) {
            var ax = a.display.x;
            var ay = a.display.y;
            var bx = b.display.x;
            var by = b.display.y;
            var tan = Math.abs(by - ay) / Math.abs(bx - ax);
            var spy = a.speed * tan;
            var spx = a.speed / tan;
            if (ax < bx) {
                a.display.x += spx;
            }
            else {
                a.display.x -= spx;
            }
            if (ay < by) {
                a.display.y += spy;
            }
            else {
                a.display.y -= spy;
            }
            //a.move();
        };
        /*目测两个人的距离*/
        p.distance = function (a, b) {
            var ax = a.display.x;
            var ay = a.display.y;
            var bx = b.display.x;
            var by = b.display.y;
            var di = Math.sqrt(Math.pow(bx - ax, 2) + Math.pow(by - ay, 2));
            var ti = di / a.speed;
            return di;
        };
        return Direct;
    }(egret.Sprite));
    fight.Direct = Direct;
    egret.registerClass(Direct,'fight.Direct');
})(fight || (fight = {}));
