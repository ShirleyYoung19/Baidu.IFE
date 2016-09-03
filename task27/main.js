/**
 * Created by ShirleyYang on 16/8/28.
 * commandObejct{}:用于向mediator传递指挥官下达的命令
 * randomNumer:    用于生成一个随机数,如果大于0.3命令能够传递给mediator,
 *                 如果小于0.3发生丢包事件
 * craftType=[powerType,energyType]:定义飞船的类型
 */




$().ready(function () {

    var commandObject={};
    var craftType=[];
    var randomNumber;


    //创建飞船或自爆飞船点击事件
    $("input[name='create']").click(function () {
        //获取当前操作的飞船的轨道编码
        commandObject.id=$("input[name='create']").index($(this));
        console.log(randomNumber);
        if($(this).val()==="创建飞船"){
            $(this).val("自爆飞船");
            commandObject.command="create";
            // 确定新建飞船的类型
            craftType[0]=$(this).prev().prev().val();
            craftType[1]=$(this).prev().val();
            $(this).next().attr("disabled",false);
            $(this).prev().attr("disabled",true);
            $(this).prev().prev().attr("disabled",true);

        }else{
            $(this).val("创建飞船");
            commandObject.command="explode";
            $(this).next().attr("disabled",true);
            $(this).prev().attr("disabled",false);
            $(this).prev().prev().attr("disabled",false);
        }

        mediator.getCommand(commandObject,craftType);
        // consoleOut.getCommand(commandObject,randomNumber);


    });
    //飞行或停飞事件
    $("input[name='launch']").click(function (){
        commandObject.id=$("input[name='launch']").index($(this));
        if($(this).val()==="飞行"){
            $(this).val("停止");
            commandObject.command="launch";
        }else{
            $(this).val("飞行");
            commandObject.command="stop";
        }

        mediator.getCommand(commandObject);
        // consoleOut.getCommand(commandObject,randomNumber);

    });

});