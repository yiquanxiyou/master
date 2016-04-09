/**
 * Created by liguanjian on 2016/4/6.
 */
var fight;
(function (fight) {
    var Actor = (function (_super) {
        __extends(Actor, _super);
        function Actor(role) {
            _super.call(this);
            this.role = role;
            this.souName = 'p' + Math.floor(Math.random() * 3 + 1);
            this.createRole();
        }
        var d = __define,c=Actor,p=c.prototype;
        d(p, "display"
            ,function () {
                return this.armature.display;
            }
        );
        d(p, "speed"
            ,function () {
                return this.role.speed;
            }
        );
        d(p, "camp"
            ,function () {
                return this.role.camp;
            }
        );
        p.createRole = function () {
            this.stand();
        };
        p.rmMovie = function () {
            this.armature && fight.PoolOfAnimate.instance.accumulate(this.souName, this.actName, this.display);
            DisplayUtil.removeAllChildren(this);
        };
        p.displayTurnOver = function (t) {
            if (t)
                this.display.scaleX *= -1;
            else
                this.display.scaleX *= 1;
            this.isTurnOver = t;
        };
        p.changeStatus = function (sName) {
            this.rmMovie();
            this.actName = sName;
            this.armature = fight.PoolOfAnimate.instance.consume(this.souName, this.actName);
            this.addChild(this.display);
            this.armature.animation.gotoAndPlay("a", -1, -1, 0);
        };
        p.stand = function () {
            this.changeStatus('mb');
        };
        p.move = function () {
            this.changeStatus('ma');
        };
        p.general = function () {
            this.changeStatus('mc');
        };
        p.special = function () {
            this.changeStatus('md');
        };
        return Actor;
    }(egret.Sprite));
    fight.Actor = Actor;
    egret.registerClass(Actor,'fight.Actor');
})(fight || (fight = {}));
