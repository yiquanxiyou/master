module fight {

    /*用于战斗时的计时器*/
    export class Timepiece extends egret.Sprite {

        private static _instance:Timepiece;

        public static get instance():Timepiece {
            if (!this._instance) {
                this._instance = new Timepiece();
            }
            return this._instance;
        }

        private passFrame;

        private taskArray = [];

        private tweenArray = [];

        private fps;
        
        public timeoutPauserName = "timepiece_timeoutpauser";
        
        private timeoutPauser;

        constructor(){
            super();
            this.fps = egret.MainContext.instance.stage.frameRate;
            this.passFrame = 0;
            this.timeoutPauser = util.TimeoutPauser.createInstance(this.timeoutPauserName);
        }
        
        dispose() {
            this.pause();
        }

        public clear(){
            this.taskArray = [];
            this.tweenArray = [];
        }

        private onEnterFrameDo(e:egret.Event) {
            var self = this;
            var now = Util.now();
            this.taskArray.forEach(function(item:any){
                if (item.interval && now-item._lastTime<item.interval) {
                    return;
                }
                item.task.apply(item.thisObj, [Math.min(now-item._lastTime, item._maxInterval)]);
                item._lastTime = now;
            });
            this.passFrame++;
        }

        /*
        * 将要执行的任务
        * this
        * 执行的间隔时间(单位秒)，如不传入，默认每帧执行
        * */
        public addTask(task:Function, thisObj, interval?){
            this.taskArray.push({
                thisObj: thisObj,
                task: task,
                interval:interval*1000,
                _maxInterval:(interval?(interval*1000+200):(200)),
                _lastTime: Util.now()
            });
        }

        private twId = 0;
        public addTween(tw:egret.Tween, param:Object, time, ease?, cb?:Function, thisObj?:any, cbParam?):void{
            var self = this;
            tw['twid'] = this.twId ++;
            tw.to(param, time, ease).call(function(){
                cb && cb.apply(thisObj, cbParam);
                self.tweenArray.forEach(function(item){
                    if(item['twid'] == tw['twid']){
                        Util.removeObjFromArray(self.tweenArray, item);
                    }
                });
            });
            this.tweenArray.push(tw);
        }

        private pauseAllTween(){
            this.tweenArray.forEach(function(item:egret.Tween){
                item.setPaused(true);
            });
        }

        private resumeAllTween(){
            this.tweenArray.forEach(function(item:egret.Tween){
                item.setPaused(false);
            });
        }

        public removeTask(task:Function, thisObj){
            var self = this;
            this.taskArray.forEach(function(item,index){
                //必添加item['thisObj'] == thisObj条件, 可以同一个类不同实例传入同样的方法，需要this来判定
                if(item['thisObj'] == thisObj && item.task == task){
                    Util.removeObjFromArray(self.taskArray, item);
                }
            });
        }

        public pause(){
            this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrameDo, this);
            this.pauseAllTween();
            this.timeoutPauser.pause();
            Util.stopTime();
        }

        public resume(){
            //((!this._lastTime) && (this._lastTime = Util.now()));
            this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrameDo, this);
            this.resumeAllTween();
            this.timeoutPauser.resume();
            Util.resumeTime();
        }

        public setTimeout(f:Function, content:Object, time:Number):Number {
            return this.timeoutPauser.setTimeout(f, content, time);
        }
        
        public clearTimeout(flag:Number) {
            return this.timeoutPauser.clearTimeout(flag);
        }
    }
}
