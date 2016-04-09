/**
 * Created by liguanjian on 2016/4/6.
 */

module fight {
    export class Actor extends egret.Sprite {

        public armature;
        private souName;
        private actName;
        private isTurnOver;//翻转
        constructor(private role:Role) {
            super();
            this.souName = 'p' + Math.floor(Math.random() * 3 + 1);
            this.createRole();
        }

        public get display(){
            return this.armature.display;
        }

        public get speed(){
            return this.role.speed;
        }

        public get camp(){
            return this.role.camp;
        }

        private createRole() {
            this.stand();
        }

        private rmMovie(){
            this.armature && PoolOfAnimate.instance.accumulate(this.souName, this.actName, this.display);
            DisplayUtil.removeAllChildren(this);
        }

        public displayTurnOver(t) {
            if(t) this.display.scaleX *= -1; else this.display.scaleX *= 1;
            this.isTurnOver = t;
        }

        private changeStatus(sName){
            this.rmMovie();
            this.actName = sName;
            this.armature = PoolOfAnimate.instance.consume(this.souName, this.actName);
            this.addChild(this.display);
            this.armature.animation.gotoAndPlay("a", -1, -1, 0);
        }

        public stand(){
            this.changeStatus('mb');
        }

        public move(){
            this.changeStatus('ma');
        }

        public general(){
            this.changeStatus('mc');
        }

        public special(){
            this.changeStatus('md');
        }

    }
}