var fight;
(function (fight) {
    /*用于战斗时的计时器*/
    var Timepiece = (function (_super) {
        __extends(Timepiece, _super);
        function Timepiece() {
            _super.call(this);
            this.taskArray = [];
            this.tweenArray = [];
            this.timeoutPauserName = "timepiece_timeoutpauser";
            this.twId = 0;
            this.fps = egret.MainContext.instance.stage.frameRate;
            this.passFrame = 0;
            this.timeoutPauser = util.TimeoutPauser.createInstance(this.timeoutPauserName);
        }
        var d = __define,c=Timepiece,p=c.prototype;
        d(Timepiece, "instance"
            ,function () {
                if (!this._instance) {
                    this._instance = new Timepiece();
                }
                return this._instance;
            }
        );
        p.dispose = function () {
            this.pause();
        };
        p.clear = function () {
            this.taskArray = [];
            this.tweenArray = [];
        };
        p.onEnterFrameDo = function (e) {
            var self = this;
            var now = Util.now();
            this.taskArray.forEach(function (item) {
                if (item.interval && now - item._lastTime < item.interval) {
                    return;
                }
                item.task.apply(item.thisObj, [Math.min(now - item._lastTime, item._maxInterval)]);
                item._lastTime = now;
            });
            this.passFrame++;
        };
        /*
        * 将要执行的任务
        * this
        * 执行的间隔时间(单位秒)，如不传入，默认每帧执行
        * */
        p.addTask = function (task, thisObj, interval) {
            this.taskArray.push({
                thisObj: thisObj,
                task: task,
                interval: interval * 1000,
                _maxInterval: (interval ? (interval * 1000 + 200) : (200)),
                _lastTime: Util.now()
            });
        };
        p.addTween = function (tw, param, time, ease, cb, thisObj, cbParam) {
            var self = this;
            tw['twid'] = this.twId++;
            tw.to(param, time, ease).call(function () {
                cb && cb.apply(thisObj, cbParam);
                self.tweenArray.forEach(function (item) {
                    if (item['twid'] == tw['twid']) {
                        Util.removeObjFromArray(self.tweenArray, item);
                    }
                });
            });
            this.tweenArray.push(tw);
        };
        p.pauseAllTween = function () {
            this.tweenArray.forEach(function (item) {
                item.setPaused(true);
            });
        };
        p.resumeAllTween = function () {
            this.tweenArray.forEach(function (item) {
                item.setPaused(false);
            });
        };
        p.removeTask = function (task, thisObj) {
            var self = this;
            this.taskArray.forEach(function (item, index) {
                //必添加item['thisObj'] == thisObj条件, 可以同一个类不同实例传入同样的方法，需要this来判定
                if (item['thisObj'] == thisObj && item.task == task) {
                    Util.removeObjFromArray(self.taskArray, item);
                }
            });
        };
        p.pause = function () {
            this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrameDo, this);
            this.pauseAllTween();
            this.timeoutPauser.pause();
            Util.stopTime();
        };
        p.resume = function () {
            //((!this._lastTime) && (this._lastTime = Util.now()));
            this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrameDo, this);
            this.resumeAllTween();
            this.timeoutPauser.resume();
            Util.resumeTime();
        };
        p.setTimeout = function (f, content, time) {
            return this.timeoutPauser.setTimeout(f, content, time);
        };
        p.clearTimeout = function (flag) {
            return this.timeoutPauser.clearTimeout(flag);
        };
        return Timepiece;
    }(egret.Sprite));
    fight.Timepiece = Timepiece;
    egret.registerClass(Timepiece,'fight.Timepiece');
})(fight || (fight = {}));
