/**
 * Created by ShirleyYang on 16/8/27.
 */
//创建飞船模块
function Craft() {
    this.energy=100;
    this.energyAdd=2;
    this.energyConsume=5;
    this.state='';
    this.id='';
    this.speed=10;
    this.timer='';
    this.number='';
}
Craft.prototype.create=function (id,num) {
    this.number=num;
    this.id=id;
    this.state="stop";
    var div=$("<div></div>");//创建存放的飞船的div,内部包括span和div(能量条)两个子元素
    div.addClass("inner"+this.number);
    var span=$("<span></span>");
    span.addClass("energy");
    $(span).text(this.energy);
    var energyDiv=$("<div></div>");
    $(energyDiv).addClass("energy");
    $(div).append(span);
    $(div).append(energyDiv);
    var $div=$("<div></div>");//将包含飞船的div再放到一个div中,单纯为了实现样式
    $div.addClass("craft"+id);
    $($div).append(div);
    $($("[class|='orbite']").get(id-1)).append($div);
};
Craft.prototype.getCommand=function (id,command) {
    //每一个飞船都会接受下达的指令,先判断命令是不是发给自己的
    if(this.id===id){
        var orbite=$("[class|='orbite']").get(id-1);
       // var timer; //这个timer变量是监视在launch时的时间间隔函数
        switch (command){
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
                this.stop(orbite,this.timer);
                break;

        }

    }
};
Craft.prototype.launch=function (orbite) {
    var deg;
    var pattern=/\d{1,3}/;  //设定一个正则表达式
    var speed=this.speed;
    var craft=$(orbite).children();//获得craft,可能同一个轨道不止一个craft
    var craftNumber=$(craft).children().filter("[class=inner"+this.number+"]");//获得类为inner+number的单元
    craft=$(craftNumber).parent();
    var energyNumber=$(craftNumber).children().first();
    var energyBar=$(craftNumber).children().last();
    var obj=this;
    if($(craft).css("transform")=="none"){ //检查一下craft div是不是已经有了transform属性
        deg=0;  //没有的话将角度设置为0
    }else {
        deg=Number(pattern.exec($(craft).attr("style"))[0]); //若已有transform属性,则将其值提取出来,注意转换成数字
    }
    var timerLaunch=setInterval(function () {
        $(craft).css("transform","rotate("+deg+"deg)");//设定飞船飞行动画
        deg=deg+speed*0.1;//每隔0.1s增加一定的角度
        var energyText=obj.getEnergy(obj.state);//获取能量值
        if(energyText=="-0"){
            energyText=0;
        }
        $(energyNumber).text(energyText);//将获得的能量值反应到飞船上
        $(energyBar).css("height",0.4*energyText+"px");//将获得的能量值反应到飞船的能量条上
        if(energyText<=30){
            $(energyBar).css("background-color","rgb(200,59,56)");//若能量低于30%,提示变红
        }
        if(energyText==0){
            clearInterval(timerLaunch);
            obj.stop(orbite);//将状态更改为stop开始调用stop时的命令
        }
    },100);
    return timerLaunch;
};

// 当飞行状态更改为停止时,有两种情况,一个是能量耗尽,更改为停止;另外一种是本来是在飞行中,更改为停止
Craft.prototype.stop=function (orbite,timer) {
    if(timer){//判断是不是原来是正在飞行的飞船
        clearInterval(timer);
    }
    var craft=$(orbite).children();//获得craft,可能同一个轨道不止一个craft
    var craftNumber=$(craft).children().filter("[class=inner"+this.number+"]");//获得类为inner+number的单元
    var energyNumber=$(craftNumber).children().first();
    var energyBar=$(craftNumber).children().last();
    var obj=this;
    var timerStop=setInterval(function () {
        var energyText=obj.getEnergy(obj.state);//获取能量值
        if(energyText=="-0"){
            energyText=0;
        }
        $(energyNumber).text(energyText);//将获得的能量值反应到飞船上
        $(energyBar).css("height",0.4*energyText+"px");//将获得的能量值反应到飞船的能量条上
        if(energyText<=30){
            $(energyBar).css("background-color","rgb(200,59,56)");//若能量低于30%,能量条变红
        }else {
            $(energyBar).css("background-color","#2fa06c");//若能量低于30%,提示变红
        }
        if(energyText==100){
            clearInterval(timerStop);
        }
    },100)
};



Craft.prototype.getEnergy=function (state) {
    if(state=="launch"){//如果状态是飞行
        if(this.energy>0){
            this.energy=this.energy-(this.energyConsume-this.energyAdd)*0.1
        }else{
            this.energy=0;
            this.state='stop';
            var launchBtn=$("[class|='craft']").get(this.id-1);//获得这个飞船对应的飞行按钮
            $(launchBtn.lastElementChild).val("飞行");
        }
    }else {
        if(this.energy<100){
            this.energy=this.energy+this.energyAdd*0.1;
        }else {
            this.energy=100;
        }

    }
    return this.energy.toFixed(0);
};




