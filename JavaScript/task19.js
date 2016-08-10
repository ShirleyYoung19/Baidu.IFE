/**
 * Created by lizhenyu on 16/7/19.
 */
function AddEvent(element, event,listener){
    if(element.addEventListener){
        element.addEventListener(event,listener,false);
    }
    else if(element.attachEvent){
        element.attachEvent("on"+event,listener);
    }
    else{
        element["on"+event]=listener;
    }
}

function $(id) {
    return document.getElementById(id);
}

window.onload = function () {
    var dataShow=$("container");
    var inputData=$("inputdata");
    var leftInput=$("leftinput");
    var rightInput=$("rightinput");
    var leftDelete=$("leftdelete");
    var rightDelete=$("rightdelete");
    var pop=$("pop");
    var randomBtn=$("random");
    var queue ={
        str: [],
        leftPush: function(num){
            if(this.str.length<60){
                this.str.unshift(num);
                this.render();
            }else{
                alert('队列中已有60个元素');
            }


        },
        rightPush: function(num){
            if(this.str.length<60){
                this.str.push(num);
                this.render();
            }else{
                alert('队列中已有60个元素');
            }

        },
        isEmpty: function(){
            return (this.str.length==0);
        },
        leftPop: function () {
            if(!this.isEmpty()){
                alert(this.str.shift());
                this.render();
            }else {
                alert("队列已为空");
            }
        },
        rightPop: function () {
            if(!this.isEmpty()){
                alert(this.str.pop());
                this.render();
            }else{
                alert("队列已为空");
            }
        },
        render: function(){
             dataShow.innerHTML="";
            this.str.map(function(e){
                var newdiv=document.createElement("div");
                newdiv.className="databox";
                newdiv.style.height=e+"px";
                dataShow.appendChild(newdiv);
            });
        }
    };
    AddEvent(leftInput,"click",function(){
        var input=inputData.value;
        if((input>=10 && input<=100 )){
            queue.leftPush(input);
        }else{
            alert("请输入10-100之间的整数");
        }
    });
    AddEvent(rightInput,"click",function () {
        var input=inputData.value;
        if((input>=10 && input<=100 )){
            queue.rightPush(input);
        }else{
            alert("请输入10-100之间的整数");
        }
    });
    AddEvent(leftDelete,"click",function(){
        queue.leftPop();
    });
    AddEvent(rightDelete,"click",function () {
        queue.rightPop();
    });
    AddEvent(dataShow,"click",function(e){
        if(e.target&&e.target.nodeName.toLowerCase()=="div"){
            remove(e.target);
        }
    });
    function remove(element){
        var index=[].indexOf.call(element.parentNode.children,element);
        queue.str.splice(index,1);
        queue.render();
    }

    // 添加冒泡排序的按钮点击事件

    AddEvent(pop, "click", function(){
        popMethod();
    });

    //添加随机数组按钮

    AddEvent(randomBtn,"click",function () {
        queue.str=randomStr(queue.str);
        queue.render();
    })

    // 定义冒泡排序函数

    function popMethod(){

        var i=0;k=0;num=0;delay=10;
        var timer;
        timer=setInterval(run,delay);
        function run() {
            if(i==queue.str.length   ){
                clearInterval(timer);
            }else{
                if(queue.str[k]>queue.str[k+1]){
                    num=queue.str[k];
                    queue.str[k] = queue.str[k + 1];
                    queue.str[k + 1] = num;
                    queue.render();
                }
                k++;
                if(k==queue.str.length-i-1){
                    i++;
                    k=0;
                }
            }

        }

    }

    function randomStr(arr){
        arr=[];
        for (var i=0;i<60;i++){
            arr[i]=Math.ceil(Math.random()*100);
            if(arr[i]<10){
                arr[i]=10;
            }
        }
        return arr;
    }


};
