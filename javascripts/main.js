console.log('This would be the main JS file.');
window.onload=function(){
    _init();
};
function _init(){
    var ul = document.getElementById("uldemo4js");
    for(i=13;i<=20;i++)
    {
        var task_name = "task"+i;
        var task_path = "html/"+task_name+".html";
        var li = "<li><a href='"+task_path+"'>"+task_name+"</a></li>";
        ul.innerHTML+=li;
    }
    for(i=21;i<=36;i++)
    {
        var task_name = "task"+i;
        var task_path = task_name+"/"+task_name+".html";
        var li = "<li><a href='"+task_path+"'>"+task_name+"</a></li>";
        ul.innerHTML+=li;
    }
    console.log(ul);

}
