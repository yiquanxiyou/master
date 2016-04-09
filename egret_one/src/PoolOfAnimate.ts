/**
 * Created by liguanjian on 2016/2/25.
 */

module fight{
    export class PoolOfAnimate{

        private static _instance:PoolOfAnimate;

        public static get instance():PoolOfAnimate {
            if (!this._instance) {
                this._instance = new PoolOfAnimate();
            }
            return this._instance;
        }
        
        constructor(){}

        private map = {};
        //积累
        public accumulate(sourceName, sourcekey, display){
            var k = sourceName + sourcekey;
            if(!this.map[k]){
                this.map[k] = [];
            }
            this.map[k].push(display);
        }

        //消耗
        public consume(sourceName, sourcekey){
            var k = sourceName + sourcekey;
            var l = this.map[k];
            var r ;
            if(l && l.length > 0){
                r = l[0];
                l.shift();
            }else {
                r = DisplayUtil.getArmatureByFlaLibName(sourceName, sourcekey);
            }
            return r;
        }

        //释放
        public destory(){
            for(var i in this.map){
                DisplayUtil.disposeArmature(this.map[i]);
                this.map[i] = null;
                delete this.map[i];
            }
        }
    }
}