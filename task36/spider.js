/**
 * Created by ShirleyYang on 16/10/16.
 */
function Spider () {
    //最外层的单元
    this.element = document.querySelector('.spider');
    this.spiderMan = new SpiderMan('.spider-man');
    this.spiderMap = new SpiderMap('.spider-map');
    this.spiderMap.create(20,20);
    this.size=this.element.clientWidth;
    this.directions={bot:BOTTOM, lef:LEFT, top: TOP, rig: RIGHT};
    this.command=[
        {
            pattern:/^go\s*(\d+)?$/i,
            command:function (position,size,element) {
                var angle = position[2] % 360;
                switch (angle){
                    case 0:
                        if(position[0]>size){
                            element.style.top = position[1] + 'px';
                        }
                        break;
                    case 90:
                        if(position[1]<3000){
                            element.style.left =(position[1]+size)  + 'px';
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
            pattern:/^mov\s+(lef|top|rig|bot)\s*(\d+)?$/i,
            handler:function () {
                var direction = this.directions[arguments[0].toLowerCase()];
                this.run(this.move, [direction, arguments[2] || 1 ])
            }
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
}
Spider.prototype.setResolution=function (size) {
    this.spiderMap.innerHTML='';
    this.spiderMap.create(size,size);
    this.element.className = 'spider clearfix spider-'+size;
    this.spiderMan.init();
};

//传入的命令进行解析，判断是不是符合规定的，如果符合返回true，不符合返回false，并且将这一行的索引的颜色变红
/**解析命令，如果成功返回命令对象，否则返回false
 *
* @param{string} string
*@returns {boolean | {handler:handler,param:[]}}
*/

Spider.prototype.parse=function (string) {
    for( var i = 0; i < this.command.length; i ++){
        var command=this.command[i];
        var match = string.match(command.pattern);
        if(match){
            match.shift();
            return {handler: command.handler, params: match}
        }
    }
    return false;
};



/**
 * 运行命令
 *
 * @param {string} string
 * @returns {boolean|Promise}
 */
Spider.prototype.exec=function (string) {
    var command=this.parse(string);
    if(command){
        return command.handler.apply(this,command.params)
    } else{
        return false
    }
};


Spider.prototype.run = function () {

}





Spider.prototype.getPosition=function () {
    this.position[0]=parseInt(this.element.style.left.slice(0,-2));
    this.position[1]=parseInt(this.element.style.left.slice(0,-2));
    var rotate = this.element.style.transform;
    this.position[2]=(/(\d+)/).exec(rotate)[0];
};


