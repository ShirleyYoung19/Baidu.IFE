/**
 * Created by ShirleyYang on 16/10/15.
 */
var SpiderMap = function (selector) {
    this.element = document.querySelector(selector);

};
SpiderMap.prototype.create=function (row,column) {
    var html='';
    for (var i=0; i < row + 1 ; i ++){
        html +='<tr>';
        for (var j=0; j < column + 1 ; j++){
            if( i == 0 && j == 0){
                html +='<td></td>';
            }else if( i == 0 ){
                html += '<td class="spider-box" data-type="x-axis">'+j+'</td>'
            }else if(j == 0){
                html += '<td class="spider-box" data-type="y-axis">'+i+'</td>'
            }else {
                html += '<td class="spider-box"></td>'
            }
        }
        html +='</tr>';
    }
    this.column = column;
    this.row = row;
    this.element.innerHTML = html;
};