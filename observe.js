/**
 * 发布订阅模式
 */
// 发布者
let dep={
    subscribes:{},// 订阅者回调函数,可能会订阅多个不同的类别，比如只订阅售房信息的价格或者楼层
    // 订阅函数
    subscribe:function(type,fn){
        if (!this.subscribes[type]){
            this.subscribes[type]=[]
        }
        this.subscribes[type].push(fn)
    },
    publish:function(){
        let type=[].shift.call(arguments);// 将arguments转成数组
        if (typeof type==='undefined'){
            return
        }
        let fns=this.subscribes[type]
        if (!fns||fns.length===0){
            return
        }
        for(let i=0;i<fns.length;i++){
            fns[i].apply(this, arguments)
        }
    },
    remove:function(type,fn){
        let fns = this.subscribes[type]
        if (!fns){ // 无人订阅
            return
        }
        if (!fn){ //取消全部
            fns && (fns.length=0)
            return
        }
        let index=fns.indexOf(fn)
        fns.splice(index,1)
    }
}

let priceFn=function(name){
    return function (price) {
        console.log(name ,',您好售房价格更新:', price)
    }
}

// eg
dep.subscribe('price', priceFn('lss'))
dep.subscribe('floor',function(floor){
    console.log('lss,您好，目前楼层',floor,'可用')
})

dep.subscribe('price',priceFn('张三'))
// 现在价格更新，需要发布通知
dep.publish('price',5000)

dep.remove('price',priceFn())

dep.publish('price', 8000)