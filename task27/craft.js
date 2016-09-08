/**
 * Created by ShirleyYang on 16/8/27.
 */
//创建飞船模块
function Craft(id,power,energy) {
    this.energy=100;
    this.energyAdd=energy;
    this.energyConsume=power[1];
    this.state='';
    this.id=id;
    this.speed=power[0];
    this.timer='';
    this.timerStop='';//这个timer变量是监视在launch时的时间间隔函数
}
Craft.prototype.create=function () {
    this.state="stop";
    var div=$("<div></div>");//创建存放的飞船的div,内部包括span和div(能量条)两个子元素
    div.addClass("inner");
    var span=$("<span></span>");
    span.addClass("energy");
    span.text(this.energy);
    var energyDiv=$("<div></div>");
    energyDiv.addClass("energy");
    div.append(span);
    div.append(energyDiv);
    var divOuter=$("<div></div>");//将包含飞船的div再放到一个div中,单纯为了实现样式
    divOuter.addClass("craft"+this.id);
    divOuter.append(div);
    var parent=$("[class|='orbite']").get(this.id);
    $(parent).append(divOuter);
};
Craft.prototype.getCommand=function (BUS) {
    //首先将命令通过Adapter解码
    var commandOrder=this.Adapter(BUS);
    var id=commandOrder[0];
    var command=commandOrder[1];
    //每一个飞船都会接受下达的指令,先判断命令是不是发给自己的
    if(this.id===id){
        var orbite=$("[class|='orbite']").get(this.id);
        switch (command){
            case "create":
                this.create();
                break;
            case "explode":
                $(orbite).empty();
                mediator.craftArray.splice(this,1);
                break;
            case "launch":
                this.state="launch";
                this.timer=this.launch(orbite);
                break;
            case "stop":
                this.state='stop';
                this.timerStop=this.stop(orbite);
                break;

        }

    }
};
Craft.prototype.launch=function (orbite) {
    var deg;
    var pattern=/\d{1,3}[.]\d{3}/;  //设定一个正则表达式
    var speed=parseFloat((this.speed*0.1*360/(230+this.id*80)/2/Math.PI).toFixed(3));
    var craft=$(orbite).children();//获得craft
    var craftInner=$(craft).children();
    var energyNumber=$(craftInner).children().first();
    var energyBar=$(craftInner).children().last();
    var obj=this;
    //如果之前是停飞状态要先将停飞状态的时间间隔函数取消
    if(this.timerStop){
        clearInterval(this.timerStop);
        this.timerStop='';
    }
    if($(craft).css("transform")=="none"){ //检查一下craft div是不是已经有了transform属性
        deg=0;  //没有的话将角度设置为0
    }else {
        deg=parseFloat(pattern.exec($(craft).attr("style"))[0]); //若已有transform属性,则将其值提取出来,注意转换成数字,如果度数超过4位数就会出错
        if(deg>360){
            deg -= 360;
        }
    }
    var timerLaunch=setInterval(function () {
        obj.timer=timerLaunch;

        $(craft).css("transform","rotate("+deg+"deg)");//设定飞船飞行动画
        deg=deg+speed;//每隔0.1s增加一定的角度
        var energyText=obj.getEnergy(obj.state);//获取能量值
        // if(energyText=="-0"){
        //     energyText=0;
        // }
        $(energyNumber).text(energyText);//将获得的能量值反应到飞船上
        $(energyBar).css("height",0.4*energyText+"px");//将获得的能量值反应到飞船的能量条上
        if(energyText<=30){
            $(energyBar).css("background-color","rgb(200,59,56)");//若能量低于30%,提示变红
        }
        if(energyText==0){
            // clearInterval(timerLaunch);
            // $(".craft-orbit"+(obj.id+1)+" input[name='launch']").val("飞行");
            obj.stop(orbite,timerLaunch);//将状态更改为stop开始调用stop时的命令
        }
    },100);
    return timerLaunch;
};

// 当飞行状态更改为停止时,有两种情况,一个是能量耗尽,更改为停止;另外一种是本来是在飞行中,更改为停止
Craft.prototype.stop=function (orbite) {
    if(this.timer){//判断是不是原来是正在飞行的飞船
        clearInterval(this.timer);
        this.timer='';
    }
    var craft=$(orbite).children();//获得craft,可能同一个轨道不止一个craft
    var craftInner=$(craft).children();
    var energyNumber=$(craftInner).children().first();
    var energyBar=$(craftInner).children().last();
    var obj=this;
    var timerStop=setInterval(function () {
        obj.timerStop=timerStop;

        var energyText=obj.getEnergy(obj.state);//获取能量值
        if(energyText=="-0"){
            energyText=0;
        }
        $(energyNumber).text(energyText);//将获得的能量值反应到飞船上
        $(energyBar).css("height",0.4*energyText+"px");//将获得的能量值反应到飞船的能量条上
        if(energyText<=30){
            $(energyBar).css("background-color","rgb(200,59,56)");//若能量低于30%,能量条变红
        }else {
            $(energyBar).css("background-color","#2fa06c");
        }
        if(energyText==100){
            clearInterval(timerStop);
        }
    },100);
    return timerStop;
};



Craft.prototype.getEnergy=function (state) {
    if(state=="launch"){//如果状态是飞行
        this.energy=this.energy-(this.energyConsume-this.energyAdd)*0.1;
        if(this.energy<0){
            this.energy=0;
            // 能量变为0的时候,将飞行的控制器的时间时间取消
            clearInterval(this.timer);
            this.timer='';
            this.state='stop';
            var launchBtn=$("[class|='craft']").get(this.id);//获得这个飞船对应的飞行按钮
            $(launchBtn.lastElementChild).val("飞行");
        }
    }else {
        this.energy=this.energy+this.energyAdd*0.1;
        if(this.energy>100){
            clearInterval(this.timerStop);
            this.timerStop='';
            this.energy=100;
        }

    }
    return this.energy.toFixed(0);

};

Craft.prototype.Adapter=function (BUS) {
    var id=parseInt(BUS.slice(0,2),2);
    var commandNumber=BUS.slice(2);
    var command;
    switch (commandNumber){
        case "00":
            command="create";
            break;
        case "01":
            command="explode";
            break;
        case "10":
            command="launch";
            break;
        case "11":
            command="stop";
            break;
    }
    return [id,command];
};




