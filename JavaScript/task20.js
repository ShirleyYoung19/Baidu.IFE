/**
 * Created by YangChaofan on 16/7/21.
 */
function $(id){
    return document.getElementById(id);
}
function AddEvent(element, event, listener){
    if(element.addEventListener){
        element.addEventListener(event,listener);
    }else if(element.attachEvent){
        element.attachEvent(event,listener);
    }else{
        element["on"+event]=listener;
    }
}

// 为按钮绑定事件


var txt;

var tag={
    str: [],
    insert: function (txt) {
        var txtarr=[];
        txt=txt.replace(/[^0-9a-zA-z\u4e00-\u9fa5]/g," ");
        txt=txt.trim();
        txtarr=txt.split(/\s+/);
        txtarr.map(function(str){
            str=str.trim();
        });
        this.str=txtarr;
    },
    render:function () {
        for(var i=0; i<this.str.length; i++){
            var newdiv=document.createElement("div");
            var newtext=document.createTextNode(this.str[i]);
            newdiv.appendChild(newtext);
            newdiv.className="tagdiv";
            $("container").appendChild(newdiv);
        }

    },
    search:function(txt){
        for(var i=0;i<this.str.length;i++){
            var k=this.str[i].indexOf(txt);
            if(k>=0){

            }
        }
    }
};

AddEvent($("insert"),"click",function () {
    var inputArea=$("input");
    txt=inputArea.value;
    if(txt){
        tag.insert(txt);
        tag.render();
    }
    else{
        alert("请输入标签");
    }

});