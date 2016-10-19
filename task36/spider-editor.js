/**
 * Created by ShirleyYang on 16/10/16.
 */
function SpiderEditor(selector) {
    this.element=document.querySelector(selector);
    this.$line=this.element.querySelector('.commander-lines');
    this.$textarea=this.element.querySelector('.commander-editor');

    this.$textarea.addEventListener('keyup',this.update.bind(this));
    this.$textarea.addEventListener('scroll',this.scroll.bind(this));

    this.update();
}
SpiderEditor.prototype.update=function () {
    var codes = this.getCode();

    var length=codes.length;
    var html='';
    this.$line.innerHTML='';

    for (var i=1; i<length+1; i++){
        html += '<div class="commander-lines-item">' + i +'</div>';
    }
    this.$line.innerHTML=html;

    this.$line.scrollTop = this.$textarea.scrollTop;

};

SpiderEditor.prototype.scroll=function () {
    this.$line.scrollTop = this.$textarea.scrollTop;
};

SpiderEditor.prototype.getCode=function () {
    var codes = this.$textarea.value;
    var codesList=codes.split(/\r?\n/g);
    codesList.forEach(function (item) {
        item.trim();
    });
    return codesList;
};

SpiderEditor.prototype.warning=function (index) {
    var indexDIV=this.$line.getElementsByTagName('div');
    indexDIV[index].className += ' warning';
};
