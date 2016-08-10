/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
 var city=document.getElementById("aqi-city-input");
 var myCity=city.value;

 for (var i=0;i<myCity.length; i++){
 	var str=myCity.charCodeAt(i);
 	if( str<65 || (str>90 && str<97) || (str>122&&str<255)){
 			alert('城市名必须为中英文字符');
 			return;
 	}
 }

 myCity=myCity.trim();

 var value=document.getElementById("aqi-value-input");
 var myValue=value.value;
 for (var j=0; j<myValue.length; j++){
 	var str=myValue.charCodeAt(j);
 	if( str<48 || str>57){
 		alert('空气质量指数必须为整数');
 		return;
 	}
 }

 myValue=myValue.trim();

 aqiData[myCity]=myValue;

}


/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
 var table=document.getElementById("aqi-table");
 table.innerHTML='';
 for (var city in aqiData){
 	var newtr=document.createElement("tr");
 	var newtb1=document.createElement('td');
 	newtb1.innerText=city;
 	newtr.appendChild(newtb1);
 	var newtb2=document.createElement("td");
 	newtb2.innerText=aqiData[city];
 	newtr.appendChild(newtb2);
 	var newtb3=document.createElement("button");
 	newtb3.innerText="删除";
 	newtr.appendChild(newtb3);
 	table.appendChild(newtr);
 }
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(target) {
  // do sth.
  // var city=this.previousSibling().previousSibling().innerText;
  // delete aqiData[city];
  // renderAqiList();

    var tr = target.parentElement;
    var strCity = tr.children[0].innerHTML;
    delete aqiData[strCity];
    renderAqiList();

}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
 
  	var btn = document.getElementById("add-btn");
  	btn.onclick = function(){
  	addBtnHandle();
 	}
 	// var btndel = document.getElementById("aqi-table").getElementsByTagName("button");
  // 	for(var mybtn in btndel){
  // 		btndel[mybtn].onclick=function(){
  // 			delBtnHandle();
  // 		}
  // 	}
  	var table = document.getElementById("aqi-table");
  	table.addEventListener("click", function(e) {
        if (e.target && e.target.nodeName.toLowerCase() === "button") {
        	
            delBtnHandle(e.target);
        }
    })



  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
 
}

init();