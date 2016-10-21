/**
 * Created by ShirleyYang on 16/10/16.
 */
var BOTTOM=0;
var TOP=180;
var LEFT = 90;
var RIGHT = 270;
var SpiderMan=function (selector) {
    this.element=document.querySelector(selector);
    this.init();
    this.position=[];

};

SpiderMan.prototype.init = function () {
    this.size = this.element.clientWidth;
    this.element.style.top=this.element.clientHeight + 'px';
    this.element.style.left=this.element.clientWidth + 'px';
    this.element.style.transform='rotate(0deg)';
};

