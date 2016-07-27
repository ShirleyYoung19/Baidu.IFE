/**
 * Created by ShirleyYang on 16/7/26.
 */


//定义constructorTree
//nodes是从html文件中获得的
function Tree(nodes){
    this.nodes=nodes;
    this.root=nodes[0];
}

//定义Tree的方法
// Depth-first Traverse PreOrder
Tree.prototype.traverseDFPre=function (callback) {
    (
        function recurse(currentNode){
            callback(currentNode);
            for(var i=0;i<currentNode.childNodes.length;i++)
            {
                if(currentNode.childNodes[i].nodeType==1){
                    recurse(currentNode.childNodes[i]);
                }
            }
        }
    )(this.root)
};
// Depth-first Traverse PostOrder
Tree.prototype.traverseDFPost=function (callback) {
    (
        function recurse(currentNode){

            for(var i=0;i<currentNode.childNodes.length;i++)
            {
                if(currentNode.childNodes[i].nodeType==1){
                    recurse(currentNode.childNodes[i]);
                }
            }
            callback(currentNode);
        }
    )(this.root)
};
//breadth-first Traverse
Tree.prototype.traverseBF=function(callback) {
    var queue=new Queue();
    queue.enqueue(this.root);
    var currentNode=queue.dequeue();
    while(currentNode){
        for(var i=0;i<currentNode.childNodes.length;i++){
            if(currentNode.childNodes[i].nodeType==1){
                queue.enqueue(currentNode.childNodes[i]);
            }
        }
        callback(currentNode);
        currentNode=queue.dequeue();
    }
};

//定义constructor Queue
function Queue(){
    var item=[];
    this.enqueue=function(ele){
        item.push(ele);
    };
    this.dequeue=function () {
        return item.shift();
    };
}
ongoing=false;
//定义改变颜色的函数
function changeColor(){
    var i=0;
    var timer=setInterval(function(){

       if(i==0){
           dataList[i].style.backgroundColor="#f5b67b";
           ongoing=true;
       }else if(i>0&&i<dataList.length){
           dataList[i].style.backgroundColor="#f5b67b";
           dataList[i-1].style.backgroundColor="";
       }else {
           dataList[i-1].style.backgroundColor="";
       }
        if(i==dataList.length){
            clearInterval(timer);
            ongoing=false;
            dataList=[];
        }
        i++;
    },1000);
}

//定义方便获取元素的两个函数
function $(tagName){
    return document.getElementsByTagName(tagName);
}
function $$(id){
    return document.getElementById(id);
}

//定义事件注册函数
function AddEvent(element,event,listener) {
    if(element.addEventListener){
        element.addEventListener(event,listener);
    }else if(element.attachEvent){
        element.attachEvent('on'+event,listener);
    }else{
        element['on'+event]=listener;
    }
}
//定义一个数组存储查询到的元素
var dataList=[];
function init(){
    AddEvent($$("depthfirstpre"),"click",function(){
        var tree=new Tree($("div"));
        if(ongoing==false){
            tree.traverseDFPre(function (ele) {
                dataList.push(ele);
            });
            console.log(dataList);
            changeColor();
        }else{
            alert("正在遍历中,请结束后再选择遍历方法");
        }
    });
    AddEvent($$("depthfirstpost"),"click",function(){
        var tree=new Tree($("div"));
        if(ongoing==false){
            tree.traverseDFPost(function (ele) {
                dataList.push(ele);
            });
            console.log(dataList);
            changeColor();
        }else{
            alert("正在遍历中,请结束后再选择遍历方法");
        }
    });
    AddEvent($$("breadthfirst"),"click",function(){
        var tree=new Tree($("div"));
        if(ongoing==false){
            tree.traverseBF(function (ele) {
                dataList.push(ele);
            });
            console.log(dataList);
            changeColor();
        }else{
            alert("正在遍历中,请结束后再选择遍历方法");
        }

    })

}
init();