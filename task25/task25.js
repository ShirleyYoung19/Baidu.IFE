
/**
 * Created by ShirleyYang on 16/7/29.
 */
//设定构造函数Tree
var Tree=function(nodes){
    this.nodes=nodes;
    this.root=nodes[0];
};
Tree.prototype.traverseBF=function(callback){
    var queue=new Queue();
    queue.enqueue(this.root);
    var currentNode=queue.dequeue();
    while(currentNode){
        for(var i=0;i<currentNode.children.length;i++){
            if(currentNode.children[i].tagName=="DIV"){
                queue.enqueue(currentNode.children[i])
            }
        }
        callback(currentNode);
        currentNode=queue.dequeue();
    }
};
Tree.prototype.contain=function(callback,traverse){
    traverse.call(this,callback);
};

//定义构造函数Queue
var Queue=function () {
    var item=[];
    this.enqueue=function(ele){
        item.push(ele);
    };
    this.dequeue=function () {
        return item.shift();
    }
};

//定义通过class选择Nodelist的元素
function $(className) {
    return document.getElementsByClassName(className);
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
//定义全局变量
var tree=new Tree($("catalog")[0].getElementsByTagName("div"));
var text;
var find=false;
var output="";
var outNode=$("output")[0];

function init(){
//查询定义
    AddEvent($("searchbtn")[0],"click",function () {
        text=$("searchtxt")[0].value;
        if(text){
            find=false;
            tree.contain(function(ele){
                Array.prototype.map.call(ele.childNodes,function(node){
                    if(node.nodeType==3&&node.nodeValue){
                        if(node.nodeValue==text){
                            find=true;
                            var parent=node.parentNode;
                            parent.style.color="red";
                            parent=parent.parentNode;
                            parent.firstElementChild.className="openmenu";
                            Array.prototype.map.call(parent.childNodes,function(node1){
                                if(node1.tagName=="DIV"){
                                    node1.className="nodevisible";
                                }
                            });
                            while(parent.parentNode!=tree.root){
                                parent.className="nodvisible";
                                parent.firstElementChild.className="openmenu";
                                parent=parent.parentNode;
                            }
                        }
                    }
                })
            },tree.traverseBF);
            if(find==false){
                output="没有查询到匹配的节点";
                outNode.innerHTML=output;
            }
        }else{
            output="请输入查询内容";
            outNode.innerHTML=output;
        }
    });

    //定义鼠标进入元素事件
    AddEvent(tree.root,"mouseover",function(e){
        var node=e.target;
        if(node.nodeType==3&&node.getElementsByClassName("addicon")[0]==undefined){
            var divNode=node.getElementsByTagName("div")[0];
            var addNode=document.createElement("span");
            addNode.className="addicon";
            addNode.textContent="添加";
            var deleteNode=document.createElement("span");
            deleteNode.className="deleteicon";
            deleteNode.textContent="删除";
            if(node==tree.root){
                node.insertBefore(addNode,divNode);
            }else{
                node.insertBefore(deleteNode,divNode);
                node.insertBefore(addNode,deleteNode);
            }
        }

    });
    //定义鼠标离开元素事件
    AddEvent(tree.root,"mouseout",function(e){
        var node=e.target;
        if(node.getElementsByClassName("addicon")[0]){
            var addNode=node.getElementsByClassName("addicon")[0];
            var deleteNode=node.getElementsByClassName("deleteicon")[0];
            node.removeChild(addNode);
            node.removeChild(deleteNode);
        }
    });
    //定义点击事件
    AddEvent(tree.root,"click",function(e){
        var node=e.target;
        if(node.tagName!="DIV"){
            node=node.parentNode;
        }
        if(node.firstElementChild.className=="openmenu"){
            node.firstElementChild.className="closemenu";
            Array.prototype.map.call(node.childNodes,function(ele){
                if(ele.tagName=="div"){
                    ele.className="nodeinvisible";
                }
            })
        }
    });
}
init();


