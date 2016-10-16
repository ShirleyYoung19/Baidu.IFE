/**
 * Created by ShirleyYang on 16/9/23.
 */

function addHandler( element, type, handler ) {
    if( element.addEventListener ){
        element.addEventListener(type, handler);
    }else if( element.attachEvent ){
        element.attachEvent('on' + type, handler)
    }else {
        element['on' + type] = handler;
    }
}
function init() {
    //获取textarea输入文本框
    var text=document.getElementsByTagName('textarea')[0];
    //获取执行按钮
    var btn=document.getElementsByTagName('input')[0];
    //获取刷新按钮
    var refreshBtn=document.getElementsByTagName('input')[1];
    // 获取显示代码行的div
    var index=document.querySelector('.index');
    var indexNumber=1;
    //获取头像元素
    var head=document.querySelector('img.head');
    var angle=[0,270,180,90];
    var angleRotate;
    var correctOrders=["GO","TUN LEF","TUN RIG","TUN BAC","TRA LEF","TRA TOP","TRA RIG","TRA BOT",
        "MOV LEF","MOV TOP","MOV RIG","MOV BOT"];

    //为显示代码行的div和textarea区域绑定在一起，有新的一行就会相应的有新的代码行数组，而且两者是一同滚动的
    addHandler(text,'keyup',function (e) {
        // if(e.keyCode=='13'){
        //     indexNumber++;
        //     index.innerHTML += '<span>'+indexNumber +'</span><br />';
        //     index.scrollTop=text.scrollTop;
        // }
        var length=e.target.value.split(/\r?\n/g).length;
        index.innerHTML='';
        // if(length>indexNumber){
        for (var i=1; i<=length;i++){
            index.innerHTML += '<span>'+i +'</span><br />';
            index.scrollTop=text.scrollTop;
        }
        orders();
        // }
    });
    addHandler(text,'mousewheel',function () {
        index.scrollTop=text.scrollTop;
    });
    addHandler(index,'mousewheel',function () {
        text.scrollTop=index.scrollTop;
    });
    addHandler(refreshBtn,'click',function () {
        index.innerHTML='';
        text.value='';
    });

    addHandler(btn,'click',function () {
        var spanIndex=document.querySelectorAll(".error");
        Array.prototype.forEach.call(spanIndex,function (item) {
            item.className='';
        });
        var orderList=orders();

        var i=0;
        function goGo() {
            spiderGO(orderList[i]);
            i++;
            if(i<orderList.length){
                setTimeout(goGo,500)
            }
        }
        setTimeout(goGo,500);


    });

    function spiderGO(order) {

        var position=[];
        //蜘蛛侠目前的位置
        position[0]=head.offsetLeft;
        position[1]=head.offsetTop;
        var direction=head.style.transform;
        direction=parseInt(direction.match(/\-?\d+/)[0],10);
        // if(direction>=360){
        //     direction -=360;
        //     head.style.transform="rotate("+direction+"deg)";
        // }


        //蜘蛛侠目前的朝向，注意因为transform被定义在了外部样式表中，不能直接用ele.transform获取。目前采用的方法获得的是一个矩阵，要再转换一下

        var text=order;
        switch (text){
            case "GO":
                blockGO(position,direction,0,true,null);
                break;
            case "TUN LEF":
                blockGO(position,direction,-90,false,null);
                break;
            case "TUN RIG":
                blockGO(position,direction,90,false,null);
                break;
            case "TUN BAC":
                blockGO(position,direction,180,false,null);
                break;
            case "TRA LEF":
                blockGO(position,direction,0,true,3);
                break;
            case "TRA TOP":
                blockGO(position,direction,0,true,0);
                break;
            case "TRA RIG":
                blockGO(position,direction,0,true,1);
                break;
            case "TRA BOT":
                blockGO(position,direction,0,true,2);
                break;
            case "MOV LEF":
                angleRotate=angle[((direction/90)%4-3)>=0?(direction/90)%4-3:(direction/90)%4+1];
                blockGO(position,direction,angleRotate,true,3);
                break;
            case "MOV TOP":
                angleRotate=angle[(direction/90)%4];
                blockGO(position,direction,angleRotate,true,0);
                break;
            case "MOV RIG":
                angleRotate=angle[((direction/90)%4-1)>=0?(direction/90)%4-1:(direction/90)%4+3];
                blockGO(position,direction,angleRotate,true,1);
                break;
            case "MOV BOT":
                angleRotate=angle[((direction/90)%4-2)>=0?(direction/90)%4-2:(direction/90)%4+2];
                blockGO(position,direction,angleRotate,true,2);
                break;

        }


    }

    //获取元素CSS属性值
    function css(ele,property) {
        var oStyle=ele.currentStyle?ele.currentStyle : window.getComputedStyle(ele,null);
        var deg;
        if(oStyle.getPropertyValue){
            return oStyle.getPropertyValue(property);
        }else{
            return oStyle.getAttribute(property);
        }
    }
    //对textarea输入指令的分析函数
    //@param inputOrders:用户输入的指令
    //@param orderArray: 用户输入的指令按照行拆分开
    //@param itemNew:对输入项进行除去无用空格之后的得到的命令
    //@param correct: 判断这一行指令输入是否正确
    //@param orderList：蜘蛛侠最终执行的命令合集

    function orders() {
        var inputOrders=text.value;
        var orderArray=inputOrders.split('\n');
        var orderList=[];
        orderArray.forEach(function (item,index) {
            if(item){
                var itemNew=item.trim().toUpperCase().replace(/\s{2,}/g,' ');
                var correct=false;
                for(var i=0; i<correctOrders.length; i++){
                    var item=correctOrders[i];
                    if(itemNew.indexOf(item)==0){
                        var itemNumber=itemNew.slice(item.length).trim();
                        if(itemNumber){
                            if(/^\d+$/.test(itemNumber)){
                                correct=true;
                                for(var j=0; j<itemNumber; j++){
                                    orderList.push(item);
                                }
                                break;
                            }else{
                                correct=false;
                                errorRender(index);
                                return;

                            }
                        }else{
                            correct=true;
                            orderList.push(item);
                            break;
                        }
                    }
                }
                if(!correct){
                    errorRender(index);
                }
            }
        });
        return orderList;
    }

    //标注出改行指令错误
    function errorRender(indexNumber) {
        var indexSpans=index.getElementsByTagName('span');
        indexSpans[indexNumber].className='error';
    }
    //蜘蛛侠前进和方向控制的函数
    //@param position[left,top]:蜘蛛侠目前所在的位置
    //@param direction: 蜘蛛侠目前的朝向
    //@param angle: 蜘蛛侠要转的角度
    //@param ifMove：蜘蛛侠是否要移动一格
    //@param moveDirection：是否指定蜘蛛侠移动的方向

    function blockGO(position,direction,angle,ifMove,moveDirection) {
        //当即需要转向又需要移动时
        if( angle !=0 ){
            var direction1 = direction + angle;
            // if(direction1<=-360){
            //     direction1 +=360;
            // }
            head.style.transform="rotate("+direction1+"deg)";

        }
        if(ifMove){
            if(moveDirection==null) {
                moveDirection=(direction % 360) /90 ;
                moveDirection=moveDirection>=0 ? moveDirection : moveDirection+4;//0上，1右，2下，3左
            }
            switch (moveDirection){
                case 0:
                    if(position[1]>32){
                        head.style.top=(position[1]-31)+'px';
                    }
                    break;
                case 1:
                    if(position[0]+31<320){
                        head.style.left=(position[0]+31)+'px';
                    }
                    break;
                case 2:
                    if(position[1]+31<320){
                        head.style.top=(position[1]+31)+'px';
                    }
                    break;
                case 3:
                    if (position[0]>32){
                        head.style.left=(position[0]-31)+'px';
                    }
                    break;
            }
        }
    }

}
init();
