/**
 * Created by ShirleyYang on 16/8/28.
 * 用于控制console输出的模块
 */
var consoleOut={
    consoleDiv:$(".console")[0],

    //获得指挥官发出的信息
    getCommand:function (commandObject,randomNumber) {
        var command=commandObject.command;
        var id=commandObject.id;
        if(randomNumber>=0.3){
            var success=true;
        }
        switch (command){
            case "create":
                this.create(success,id);
                break;
            case "explode":
                this.explode(success,id);
                break;
            case "launch":
                this.launch(success,id);
                break;
            case "stop":
                this.stop(success,id);

        }

        //因为下面输出的时候,有一个事件延时,如果这个不加的话就没有办法显示出延迟后应该显示的信息
        // setTimeout(function () {
        //     consoleOut.scrollBottom()
        // },1000)
    },

    //如果是创建飞船命令:
    create:function (success,id) {
        var ele1,ele2;
        var time=new Date();
        ele1="<p class='success'>"+time.toLocaleTimeString()+"  [指挥官]:创建"+(id+1)+"号飞船命令已发送</p>";
        $(this.consoleDiv).append(ele1);
        this.scrollBottom();
        setTimeout(function () {
            var time1=new Date();
            if(success){
                ele2="<p class='success'>"+time1.toLocaleTimeString()+"  [消息]创建"+(id+1)+"号飞船成功了!</p>";
            }
            else{
                ele2="<p>"+time1.toLocaleTimeString()+"  [注意]创建"+(id+1)+"号飞船命令丢包了!!!</p>";
            }
            $(consoleOut.consoleDiv).append(ele2);
            consoleOut.scrollBottom();
        },1000);
    },

    //自爆飞船命令
    explode:function (success,id) {
        var ele1,ele2;
        var time=new Date();
        ele1="<p class='success'>"+time.toLocaleTimeString()+"  [指挥官]:自爆"+(id+1)+"号飞船命令已发送</p>";
        $(this.consoleDiv).append(ele1);
        this.scrollBottom();
        setTimeout(function () {
            var time1=new Date();
            if(success){
                ele2="<p class='success'>"+time1.toLocaleTimeString()+"  [消息]自爆"+(id+1)+"号飞船成功了!</p>";
            }
            else{
                ele2="<p>"+time1.toLocaleTimeString()+"  [注意]自爆"+(id+1)+"号飞船命令丢包了!!!</p>";
            }
            $(consoleOut.consoleDiv).append(ele2);
            consoleOut.scrollBottom();
        },1000);
    },

    //飞船启动命令
    launch:function (success,id) {
        var ele1,ele2;
        var time=new Date();
        ele1="<p class='success'>"+time.toLocaleTimeString()+"  [指挥官]:启动"+(id+1)+"号飞船命令已发送</p>";
        $(this.consoleDiv).append(ele1);
        this.scrollBottom();
        setTimeout(function () {
            var time1=new Date();
            if(success){
                ele2="<p class='success'>"+time1.toLocaleTimeString()+"  [消息]启动"+(id+1)+"号飞船成功了!</p>";
            }
            else{
                ele2="<p>"+time1.toLocaleTimeString()+"  [注意]启动"+(id+1)+"号飞船命令丢包了!!!</p>";
            }
            $(consoleOut.consoleDiv).append(ele2);
            consoleOut.scrollBottom();
        },1000);
    },

    //飞船停飞命令
    stop:function (success,id) {
        var ele1,ele2;
        var time=new Date();
        ele1="<p class='success'>"+time.toLocaleTimeString()+"  [指挥官]:停飞"+(id+1)+"号飞船命令已发送</p>";
        $(this.consoleDiv).append(ele1);
        this.scrollBottom();
        setTimeout(function () {
            var time1=new Date();
            if(success){
                ele2="<p class='success'>"+time1.toLocaleTimeString()+"  [消息]停飞"+(id+1)+"号飞船成功了!</p>";
            }
            else{
                ele2="<p>"+time1.toLocaleTimeString()+"  [注意]停飞"+(id+1)+"号飞船命令丢包了!!!</p>";
            }
            $(consoleOut.consoleDiv).append(ele2);
            consoleOut.scrollBottom();
        },1000);
    },

    //保证console输出界面scrollBar一直在画面最下方
    scrollBottom:function () {
        var scrollBottom=$(this.consoleDiv).scrollTop()+$(this.consoleDiv).height();

        $(this.consoleDiv).scrollTop(scrollBottom);
    }
};
