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
    for (var i = 0; i < codes.length; i++){
        SpiderMan.parse(codes[i]);
    }
};

new Application();