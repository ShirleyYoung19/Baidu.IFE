/**
 * Created by ShirleyYang on 16/8/28.
 * 创建一个mediator,处理传递过来的commandObejct
 */
 var mediator={
     craftArray:[],

     getCommand:function (obejct,number) {
         if(number>=0.3){   //如果没有丢包,执行后面的操作
             var id=obejct.id+1;
             var command=obejct.command;
             if (command=="create"){
                  //如果是创新新的飞船
                     var craftNew=new Craft();
                     this.craftArray.push(craftNew);
                     setTimeout(function () {
                         craftNew.create(id)
                     },1000);
             }else{
                 this.sendCommand(id,command);
             }

         }
     },

     sendCommand:function (id,command) {
         setTimeout(function () {
             mediator.craftArray.forEach(function (craft) {
                 craft.getCommand(id,command);
             })
         },1000)

     }
};