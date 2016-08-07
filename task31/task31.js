/**
 * Created by ShirleyYang on 16/8/7.
 */
function $(id) {
    return document.getElementById(id);
}
var student=$("student");
var nonstudent=$("nonstudent");
var school=document.getElementsByClassName("school")[0];
var company=document.getElementsByClassName("company")[0];
student.addEventListener("change",function(){
    school.style.display="block";
    company.style.display="none";
});
nonstudent.addEventListener("change",function(){
    school.style.display="none";
    company.style.display="block";
});
var universityCity=["北京","上海","山东"];
var university=[["北京大学","清华大学"],["复旦大学","上海交通大学"],["山东大学","中国海洋大学"]]
var city=$("city");
var universityNode=$("university");
city.addEventListener("change",function () {
    var index=city.selectedIndex;
    universityNode.innerHTML="";
    for(var i=0; i<university[index].length;i++){
        var option=document.createElement("option");
        option.textContent=university[index][i];
        option.value=university[index][i];
        universityNode.appendChild(option);
    }
});