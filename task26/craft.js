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
    var $div=$("<div></div>");
    $div.addClass("craft"+id);
    var $span=$("<span></span>");
    $span.addClass("energy");
    $($span).text(this.energy);
    var energyDiv=$("<div></div>");
    $(energyDiv).addClass("energy");
    $($div).append($span);
    $($div).append(energyDiv);
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
    var craft=$(orbite).children();
    var energyNumber=$craft().first();
    var energyBar=$craft().last();
    var obj=this;
    var timer=setInterval(function (obj) {
        $(craft).css("transform","rotate("+deg+"deg)");
        deg=deg+speed*0.2;
        obj.energy.get();
    },100);
};

Craft.prototype.energySystem=function () {
    var add=this.energyAdd;
    var consume=this.energyConsume;
    var energy=this.energy;
    var energyValue={
        get:function () {
            return energy;
        },
        addEnergy:function (num) {

        },
        consumeEnery:function (num) {

        }
    }

};