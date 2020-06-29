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
        for(let i=0,;i<fns.length;i++){
            fns[i].apply(this, arguments)
        }
    }
}

// eg
dep.subscribe('price',function(price){
    console.log('lss,您好售房价格更新:',price)
})
dep.subscribe('floor',function(floor){
    console.log('lss,您好，目前楼层',floor,'可用')
})

dep.subscribe('price',function(price){
   console.log('张三,您好售房价格更新:', price)
})
// 现在价格更新，需要发布通知
dep.publish('price',5000)