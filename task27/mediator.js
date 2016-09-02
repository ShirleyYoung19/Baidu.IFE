/**
 * Created by ShirleyYang on 16/8/28.
 * 创建一个mediator,处理传递过来的commandObejct
 */
 var mediator={
     craftArray:[],
     num:1,
     getCommand:function (obejct,number) {
         if(number>=0.3){   //如果没有丢包,执行后面的操作
             var id=obejct.id+1;
             var command=obejct.command;
             if (command=="create"){
                  //如果是创新新的飞船
                     var craftNew=new Craft();
                     this.craftArray.push(craftNew);
                 var obj=this;
                     setTimeout(function () {
                         craftNew.create(id,obj.num)
                     },1000);
                 this.num++;//这个num代表创建的第几个飞船
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