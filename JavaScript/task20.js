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
        this.str=this.str.concat(txtarr);
    },
    render:function () {
        $("container").innerHTML='';
        for(var i=0; i<this.str.length; i++){
            var newdiv=document.createElement("div");
            var newtext=document.createTextNode(this.str[i]);
            newdiv.appendChild(newtext);
            newdiv.className="tagdiv";
            $("container").appendChild(newdiv);
        }

    },
    search:function(txt){
        var divarr=document.getElementsByClassName("tagdiv");
        for(var i=0;i<this.str.length;i++){

                var k=this.str[i].indexOf(txt);
                var indexnum=[];
                //判断是不是包含txt,若包含的话,首先确定是包含几个,分别记录下对应的位置
                if(k>=0){
                    indexnum[0]=k;
                    var num=0;
                    while(((k+txt.length)<=this.str[i].length)){
                        if(this.str[i].indexOf(txt,k+txt.length)>0){
                            k=this.str[i].indexOf(txt,k+txt.length);
                            num++;
                            indexnum[num]=k;
                        }else{
                            k=this.str[i].length+1;
                        }
                    }
                    //然后对这个元素进行处理
                    var strtarget=divarr[i].textContent;
                    divarr[i].innerHTML='';
                    var divinner="";
                    var num2=0; //记录str被分成了几段
                    var num3=0; //记录调用第几个索引位置
                    var strtargetArr=[];
                    //@表示不匹配文字段,*表示匹配文字段,可能是(@)*(@)*(@)*(@)的模式,首先对第一个组(@)*处理
                    if(indexnum[num3]>0){
                        strtargetArr[num2]=strtarget.substring(0,indexnum[num3]);
                        divinner+=strtargetArr[num2];
                        num2++;
                    }
                    strtargetArr[num2]=txt;
                    divinner+='<span class="searchout">'+txt+'</span>';
                    num2++;
                    num3++;
                    //处理中间的(@)*
                    while(num3<indexnum.length){
                        if((indexnum[num3]-(indexnum[num3-1]+txt.length))>0){
                            strtargetArr[num2]=strtarget.substring(indexnum[num3-1]+txt.length,indexnum[num3]);
                            divinner+=strtargetArr[num2];
                            num2++;
                        }
                        strtargetArr[num2]=txt;
                        divinner+='<span class="searchout">'+txt+'</span>';
                        num2++;
                        num3++;
                    }
                    //处理最后一个(@)
                    if(indexnum[num3-1]+txt.length<strtarget.length){
                        strtargetArr[num2]=strtarget.substring(indexnum[num3-1]+txt.length,strtarget.length+1);
                        divinner+=strtargetArr[num2];
                    }

                    divarr[i].innerHTML=divinner;

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

AddEvent($("search"),"click",function () {
    var searchtxt=$("searchinput").value;
    if(searchtxt){
        tag.render();
        tag.search(searchtxt);
    }else{
        alert("请输入查询内容")
    }

});