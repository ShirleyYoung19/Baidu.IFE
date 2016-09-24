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
    //获取表格中tbody元素
    var tbody=document.getElementsByTagName('tbody')[0];
    //获取tbody下面的所有tr元素
    var tr=childElementNode(tbody);

    addHandler(btn,'click',function () {
        var targetNow=document.getElementsByClassName('target')[0];
        var div=targetNow.firstElementChild;
        var direction=div.className;
        var directionNext='';
        var text=input.value;
        if(text==='GO'){
            blockGO(targetNow);
        }else{
            if(text==='TUN LEF'){
                directionNext=changeDirection(direction,-1);
            }else if(text==='TUN RIG'){
                directionNext=changeDirection(direction,1);
            }else if(text==='TUN BAC'){
                directionNext=changeDirection(direction,2);
            }
            div.className=directionNext;
        }

    });

//让小方块前进的函数
    function blockGO(targetNow) {
        var position=index(targetNow);
        var column=position[0];
        var row=position[1];
        var div=targetNow.firstElementChild;
        var direction=div.className;
        switch (direction){
            case 'left' :
                if( column > 1){
                    column--;
                }
                break;
            case 'right' :
                if( column <10 ){
                    column++;
                }
                break;
            case  'top' :
                if ( row > 1 ){
                    row--;
                }
                break;
            case 'bottom' :
                if ( row < 10){
                    row ++
                }
                break;
            default:
                break;
        }
        //将原来的td的className去掉
        targetNow.className='';
        targetNow.innerHTML='';

        //获得新的td,首先获取新的tr行
        var trTarget = tr[row-1];
        // 获取tr行的所有td元素
        var tdTarget=childElementNode(trTarget)[column];
        tdTarget.className='target';
        tdTarget.appendChild(div);
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
