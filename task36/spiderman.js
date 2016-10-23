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

SpiderMan.prototype.getCurrentAngle = function () {
    var match = this.element.style.transform.match(/rotate\((\w+)deg\)/);
    return parseInt(match[1]);
};

SpiderMan.prototype.getCurrentDirection = function () {
    var angle = this.getCurrentAngle() % 360;
    return angle >= 0 ? angle : angle +360;
};

SpiderMan.prototype.getDisplacement = function (direction,offset) {
    var position = {0: [0, 1], 90: [-1, 0], 180: [0, -1], 270:[1, 0]}[direction];
    return [position[0]*offset, position[1]*offset];
};

SpiderMan.prototype.move = function(direction,step){
    this.goto(this.getPosition(direction,step))
};

SpiderMan.prototype.getPosition = function (direction, offset) {
    var offsetPosition = this.getDisplacement(direction,offset);
    var currentPosition = this.getCurrentPosition();
    return[currentPosition[0]+offsetPosition[0], currentPosition[1] + offsetPosition[1]];
};

SpiderMan.prototype.getCurrentPosition = function () {
    var position=[];
    position[0]=Math.round(this.getCurrentOffset('left')/this.element.clientWidth);
    position[1]=Math.round(this.getCurrentOffset('top')/this.element.clientHeight);
    return position;
};

SpiderMan.prototype.goto= function (position, turn) {
    this.element.style.left = position[0]*this.element.clientWidth + 'px';
    this.element.style.top = position[1]*this.element.clientHeight + 'px';
};

SpiderMan.prototype.getCurrentOffset = function (direction) {
    var offset = this.element.style[direction];
    if(offset){
        return parseInt(offset);
    }else{
        return 0;
    }
};