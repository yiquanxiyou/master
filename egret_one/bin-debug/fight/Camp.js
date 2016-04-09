var fight;
(function (fight) {
    var Camp = (function () {
        function Camp() {
        }
        var d = __define,c=Camp,p=c.prototype;
        Camp.LEFT = "hero";
        Camp.RIGHT = "monster";
        Camp.MIDDLE = 'neutral';
        return Camp;
    }());
    fight.Camp = Camp;
    egret.registerClass(Camp,'fight.Camp');
})(fight || (fight = {}));
