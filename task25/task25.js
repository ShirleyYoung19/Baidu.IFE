
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
Tree.prototype.add=function(){

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
                var node=ele.getElementsByClassName("title")[0];

                        if(node.textContent==text){
                            find=true;
                            node.style.color="red";
                            var parent=node.parentNode.parentNode.parentNode;
                            parent.firstElementChild.firstElementChild.className="openmenu";
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

    //定义点击事件
    var nodes=tree.root.getElementsByTagName("label");
    Array.prototype.map.call(nodes,function(ele){
        AddEvent(ele,"click",function(e){
            if(e.target.className!="addicon"&&e.target.className!="deleteicon"){
                var parent=ele.parentNode;
                if(parent.firstElementChild.firstElementChild.className=="openmenu"){
                    parent.firstElementChild.firstElementChild.className="closemenu";
                    Array.prototype.map.call(parent.children,function (ele1) {
                        if(ele1.tagName=="DIV"){
                            ele1.className="nodeinvisible";
                        }
                    })
                }else if(parent.firstElementChild.firstElementChild.className=="closemenu"){
                    parent.firstElementChild.firstElementChild.className="openmenu";
                    Array.prototype.map.call(parent.children,function (ele1) {
                        if(ele1.tagName=="DIV"){
                            ele1.className="nodevisible";
                        }
                    })
                }
            }

        })
    })
}
init();


