function Application() {
    this.spider = new Spider('.spider');

    this.$resolution=document.getElementById('resolution');

    this.initial()
}
Application.prototype.initial = function () {
    this.$resolution.addEventListener('change',this.setResolution.bind(this));
};
Application.prototype.setResolution = function () {
    this.spider.setResolution(parseInt(this.$resolution.value));
};
var app = new Application();