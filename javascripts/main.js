console.log('This would be the main JS file.');
var str = '',
    data = [
        [
            {title: '设计文档PSD转成HTML页面'},
            {url: 'html/task6.html', title: '公司主页实例1'},
            {url: 'html/task7.html', title: '公司主页实例2'},
            {url: 'html/task9.html', title: '后台管理页面'},
            {url: 'html/task8.html', title: '简单响应式设计页面'}
        ],
        [
            {title: '简单JS+CSS实现'},
            {url: 'html/task19.html', title: '冒泡排序的动画实现'},
            {url: 'task25/task25.html', title: '树形组件的实现（添加删除搜索）'},
            {url: 'task22/task22.html', title: '二叉树三种遍历的动画实现'},
            {url: 'task23/task23.html', title: '树的两种搜索方式的动画实现'},
            {url: 'task24/task24.html', title: '树的节点添加的动画实现'},
            {url: 'html/task17.html', title: '柱状统计的实现'},
            {url: 'html/task18.html', title: '队列的实现'},
            {url: 'html/task20.html', title: '标签的创建和查询'},
            {url: 'task30/task30.html', title: '带验证的输入框'},
            {url: 'task32/task32.html', title: '复杂规则的表单实现'}
        ],
        [
            {title: '复杂JS+CSS实现'},
            {url: 'task28/task28.html', title: '行星与飞船'},
            {url: 'task35/task35.html', title: '迷宫中的蜘蛛侠'}
        ]
    ];
for (var i = 0; i < data.length; i++) {
    var items = data[i];
    var sub = '';
    for (var j = 0; j < items.length; j++) {
        var son = items[j];
        if (j == 0) {
            sub += '<li><h1><a href="javascript:;" title="' + son.title + '">' + son.title + '</a></h1><dl class="sub-dl">';
        } else {
            sub += '<dd><a href="' + son.url + '" target="_blank" title="' + son.title + '">' + son.title + '</a></dd>';
        }
        if (j == items.length - 1) {
            sub += '</dl></li>';
        }
    }
    str += sub;
}
var ol = document.getElementById('ol');
ol.innerHTML = str;
var h1 = ol.getElementsByTagName('h1');
var dl = ol.getElementsByTagName('dl');
var tmp = -1;
var open = false;
for (var i = 0; i < h1.length; i++) {
    h1[i].index = i;
    h1[i].onclick = function () {
        for (var i = 0; i < h1.length; i++) {
            dl[i].style.display = 'none';
        }
        if (tmp == this.index && open) {
            dl[this.index].style.display = 'none';
            open = false;
        } else {
            dl[this.index].style.display = 'block';
            open = true;
        }
        tmp = this.index;
    }
}