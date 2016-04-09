/**
 * Created by liguanjian on 2016/4/6.
 */
module fight {
    export class War extends egret.DisplayObjectContainer {

        private teamOur ;
        private teamFoe ;

        constructor() {
            super();
            this.initOur();
            this.initFoe();
            this.resetIndex();
            var direct = new Direct(this);
        }

        private reset() {
            //初始化角色
        }

        private initOur() {
            this.teamOur = [];
            for (var i = 0; i <= 0; i++) {
                var r = new Actor(new Role());
                this.addChild(r.display);
                r.display.x = 80;
                r.display.y = 400 + Math.floor(Math.random() * 400);
                this.teamOur.push(r);
            }

        }

        private initFoe() {
            this.teamFoe = [];
            for (var i = 0; i <= 0; i++) {
                var r = new Actor(new Role());
                this.addChild(r.display);
                r.display.x = 540 - 80;
                r.display.y = 400 + Math.floor(Math.random() * 400);
                r.displayTurnOver(true);
                this.teamFoe.push(r);
            }
        }

        private resetIndex() {
            var numChildren = this.numChildren;
            console.log(numChildren);
            var yList = [];//y坐标数组
            var rList = [];//人物view
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
        }

        public getTeam(camp){
            if(camp == Camp.LEFT) return this.teamOur; else return this.teamFoe;
        }
    }
}