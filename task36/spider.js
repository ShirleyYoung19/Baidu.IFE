/**
 * Created by ShirleyYang on 16/10/16.
 */
function Spider () {
    //最外层的单元
    this.element = document.querySelector('.spider');
    this.spiderMan = new SpiderMan('.spider-man');
    this.spiderMap = new SpiderMap('.spider-map');
    this.spiderMap.create(20,20);
}
Spider.prototype.setResolution=function (size) {
    this.spiderMap.innerHTML='';
    this.spiderMap.create(size,size);
    this.element.className = 'spider clearfix spider-'+size;
    this.spiderMan.init();
};