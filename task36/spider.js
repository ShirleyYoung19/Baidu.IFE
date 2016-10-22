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
    this.queue=[];
    this.duration=250;
    this.running=false;
    this.command=[
        {
            pattern:/^go(\s+)?(\d+)?$/i,
            handler:function () {
              return  this.run (this.go, [arguments[1]])
            }

        },
        {
            pattern:/^tun\s+(lef|rig|bac)$/i,
            handler:function (direction) {
                return this.run( this.rotate, [{left:-90,rig:90,bac:180}[direction.toLowerCase()]])
            }
        },
        {
            pattern:/^tra\s+(lef|top|rig|bot)(\s+)?(\d+)?$/i,
            handler:function () {
                var direction = this.directions[arguments[0].toLowerCase()];
                return this.run(this.moveDirect, [direction, arguments[2] || 1])
            }
        },
        {
            pattern:/^mov\s+(lef|top|rig|bot)(\s+)(\d+)?$/i,
            handler:function () {
                var direction = this.directions[arguments[0].toLowerCase()];
                return this.run(this.move, [direction, arguments[2] || 1 ])
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


Spider.prototype.run = function (func,params) {
    this.queue.push({
        func:func,
        params:params
    });

    this.taskLoop();
};

Spider.prototype.taskLoop = function () {
    this.running = true;
    var task=this.queue.shift();
    if(task){
        task.func.apply(this,task.params);
        setTimeout(this.taskLoop().bind(this),this.duration)
    }else{
        this.running = false;
    }
};

Spider.prototype.go = function (step) {
    step = step || 1;
    var direction = this.spiderMan.getCurrentDirection();
    this.checkPath(direction,step);
    this.spiderMan.move(direction,step);
};


Spider.prototype.setDuration = function () {

};

Spider.prototype.checkPath=function(direction,step){
    var displacement = this.spiderMan.getDisplacement(direction,step);
    var currentPosition = this.spiderMan.getCurrentPosition(direction,step);

    for( var i = 1; i <=step; i++){
        var x = currentPosition[0] + displacement[0]*i;
        var y = currentPosition[1] + displacement[1]*i;
        if(this.map.getType())
    }
};


Spider.prototype.getPosition=function () {
    this.position[0]=parseInt(this.element.style.left.slice(0,-2));
    this.position[1]=parseInt(this.element.style.left.slice(0,-2));
    var rotate = this.element.style.transform;
    this.position[2]=(/(\d+)/).exec(rotate)[0];
};


