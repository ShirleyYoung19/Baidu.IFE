function Application() {
    this.spider = new Spider('.spider');
    this.spiderEditor = new SpiderEditor('.spider-commander');


    this.$resolution=document.getElementById('resolution');
    this.$run=document.getElementById('run');


    this.initial()
}

Application.prototype.initial = function () {
    this.$resolution.addEventListener('change',this.setResolution.bind(this));
    this.$run.addEventListener('click', this.run.bind(this));
};

Application.prototype.setResolution = function () {
    this.spider.setResolution(parseInt(this.$resolution.value));
};

Application.prototype.run=function () {
    var codes = this.spiderEditor.getCode();
    var codeStates = true;//判断是否有格式不正确的代码
    for (var i = 0; i < codes.length; i++){
        //依次检测textarea中的代码，如果不正确会返回false
        if(!this.spider.spiderMan.parse(codes[i])){
            //将不正确的代码行标红
            this.spiderEditor.warning(i);
            codeStates = false;
        }
    }
    if(codeStates){
        for (var j = 0; j < codes.length; j++){
            this.spider.spiderMan.conduct(codes[j]);
        }

    }
};

new Application();