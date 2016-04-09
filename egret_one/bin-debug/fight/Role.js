/**
 * Created by liguanjian on 2016/4/6.
 */
var fight;
(function (fight) {
    var Role = (function () {
        function Role() {
            this.speed = 1; //速度固定
        }
        var d = __define,c=Role,p=c.prototype;
        p.getRangeRole = function (camp, range) {
        };
        p.getNextSkill = function () {
        };
        p.updateBlood = function () {
        };
        p.reverse = function () { };
        return Role;
    }());
    fight.Role = Role;
    egret.registerClass(Role,'fight.Role');
})(fight || (fight = {}));
