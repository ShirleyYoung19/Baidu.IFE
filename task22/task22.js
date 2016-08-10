/**
 * Created by ShirleyYang on 16/7/25.
 */
//定义方便获取元素的两个函数
function $(tagName){
    return document.getElementsByTagName(tagName);
}
function $$(id){
    return document.getElementById(id);
}

//定义事件注册事件
function AddEvent(element,event,listener) {
    if(element.addEventListener){
        element.addEventListener(event,listener);
    }else if(element.attachEvent){
        element.attachEvent('on'+event,listener);
    }else{
        element['on'+event]=listener;
    }
}

var dataList=[];

//前序遍历
function preorder(ele) {
    if(ele!=null){
        dataList.push(ele);
        preorder(ele.firstElementChild);
        preorder(ele.lastElementChild);
    }
}

//中序遍历
function inorder(ele) {
    if(ele!=null){
        inorder(ele.firstElementChild);
        dataList.push(ele);
        inorder(ele.lastElementChild);
    }
}

//后序遍历
function postorder(ele) {
    if(ele!=null){
        postorder(ele.firstElementChild);
        postorder(ele.lastElementChild);
        dataList.push(ele);
    }
}

//定义改变颜色的函数
function changeColor() {
    var i=0;
    timer = setInterval(function () {
        if (i == 0) {
            dataList[i].style.backgroundColor = '#aaa';
        } else if (i > 0 && i < dataList.length) {
            dataList[i].style.backgroundColor = '#aaa';
            dataList[i - 1].style.backgroundColor = '';
        } else if (i == dataList.length) {
            dataList[i - 1].style.backgroundColor = '';
            clearInterval(timer);
            i=0;

            console.log("Finish");
        }
        i++;
    }, 1000);
}
var timer=null;
function reset() {
    dataList = [];
    clearInterval(timer);
    for(var i=0;i<$("div").length;i++){
        $("div")[i].style.backgroundColor="";
    }
}


//为按钮绑定事件
window.onload=function () {

    AddEvent($$("preorder"),"click",function(){
        reset();
        preorder($("div")[0]);
        changeColor();
    });
    AddEvent($$("inorder"),"click",function(){
        reset();
        inorder($("div")[0]);
        changeColor();
    });
    AddEvent($$("postorder"),"click",function(){
        reset();
        postorder($("div")[0]);
        changeColor();
    });


};

