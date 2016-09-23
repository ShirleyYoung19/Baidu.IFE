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

var input=document.getElementsByTagName('input')[0];
var btn=document.getElementsByTagName('button')[0];

addHandler(btn,'click',function () {
    if(input.value==='GO'){
        blockGO();
    }
});

function blockGO() {
    var targetNow=document.getElementsByClassName('target')[0];
    var column=index(targetNow)[0];
    var row=index(targetNow)[1];
    var div=targetNow.firstChild;
}

//确定当前小方块所在位置
function index(target) {
    var tr=target.parentNode;
    var row=tr.firstElementChild.innerText;
    var td=Array.prototype.filter.call(tr.childNodes,function (ele) {
        return (ele.nodeType==1)
    });
    var column=Array.prototype.indexOf.call(td,target);
    return [column,row];
}