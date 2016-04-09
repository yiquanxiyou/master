/**
 * Created by liguanjian on 2016/4/7.
 */

module fight {
    export class Direct extends egret.Sprite{
        constructor(private war) {
            super();
            this.addEventListener(egret.Event.ENTER_FRAME, this.findMonster, this);
        }

        public findMonster() {
            var t = this.war.getTeam(Camp.LEFT);
            var o = this.war.getTeam(Camp.RIGHT);

            t.forEach(function (i:fight.Actor) {
                var m = this.findNear(i, o);
                this.moveToward(i, m);
            }, this);
        }


        /*
        * 找到最近的一个敌人
        * a 自己 bArr 敌方全体
        * */
        public findNear(a, bArr) {
            var near;
            var dist;
            bArr.forEach(function (b) {
                var td = this.distance(a, b);
                if (!dist) dist = td;
                if (dist <= td) {
                    near = b;
                }
            }, this);
            return near;
        }


        public moveToward(a, b){
            var ax = a.display.x;
            var ay = a.display.y;
            var bx = b.display.x;
            var by = b.display.y;
            var tan = Math.abs(by - ay) / Math.abs(bx - ax);
            var spy = a.speed * tan;
            var spx = a.speed / tan;

            if(ax < bx){
                a.display.x += spx;
            }else {
                a.display.x -= spx;
            }
            if(ay < by){
                a.display.y += spy;
            }else {
                a.display.y -= spy;
            }
            //a.move();


        }

        /*目测两个人的距离*/
        public distance(a, b) {
            var ax = a.display.x;
            var ay = a.display.y;
            var bx = b.display.x;
            var by = b.display.y;

            var di = Math.sqrt(Math.pow(bx - ax, 2) + Math.pow(by - ay, 2));
            var ti = di / a.speed;

            return di;
        }


    }
}