/* 数据格式演示
 var aqiSourceData = {
 "北京": {
 "2016-01-01": 10,
 "2016-01-02": 10,
 "2016-01-03": 10,
 "2016-01-04": 10
 }
 };
 */

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
    var y = dat.getFullYear();
    var m = dat.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = dat.getDate();
    d = d < 10 ? '0' + d : d;
    return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
    var returnData = {};
    var dat = new Date("2016-01-01");
    var datStr = '';
    for (var i = 1; i < 92; i++) {
        datStr = getDateStr(dat);
        returnData[datStr] = Math.ceil(Math.random() * seed);
        dat.setDate(dat.getDate() + 1);
    }
    return returnData;
}

var aqiSourceData = {
    "北京": randomBuildData(500),
    "上海": randomBuildData(300),
    "广州": randomBuildData(200),
    "深圳": randomBuildData(100),
    "成都": randomBuildData(300),
    "西安": randomBuildData(500),
    "福州": randomBuildData(100),
    "厦门": randomBuildData(100),
    "沈阳": randomBuildData(500)
};

var color=['#16324a', '#24385e', '#393f65', '#4e4a67', '#5a4563', '#b38e95',
    '#edae9e', '#c1b9c2', '#bec3cb', '#9ea7bb', '#99b4ce', '#d7f0f8'];

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
    nowSelectCity: '北京',
    nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart() {
    var propNames=Object.keys(chartData);
    var dataNum=propNames.length;
    var charWrap=document.getElementsByClassName("aqi-chart-wrap")[0];
     charWrap.innerHTML="";
    var width=charWrap.clientWidth*0.99;
    var length=Math.floor(width/dataNum/2);
    var newinner='';
    for(var i=0; i<propNames.length;i++){
        var newdiv=document.createElement("div");
        newdiv.style.width=length+"px";
        newdiv.style.float="left";
        if(i===0){
            newdiv.style.marginLeft=Math.ceil((width-length*(dataNum*2-1))/2)+'px';
        }else{
            newdiv.style.marginLeft=length;
        }
        newdiv.style.background=color[Math.floor(Math.random()*10)];
        newdiv.style.height=chartData[propNames[i]]+'px';

        newdiv.title=propNames[i]+"AQI:"+chartData[propNames[i]];
        charWrap.appendChild(newdiv);

    }
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(target) {
    // 确定是否选项发生了变化

    //var garTime=document.getElementById('form-gra-time').getElementsByTagName('input');
   // for(var i=0; i<garTime.length; i++){
   //     if(garTime[i].checked){
   //         var selectTimeNew=garTime.value;
   //     }
    //}
    if (pageState.nowGraTime===target.value){
        return;
    }
    else{
        // 设置对应数据
        pageState.nowGraTime=target.value;
        initAqiChartData();
        // 调用图表渲染函数
        renderChart();

        }

}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
    // 确定是否选项发生了变化
    var citySelected=document.getElementById("city-select").value;
    if(citySelected===pageState.nowSelectCity){
        return;
    }else{
        pageState.nowSelectCity=citySelected;
        // 设置对应数据
        initAqiChartData();
        // 调用图表渲染函数
        renderChart();

    }

}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
    var graTime = document.getElementById("form-gra-time");
    graTime.addEventListener("click", function (e) {
        if (e.target && e.target.nodeName.toLowerCase() === "input") {
            graTimeChange(e.target);
        }
    });
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
    // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
    var citySelector=document.getElementById("city-select");
    for(var city in aqiSourceData){
        if(city!="北京"){
            var cityNew=document.createElement("option");
            cityNew.textContent=city;
            citySelector.appendChild(cityNew);
        }
    }

    // 给select设置事件，当选项发生变化时调用函数citySelectChange
    citySelector.addEventListener("change",citySelectChange);

}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
    // 将原始的源数据处理成图表需要的数据格式
    var nowSelectCity=pageState.nowSelectCity;
    var nowGraTime=pageState['nowGraTime'];
    switch(nowGraTime){
        case 'day':
            chartData={};
            chartData=aqiSourceData[nowSelectCity];
            break;
        case 'week':
            chartData={};
            var weekNumber=1;
            var weeksum=0;
            var weekDayNum=0;
            var prop="";
            var month=1;
            for(var day in aqiSourceData[nowSelectCity]){
                var myday= new Date(day);
                if(myday.getDate()===1){
                    if(myday.getMonth()===0){
                        if(myday.getDay()===0){
                            weeksum += aqiSourceData[nowSelectCity][day];
                            weekDayNum++;
                            prop=(myday.getMonth()+1)+'月第'+weekNumber+'周';
                            chartData[prop]=+Math.ceil(weeksum/weekDayNum);
                            weeksum=0;
                            weekDayNum=0;
                            weekNumber++;
                        }else {
                            weeksum +=aqiSourceData[nowSelectCity][day];
                            weekDayNum ++;
                        }
                    }else {
                        if(myday.getDay===1) {
                            weeksum += aqiSourceData[nowSelectCity][day];
                            weekDayNum++;
                        }else{
                            weeksum += aqiSourceData[nowSelectCity][day];
                            weekDayNum++;
                            prop=(myday.getMonth())+'月第'+weekNumber+'周';
                            chartData[prop]=+Math.ceil(weeksum/weekDayNum);
                            weeksum=0;
                            weekDayNum=0;
                            weekNumber=1;
                        }
                    }

                }else {
                    if(myday.getDay()===0){
                        weeksum += aqiSourceData[nowSelectCity][day];
                        weekDayNum++;
                        prop=(myday.getMonth()+1)+'月第'+weekNumber+'周';
                        chartData[prop]=+Math.ceil(weeksum/weekDayNum);
                        weeksum=0;
                        weekDayNum=0;
                        weekNumber++;
                    }else{
                        weeksum +=aqiSourceData[nowSelectCity][day];
                        weekDayNum ++;
                    }
                }
                if (day=="2016-03-31"){
                    prop=(myday.getMonth()+1)+'月第'+weekNumber+'周';
                    chartData[prop]=+Math.ceil(weeksum/weekDayNum);
                }

            }
            break;
        case 'month':
            chartData={};
            var monthsum=[0,0,0];
            var monthday=[0,0,0];
            var prop;

            for (var day in aqiSourceData[nowSelectCity] ){
                var newday=new Date(day);
                if(newday.getMonth()===0){
                    monthsum[0] += aqiSourceData[nowSelectCity][day];
                    monthday[0]++;
                }
                if(newday.getMonth()===1){
                    monthsum[1] += aqiSourceData[nowSelectCity][day];
                    monthday[1]++;
                }
                if(newday.getMonth()===2){
                    monthsum[2] += aqiSourceData[nowSelectCity][day];
                    monthday[2]++;
                }
            }
            for (var k=0; k<3; k++){
                prop="2016年"+(k+1)+"月";
                chartData[prop]=Math.floor(monthsum[k]/monthday[k]);
            }
    }
    // 处理好的数据存到 chartData 中

}

/**
 * 初始化函数
 */
function init() {
    initGraTimeForm();
    initCitySelector();
    initAqiChartData();
    renderChart();
}

init();
