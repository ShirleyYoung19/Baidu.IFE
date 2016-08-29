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
}
Craft.prototype.create=function (id) {
    this.id=id;
    this.state="stop";
    var div=$("<div></div>");//创建存放的飞船的div,内部包括span和div(能量条)两个子元素
    div.addClass("inner");
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
        switch (command){
            case "explode":
                $($(orbite).get(id-1)).empty();
                break;
            case "launch":
                this.state="launch";
                this.launch(orbite);
                break;

        }

    }
};
Craft.prototype.launch=function (orbite) {
    var deg=0;
    var speed=this.speed;
    var craft=$(orbite).children();//获得craft中的两个子元素
    var energyNumber=$(craft).children().children().first();
    var energyBar=$(craft).children().children().last();
    var obj=this;
    var timer=setInterval(function () {
        $(craft).css("transform","rotate("+deg+"deg)");//设定飞船飞行动画
        deg=deg+speed*0.1;//每隔0.1s增加一定的角度
        var energyText=obj.getEnergy();//获取能量值
        $(energyNumber).text(energyText);//将获得的能量值反应到飞船上
        $(energyBar).css("height",0.4*energyText+"px");//将获得的能量值反应到飞船的能量条上
        if(energyText<=30){
            $(energyBar).css("background-color","rgb(200,59,56)");//若能量低于30%,提示变红
        }
        if(energyText==0){
            clearInterval(timer);
            obj.state='stop';
        }
    },100);
};

Craft.prototype.getEnergy=function () {
    if(this.state=="launch"){//如果状态是飞行
        if(this.energy>0){
            this.energy=this.energy-(this.energyConsume-this.energyAdd)*0.1
        }else{
            this.energy=0;
            this.state='stop';
            var launchBtn=$("[class|='craft']").get(this.id-1).last();//获得这个飞船对应的飞行按钮
            $(launchBtn).val("飞行");
        }
    }
    return this.energy.toFixed(0);
}
