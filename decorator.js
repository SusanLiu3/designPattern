/**
 * 装饰者模式
 */
// 动态给对象添加职责
// 例子，一个活动定好了跳舞，唱歌；
// 最后因为某种原因，新加了小品，要求在跳舞，唱歌之前或者之后进行
function activity(){
    console.log('sing')
}
// 新增装饰者
Function.prototype.before=function(beforeFn){
    let that=this;
    return function(){
        // 执行新加的
        beforeFn.apply(this,arguments)
        that.apply(this,arguments)
    }
}
let fn = activity.before(function (name) {
    console.log('小品表演者',name)
})
fn('lll')