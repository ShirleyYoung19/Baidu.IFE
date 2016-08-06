/**
 * Created by ShirleyYang on 16/8/6.
 */
//title:目标行的名称
//input:目标行的input元素
//message:目标行的p元素
function FormConfirm(title,expression) {
    this.input=document.getElementById(title);
    var password;

    this.addEvent=function () {
        this.input.addEventListener('blur',function (e) {
            if(passWord){
                password=passWord.input.value
            }
            var message=this.nextElementSibling;
            if(this.value){
                if(expression.test(this.value)){
                    if(title=="passwordconfirm"&&password){
                        if(password==this.value){
                            message.textContent=hint[title][2];
                            message.style.display="block";
                            message.style.color="green";
                            this.style.borderColor="green";
                            hint[title][3]=1;
                        }else{
                            message.textContent=hint[title][1];
                            message.style.display="block";
                            message.style.color="red";
                            this.style.borderColor="red";
                            hint[title][3]=0;
                        }
                    }else{
                        message.textContent=hint[title][2];
                        message.style.display="block";
                        message.style.color="green";
                        this.style.borderColor="green";
                        hint[title][3]=1;
                    }
                }else{
                    message.textContent=hint[title][1];
                    message.style.display="block";
                    message.style.color="red";
                    this.style.borderColor="red";
                    hint[title][3]=0;
                }
            }else{
                message.textContent=hint[title][0];
                message.style.display="block";
                message.style.color="red";
                this.style.borderColor="red";
                hint[title][3]=0;
            }
        })
    }

}

var hint={
    username:["姓名不能为空","长度为4到16个字符","姓名格式正确",0],
    password:["密码不能为空","长度为6到16个字母或数字","密码格式正确",0],
    passwordconfirm:["请再次输入密码","与密码输入应一致,长度为6到16个字母或数字","密码验证正确",0],
    email:["邮箱不能为空","邮箱格式应输入正确,例如example@aa.ccc","邮箱格式正确",0],
    phonenumber:["手机号码不能为空","手机格式不正确,请输入11位数字","手机格式正确",0]
};
var userName=new FormConfirm("username",/^.{4,16}$/);
userName.addEvent();
var passWord=new FormConfirm("password",/^[\dA-Za-z]{6,16}$/);
passWord.addEvent();
var passWordConfirm=new FormConfirm("passwordconfirm",/^[\dA-Za-z]{6,16}$/);
passWordConfirm.addEvent();
var email=new FormConfirm("email",/^[\dA-Za-z_]+@[\dA-Za-z_]+\.[\dA-Za-z_]+$/);
email.addEvent();
var phoneNumber=new FormConfirm("phonenumber",/^[\d]{11}$/);
phoneNumber.addEvent();

var btn=document.getElementsByClassName("confirmbutton")[0];
btn.addEventListener("click",function(){
    var test=[];
    var i=0;
    for( var title in hint){
        test[i]=hint[title][3];
        i++;
    }
    var result=test.every(function (item) {
        return item==1
    });
    if(result){
        alert("表格填写正确")
    }else{
        alert("表格填写错误")
    }
});