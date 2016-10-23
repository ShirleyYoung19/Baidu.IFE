/**
 * Created by ShirleyYang on 16/8/28.
 * 用于控制console输出的模块
 */
var consoleOut={
    consoleDiv:$(".console")[0],
    /**
     *  获得指挥官发出的信息
     * @param BUS
     * @param success
     */
    getCommand:function (BUS,success) {
        var commandOrder=BUS.slice(2);
        var id=parseInt(BUS.slice(0,2),2);
        switch (commandOrder){
            case "00":
                this.create(success,id);
                break;
            case "01":
                this.explode(success,id);
                break;
            case "10":
                this.launch(success,id);
                break;
            case "11":
                this.stop(success,id);

        }

    },
    /**
     * 创建飞船命令处理
     * @param success
     * @param id
     */
    create:function (success,id) {
        var ele1,ele2;
        var time=this.getTime();
        //已发送出去
        if(success!=undefined){
            if(success==true){
                ele2="<p class='success'>"+time+"  [消息]创建"+(id+1)+"号飞船成功了!</p>";
            }
            else{
                ele2="<p>"+time+"  [注意]创建"+(id+1)+"号飞船命令丢包了!!!正在重试...</p>";
            }
            $(this.consoleDiv).append(ele2);
            this.scrollBottom();
        }else{  //指挥官命令
            ele1="<p class='success'>"+time+"  [指挥官]:创建"+(id+1)+"号飞船命令已发送</p>";
            $(this.consoleDiv).append(ele1);
            this.scrollBottom();
        }
    },

    /**
     * 自爆飞船命令
     * @param success
     * @param id
     */

    explode:function (success,id) {
        var ele1,ele2;
        var time=this.getTime();
        if(success!=undefined) {
            if (success) {
                ele2 = "<p class='success'>" + time+ "  [消息]自爆" + (id + 1) + "号飞船成功了!</p>";
            }
            else {
                ele2 = "<p>" + time + "  [注意]自爆" + (id + 1) + "号飞船命令丢包了!!!,正在重试...</p>";
            }
            $(this.consoleDiv).append(ele2);
            this.scrollBottom();
        }else {
            ele1="<p class='success'>"+time+"  [指挥官]:自爆"+(id+1)+"号飞船命令已发送</p>";
            $(this.consoleDiv).append(ele1);
            this.scrollBottom();
        }



    },


    /**飞船启动命令
     *
     * @param success
     * @param id
     */
    launch:function (success,id) {
        var ele1, ele2;
        var time = this.getTime();
        if (success != undefined) {
            if (success) {
                ele2 = "<p class='success'>" + time + "  [消息]启动" + (id + 1) + "号飞船成功了!</p>";
            } else {
                ele2 = "<p>" + time + "  [注意]启动" + (id + 1) + "号飞船命令丢包了!!!正在重试...</p>";
            }
            $(this.consoleDiv).append(ele2);
            this.scrollBottom();
        } else {
            ele1 = "<p class='success'>" + time + "  [指挥官]:启动" + (id + 1) + "号飞船命令已发送</p>";
            $(this.consoleDiv).append(ele1);
            this.scrollBottom();
        }
    },
    /**
     *  飞船停飞命令
     * @param success
     * @param id
     */

    stop:function (success,id) {
        var ele1,ele2;
        var time=this.getTime();
        if(success != undefined){
            if(success){
                ele2="<p class='success'>"+time+"  [消息]停飞"+(id+1)+"号飞船成功了!</p>";
            }
            else{
                ele2="<p>"+time+"  [注意]停飞"+(id+1)+"号飞船命令丢包了!!!正在重试...</p>";
            }
            $(this.consoleDiv).append(ele2);
            this.scrollBottom();
        }else{
            ele1="<p class='success'>"+time+"  [指挥官]:停飞"+(id+1)+"号飞船命令已发送</p>";
            $(this.consoleDiv).append(ele1);
            this.scrollBottom();
        }
    },


    /**
     * 保证console输出界面scrollBar一直在画面最下方
     */
    scrollBottom:function () {
     //   var scrollBottom=$(this.consoleDiv).scrollTop()+$(this.consoleDiv).height();
        $(this.consoleDiv).scrollTop(this.consoleDiv.scrollHeight);
    },
    getTime:function () {
        var time=new Date();
        var milliseconds=time.getMilliseconds().toString();
        if(milliseconds.length<3){
            if(milliseconds.length==2){
                milliseconds="0"+milliseconds;
            }else {
                milliseconds="00"+milliseconds;
            }
        }
        return time.toLocaleTimeString()+":"+milliseconds;
    }
};
