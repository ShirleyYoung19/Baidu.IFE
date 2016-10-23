function Application() {
    this.spider = new Spider('.spider');
    this.spiderEditor = new SpiderEditor('.spider-commander');

    //获得运行速度
    this.$duration=document.getElementById('duration');

    this.$resolution=document.getElementById('resolution');
    this.$run=document.getElementById('run');
    this.duration=250;



    this.initial()
}

Application.prototype.initial = function () {
    this.$resolution.addEventListener('change',this.setResolution.bind(this));
    this.$run.addEventListener('click', this.run.bind(this));
    this.$duration.addEventListener('change',this.setDuration.bind(this));
};

Application.prototype.setResolution = function () {
    this.spider.setResolution(parseInt(this.$resolution.value));
};

Application.prototype.setDuration = function () {
    var index = this.$duration.selectedIndex;
    this.duration=parseInt(this.$duration[index].value);
};

Application.prototype.run=function () {
    var codes = this.spiderEditor.getCode();
    var codeStates = true;//判断是否有格式不正确的代码
    for (var i = 0; i < codes.length; i++){
        //依次检测textarea中的代码，如果不正确会返回false
        if(!this.spider.parse(codes[i])){
            //将不正确的代码行标红
            this.spiderEditor.warning(i);
            codeStates = false;
        }
    }
    if(codeStates){
        // var self = this;
        // codes.forEach(function (code,i) {
        //     if(code){
        //         self.spider.exec(code);
        //     }
        // })
        var self = this;
        var j = 0;
        function runCode(){
            self.spider.exec(codes[j]);
            j++;
            if( j < codes.length ){
                setTimeout(runCode,self.duration);
            }
        }
        runCode();
    }
};

new Application();