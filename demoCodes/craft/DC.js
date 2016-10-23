/**
 * Created by ShirleyYang on 16/9/21.
 */
var dataControl={
    craft1:{
        id:0,
        powerType:'',
        energyType:'',
        state:'',
        energy:''
    },
    craft2:{
        id:1,
        powerType:'',
        energyType:'',
        state:'',
        energy:''
    },
    craft3:{
        id:2,
        powerType:'',
        energyType:'',
        state:'',
        energy:''
    },
    craft4:{
        id:3,
        powerType:'',
        energyType:'',
        state:'',
        energy:''
    },
    /**
     * 获取飞船信息
     * @param craft
     */
    getCraftInfo:function (craft) {
        var id=craft.id+1;
        this["craft"+id].state=craft.state;
        this["craft"+id].energy=craft.energy;
        this.render(this["craft"+id]);
    },
    /**
     * 对飞船进行渲染
     * @param craft
     */
    render:function (craft) {
        var id=craft.id;
        var $tr=$('tbody tr').eq(id);
        switch (craft.state){
            case 'create':
                $tr.children().eq(3).text("停飞中");
                break;
            case 'launch':
                $tr.children().eq(3).text("飞行中");
                break;
            case 'stop':
                $tr.children().eq(3).text("停飞中");
                break;
            case 'explode':
                $tr.children().eq(3).text("自爆中");
                $tr.children().filter(":gt(0)").text("");
                return;
                break;
            default:
                break;
        }
        $tr.children().eq(4).text(craft.energy);
        $tr.children().eq(1).text(craft.powerType);
        $tr.children().eq(2).text(craft.energyType);
    }
};