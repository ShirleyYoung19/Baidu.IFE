/**
 * Created by Shirley Yang on 16/7/24.
 */
function AddEvent(element, event, listener){
    if(element.addEventListener){
        element.addEventListener(event,listener);
    }else if(element.attachEvent){
        element.attachEvent("on"+event,listener);
    }else{
        element["on"+event]=listener
    }
}
function $(id){
    return document.getElementById(id);
}
function ShowDiv(id) {
    this.strArr=[];
    this.targetdiv=$(id);
    this.insert=function(txt){
        var newArr=txt.split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/).filter(function(str){
            return (str!=null&&str.length>0);
        });
        for(var i=0; i<newArr.length; i++){
            if(this.strArr.length===0){
                this.strArr.push(newArr[i].trim());
            }else{
                if(this.strArr.indexOf(newArr[i])<0){
                    if(this.strArr.length<10){
                        this.strArr.push(newArr[i].trim());
                    }else{
                        this.strArr.shift();
                        this.strArr.push(newArr[i].trim());
                    }
                }
            }
        }
    };
    this.render=function () {
        this.targetdiv.innerHTML="";
        var innerDiv="";
        this.strArr.map(function (str) {
            innerDiv+="<div class='datashow'>"+str+"</div>"
        });
        this.targetdiv.innerHTML=innerDiv;
    }
}


var tag= new ShowDiv("tagout");
tag.mouseover=function (element) {
    var txt=element.textContent;
    txt="点击删除"+txt;
    element.textContent=txt;
    element.className="datawarning";
};
tag.mouseout=function (element) {
    var txt=element.textContent;
    txt=txt.substr(4);
    element.textContent=txt;
    element.className="datashow";
};
var hobby = new ShowDiv("hobbyout");




//为Tag输入框注册事件;
AddEvent($("taginput"),"keyup",function(e){
    if(e.keyCode==13||(/(，| |\,)$/.test($("taginput").value))){
        var tagtxt=$("taginput").value;
        tagtxt=tagtxt.trim();
        tag.insert(tagtxt);
        tag.render();
        $("taginput").value="";
    }
});

AddEvent($("hobbybtn"),"click",function(){
    var hobbytxt=$("hobbyinput").value;
    hobby.insert(hobbytxt);
    hobby.render();
    $("hobbyinput").value="";
});

AddEvent($("tagout"),"mouseover",function(e){
    if(e.target&&e.target.className=="datashow"){
        tag.mouseover(e.target);
    }
});
AddEvent($("tagout"),"mouseout",function(e){
    if(e.target&&e.target.className=="datawarning"){
        tag.mouseout(e.target);
    }
});
AddEvent($("tagout"),"click",function(e){
    if(e.target&&e.target.className=="datawarning"){
        var str=e.target.textContent;
        str=str.substr(4);
        var indexnum=tag.strArr.indexOf(str);
        tag.strArr.splice(indexnum,1);
        tag.render();
    }
});