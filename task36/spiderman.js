/**
 * Created by ShirleyYang on 16/10/16.
 */
var SpiderMan=function (selector) {
    this.element=document.querySelector(selector);
    this.init();
    this.command=[
        {
           pattern:/^go\s+(\d+)?$/i,
        },
        {
            pattern:/^tun\s+(lef|rig|top)\s?(\d+)?$/i,
        },
        {
            pattern:/^tra\s+(lef|top|rig|bot)\s?(\d+)$/i,
        },
        {
            pattern:/^mov\s+(lef|top|rig|bot)\s?(\d+)?$/i,
        },
        {
            pattern:/^mov\s+(lef|top|rig|bot)\s?(\d+)?$/i,
        },
        {
            pattern:/^mov\s+to(\s?)+(\d+)[,\s+](\d+)$/i,
        },
        {
            pattern:/^build$/i,
        },
        {
            pattern:/^bru\s+/
        }
    ]
};

SpiderMan.prototype.init = function () {
    this.element.style.top=this.element.clientHeight + 'px';
    this.element.style.left=this.element.clientWidth + 'px';
    this.element.style.transform='rotate(0)deg';
};

SpiderMan.prototype.parse=function () {

}