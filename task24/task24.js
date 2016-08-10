/**
 * Created by ShirleyYang on 16/7/28.
 */
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
//定义原型的查找函数
Tree.prototype.contain=function (callback,traverse) {
    traverse.call(this,callback);
};
Tree.prototype.add=function(txt,parentNode,traverse){
    var node=document.createElement("div");
    node.textContent=txt;

    var callback=function (ele) {
        if(ele==parentNode){
            ele.appendChild(node);
        }
    };
    this.contain(callback,traverse);
};
Tree.prototype.delete=function (node,traverse) {
    var parentNode=node.parentNode;
    var callback=function(ele){
        if(ele==node){
            parentNode.removeChild(ele);
        }
    };
    this.contain(callback,traverse);
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
//定义改变颜色的函数,txt为输入查询的内容
function changeColor(txt){
    var i=0;
    var k=0;
    var timer=setInterval(function(){

        if(i==0){
            if(dataList[i].firstChild.textContent.trim()==txt){
                dataList[i].style.backgroundColor="#f5b67b";
                k=1;
            }else{
                dataList[i].style.backgroundColor="#a9cfec";
            }
            ongoing=true;
        }else if(i>0&&i<dataList.length) {
            if (dataList[i].firstChild.textContent.trim() == txt) {
                dataList[i].style.backgroundColor = "#f5b67b";
                k=1;
            } else {
                dataList[i].style.backgroundColor = "#a9cfec";
            }
            if (dataList[i - 1].firstChild.textContent.trim() != txt) {
                dataList[i - 1].style.backgroundColor = "";
            }
        }
        if(i==dataList.length){
            if (dataList[i - 1].firstChild.textContent.trim() != txt) {
                dataList[i - 1].style.backgroundColor = "";
            }
            clearInterval(timer);
            ongoing=false;
            if(k==0&&txt){
                alert("未找到该元素")
            }
            dataList=[];
        }
        i++;
    },500);
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
var tree=new Tree($("div"));
var targetNode;
function init(){

    AddEvent($$("search1"),"click",function(){
        if(ongoing==false){
            if($$("inputtxt").value){
                tree.contain(function(ele){
                    dataList.push(ele);
                },tree.traverseDFPre);
                dataList.map(function (ele) {
                    ele.style.backgroundColor="";
                });
                changeColor($$("inputtxt").value);
            }else{
                alert("请输入查询内容")
            }

        }else{
            alert("正在遍历中,请结束后再选择遍历方法");
        }
    });
    AddEvent($$("search2"),"click",function(){
        if(ongoing==false){
            if($$("inputtxt").value){
                tree.contain(function(ele){
                    dataList.push(ele);
                },tree.traverseDFPost);
                dataList.map(function (ele) {
                    ele.style.backgroundColor="";
                });
                changeColor($$("inputtxt").value);
            }else{
                alert("请输入查询内容")
            }

        }else{
            alert("正在遍历中,请结束后再选择遍历方法");
        }
    });
    AddEvent($$("search3"),"click",function(){

        if(ongoing==false){
            if($$("inputtxt").value){
                tree.contain(function(ele){
                    dataList.push(ele);
                },tree.traverseBF);
                dataList.map(function (ele) {
                    ele.style.backgroundColor="";
                });
                changeColor($$("inputtxt").value);
            }else{
                alert("请输入查询内容")
            }

        }else{
            alert("正在遍历中,请结束后再选择遍历方法");
        }
    });
    var layer1=document.getElementsByClassName("layer1")[0];
    AddEvent(layer1,"click",function(e){
        for(var i=0;i<$("div").length;i++){
            $("div")[i].style.backgroundColor="";
        }
        e.target.style.backgroundColor="#72b12a";
        targetNode=e.target;
    });
    //对删除按键添加事件
    AddEvent($$('deletebtn'),'click',function(){

        if(targetNode){
            tree.delete(targetNode,tree.traverseBF);
        }else{
            alert("请鼠标单击选择删除节点");
        }
    })
    //对添加按键注册事件
    AddEvent($$("addbtn"),"click",function(){
        var text=$$("add").value;
        if(text&&targetNode){
            tree.add(text,targetNode,tree.traverseBF);
        }else if(text){
            alert("请请鼠标单击选择添加节点的位置");
        }else{
            alert("请输入节点文本");
        }
    })
}
init();