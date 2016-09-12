/**
 * Created by ShirleyYang on 16/8/28.
 * commandObject{}:用于向mediator传递指挥官下达的命令
 * randomNumber:    用于生成一个随机数,如果大于0.3命令能够传递给mediator,
 *                 如果小于0.3发生丢包事件
 */




$().ready(function () {

    var commandObject={};
    var randomNumber;
    //创建飞船或自爆飞船点击事件
    $("input[name='create']").click(function () {
        commandObject.id=$("input[name='create']").index($(this));
        randomNumber=Math.random();
        console.log(randomNumber);
        if($(this).val()==="创建飞船"){
            $(this).val("自爆飞船");
            commandObject.command="create";
            if($(this).next().is(":disabled")){
                $(this).next().attr("disabled",false);
            }
        }else{
            $(this).val("创建飞船");
            commandObject.command="explode";
        }

        mediator.getCommand(commandObject,randomNumber);
        consoleOut.getCommand(commandObject,randomNumber);


    });
    //飞行或停飞事件
    $("input[name='launch']").click(function (){
        commandObject.id=$("input[name='launch']").index($(this));
        randomNumber=Math.random();
        if($(this).val()==="飞行"){
            $(this).val("停止");
            commandObject.command="launch";
        }else{
            $(this).val("飞行");
            commandObject.command="stop";
        }

        mediator.getCommand(commandObject,randomNumber);
        consoleOut.getCommand(commandObject,randomNumber);

    });

});