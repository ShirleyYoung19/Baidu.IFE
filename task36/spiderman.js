/**
 * Created by ShirleyYang on 16/10/16.
 */

var SpiderMan=function (selector) {
    this.element=document.querySelector(selector);
    this.init();
    this.position=[];
    this.size=this.element.clientWidth;
    this.command=[
        {
            pattern:/^go\s*(\d+)?$/i,
            command:function () {
                var angle = this.position[2] % 360;
                switch (angle){
                    case 0:
                        if(this.position[0]>this.size){
                            this.element.style.top = this.position[1] + 'px';
                        }
                        break;
                    case 90:
                        if(this.position[1]>this.size){
                            this.element.style.left = this.position[1]+this.size + 'px';
                        }
                        break;
                }
            }
        },
        {
            pattern:/^tun\s*(?:lef|rig|top)\s*(\d+)?$/i,
        },
        {
            pattern:/^tra\s+(?:lef|top|rig|bot)\s*(\d+)$/i,
        },
        {
            pattern:/^mov\s+(?:lef|top|rig|bot)\s*(\d+)?$/i,
        },
        {
            pattern:/^mov\s+(?:lef|top|rig|bot)\s*(\d+)?$/i,
        },
        {
            pattern:/^mov\s+to\s+(?:\d+)[,\s+](?:\d+)$/i,
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
    this.element.style.transform='rotate(90deg)';
};

//传入的命令进行解析，判断是不是符合规定的，如果符合返回true，不符合返回false，并且将这一行的索引的颜色变红
SpiderMan.prototype.parse=function (code) {
    for( var i = 0; i < this.command.length; i ++){
        if(this.command[i].pattern.test(code)){
            return true;
        }
    }
    return false;
};

SpiderMan.prototype.conduct=function (code) {
    for( var i = 0; i < this.command.length; i ++){
        if(this.command[i].pattern.test(code)){
            var num=RegExp["$1"];//可能是次数，也可能是''
            if(!num){
                num ++;
            }
            if(num > 0){
                for(var j = 0; j < num ; j ++){
                    this.getPosition();
                    this.command[i].command.bind(this);
                }
            }
        }
    }
};

SpiderMan.prototype.getPosition=function () {
    this.position[0]=this.element.style.left;
    this.position[1]=this.element.style.top;
    var rotate = this.element.style.transform;
    this.position[2]=(/(\d+)/).exec(rotate)[0];
};