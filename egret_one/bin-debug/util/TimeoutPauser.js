var util;
(function (util) {
    var TimeoutPauser = (function () {
        function TimeoutPauser() {
            this.isPausing = false;
            this.threads = [];
        }
        var d = __define,c=TimeoutPauser,p=c.prototype;
        TimeoutPauser.createInstance = function (pName) {
            if (this.pausers[pName]) {
                return this.pausers[pName];
            }
            else {
                return (this.pausers[pName] = new TimeoutPauser());
            }
        };
        TimeoutPauser.getPauserByName = function (pName) {
            return this.pausers[pName];
        };
        p.doFunc = function (thread) {
            var self = this;
            return function () {
                var curTime = Date.now();
                if (thread.processingTimeoutFlag) {
                    egret.clearTimeout(thread.processingTimeoutFlag);
                    thread.processingTimeoutFlag = 0;
                }
                if (!self.isPausing) {
                    thread.remainTime -= (curTime - thread.lastStartTime);
                    // 10为误差范围
                    if (thread.remainTime <= 10) {
                        thread.func.f.apply(thread.func.context);
                        // 可能在thread.func.f.apply(thread.func.context)中调用了clearTimeout，所以要再检验一次
                        if (self.threads.indexOf(thread) >= 0) {
                            self.threads.splice(self.threads.indexOf(thread), 1);
                        }
                    }
                    else {
                        var processingTimeoutFlag = egret.setTimeout(self.doFunc(thread), self, thread.remainTime);
                        thread.lastStartTime = curTime;
                        thread.processingTimeoutFlag = processingTimeoutFlag;
                    }
                }
            };
        };
        p.setTimeout = function (f, context, time) {
            // 使用egret.setTimeout
            var thread = {
                lastStartTime: 0,
                remainTime: 0,
                timeoutFlag: null,
                processingTimeoutFlag: 0,
                func: {
                    f: f,
                    context: context
                }
            };
            if (!this.isPausing) {
                var timeoutFlag = egret.setTimeout(this.doFunc(thread), this, time);
                var curTime = Date.now();
                thread.lastStartTime = curTime;
                thread.remainTime = time;
                thread.timeoutFlag = timeoutFlag;
                thread.processingTimeoutFlag = timeoutFlag;
                thread.func.f = f;
                thread.func.context = context;
            }
            else {
                thread.lastStartTime = Number.MAX_VALUE;
                thread.remainTime = time;
                thread.timeoutFlag = _.uniqueId("timeout");
                thread.processingTimeoutFlag = 0;
                thread.func.f = f;
                thread.func.context = context;
            }
            this.threads.push(thread);
            return thread.timeoutFlag;
        };
        p.clearTimeout = function (timeoutFlag) {
            var thread = _.findWhere(this.threads, { timeoutFlag: timeoutFlag });
            if (thread) {
                if (thread.processingTimeoutFlag) {
                    egret.clearTimeout(thread.processingTimeoutFlag);
                }
                this.threads.splice(this.threads.indexOf(thread), 1);
            }
        };
        p.pause = function () {
            if (!this.isPausing) {
                var curTime = Date.now();
                for (var i = 0; i < this.threads.length; i++) {
                    var thread = this.threads[i];
                    if (thread.processingTimeoutFlag) {
                        thread.remainTime -= curTime - thread.lastStartTime;
                    }
                }
                this.isPausing = true;
            }
        };
        p.resume = function () {
            if (this.isPausing) {
                var curTime = Date.now();
                for (var i = 0; i < this.threads.length; i++) {
                    var thread = this.threads[i];
                    thread.lastStartTime = curTime;
                    if (!thread.processingTimeoutFlag) {
                        thread.processingTimeoutFlag = egret.setTimeout(this.doFunc(thread), this, thread.remainTime);
                    }
                }
                this.isPausing = false;
            }
        };
        TimeoutPauser.pausers = {};
        return TimeoutPauser;
    }());
    util.TimeoutPauser = TimeoutPauser;
    egret.registerClass(TimeoutPauser,'util.TimeoutPauser');
})(util || (util = {}));
