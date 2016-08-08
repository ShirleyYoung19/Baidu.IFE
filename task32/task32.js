/**
 * Created by ShirleyYang on 16/8/8.
 */

//获取id元素
function $(id) {
    if(id){
        return document.getElementById(id);
    }
    else {
        console.log(id+"is not exit");
    }
}
//对元素注册时间
function AddEvent(element,event,listener) {
    if(element.addEventListener){
        element.addEventListener(event, listener);
    }else{
        element.attachEvent('on'+event,listener);
    }
}
//定义全局变量
var formType=document.getElementsByClassName("type")[0];
var formConfig=document.getElementsByClassName("config")[0];
var rule=document.getElementsByClassName("rule")[0];
var formLength=document.getElementsByClassName("length")[0];
var formOption=document.getElementsByClassName("option")[0];
// 表单生成区域的控制
function init() {

    var typeInput=formType.getElementsByTagName("input");
    var name=$("name");
    var ruleInput=rule.getElementsByTagName('input');

    //控制显示的fieldset
    Array.prototype.forEach.call(typeInput,function (ele) {
        AddEvent(ele,'change',function () {

            //将配置中的名称设置为与选择的类型相同的数值
            name.value=ele.nextElementSibling.textContent;
            if(ele.value=="inputtext"){
                formOption.style.display="none";
                rule.style.display="block";
                formLength.style.display="block";
                //注意这个地方当选择了邮箱,再切换到文本域再次切换回来的时候要保证formLength不显示
                Array.prototype.forEach.call(ruleInput,function (ele) {
                    if(ele.checked&&(ele.value=="email"||ele.value=="phonenumber")){
                        formLength.style.display="none";
                    }
                })
            }else if(ele.value=="textarea"){
                rule.style.display="none";
                formOption.style.display="none";
                formLength.style.display="block";
            }else{
                formLength.style.display="none";
                rule.style.display="none";
                formOption.style.display="block";
            }
        });

    });

    //控制配置中的名称随着规则中选择的内容而改变
    Array.prototype.forEach.call(ruleInput,function (ele) {
        AddEvent(ele,'change',function () {
            formLength.style.display="block";
            name.value=ele.nextElementSibling.textContent;
            if(ele.value=="email"||ele.value=="phonenumber"){
                formLength.style.display="none";
            }
        })
    });

    //控制选项结果的输出,并将结果保存到一个全局作用域中
}
init();