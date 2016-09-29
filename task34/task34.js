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
    //获取input输入文本框
    var input=document.getElementsByTagName('input')[0];
    //获取提交按钮
    var btn=document.getElementsByTagName('button')[0];
    // //获取表格中tbody元素
    // var tbody=document.getElementsByTagName('tbody')[0];
    // //获取tbody下面的所有tr元素
    // var tr=childElementNode(tbody);
    //获取头像元素
    var head=document.querySelector('img.head');

    addHandler(btn,'click',function () {
        var position=[];
        //蜘蛛侠目前的位置
        position[0]=head.offsetLeft;
        position[1]=head.offsetTop;
        var direction=Math.asin(String.prototype.split.call(css(head,'transform'),',')[1]);
            direction=Math.round(direction/Math.PI*180);
        //蜘蛛侠目前的朝向，注意因为transform被定义在了外部样式表中，不能直接用ele.transform获取。目前采用的方法获得的是一个矩阵，要再转换一下

        var directionNext='';
        var text=input.value.toUpperCase();
        switch (text){
            case "GO":
                blockGO(position,direction,0,true);
                break;
            case "TUN LEF":
                blockGO(position,direction,-90,false);
                break;
            case "TUN RIG":
                blockGO(position,direction,90,false);
                break;
            case "TUN BAC":
                blockGO(position,direction,180,false);
                break;

        }


    });
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

    //蜘蛛侠前进和方向控制的函数
    //@param position[left,top]:蜘蛛侠目前所在的位置
    //@param direction: 蜘蛛侠目前的朝向
    //@param angle: 蜘蛛侠要转的角度
    //@param ifMove：蜘蛛侠是否要移动一格
    //@param moveDirection：是否指定蜘蛛侠移动的方向

    function blockGO(position,direction,angle,ifMove,moveDirection) {
        //当即需要转向又需要移动时
        if( angle !=0 ){
            direction = direction + angle;
            head.style.transform="rotate("+direction+"deg)";
        }
        if(ifMove){
            var moveDirection=direction % 90; //0上，1右，2下，3左
            switch (moveDirection){
                case 0:
                    if(position[1]>32){
                        head.style.top=(position[1]-32)+'px';
                    }
                    break;
                case 1:
                    if(position[0]<320){
                        head.style.left=(position[0]+32)+'px';
                    }
                    break;
                case 2:
                    if(position[1]<320){
                        head.style.top=(position[1]+32)+'px';
                    }
                    break;
                case 3:
                    if (position[0]>32){
                        head.style.left=(position[0]-32)+'px';
                    }
            }
        }
    }



//确定当前小方块所在位置
    function index(target) {
        var tr=target.parentNode;
        var row=parseInt(tr.firstElementChild.innerText);
        var td=childElementNode(tr);
        var column=Array.prototype.indexOf.call(td,target);
        return [column,row];
    }

//返回父元素的所有元素类型的子元素
    function childElementNode(parentNode) {
        return Array.prototype.filter.call(parentNode.childNodes,function (ele) {
            return (ele.nodeType==1)
        });
    }
    //确定小方块新的方向
    function changeDirection(direction,num) {
        var directionArray=['top','right','bottom','left'];
        var directionNow=directionArray.indexOf(direction);
        var directionNext=directionNow+num;
        if(directionNext>3){
            directionNext=directionNext-4;
        }else if(directionNext<0){
            directionNext=directionNext+4;
        }
        return directionArray[directionNext];
    }
}
init();
