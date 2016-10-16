/**
 * Created by ShirleyYang on 16/10/16.
 */
var SpiderMan=function (selector) {
    this.element=document.querySelector(selector);
    this.init();
};
SpiderMan.prototype.init = function () {
    this.element.style.top=this.element.clientHeight + 'px';
    this.element.style.left=this.element.clientWidth + 'px';
    this.element.style.transform='rotate(0)deg';
};