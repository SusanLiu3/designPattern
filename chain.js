/**
 * 职责链模式
 */
// 判断某个变量类型  fun /cat/agg
function ChainFactory(fn){
    this.fn=fn
    this.next=null;
}
// 设置某个节点的下一个节点
ChainFactory.prototype.setNext=function(next){
    this.next=next
    return this.next
}
// 开始执行
ChainFactory.prototype.start=function(){
  return  this.fn.apply(this,arguments)
}
function isFun(type){
    if (type==='fun'){
        return 'fun'
    }else{
       return this.next.fn(type)
    }
}
function isCat(type) {
    if (type === 'cat') {
        return 'cat'
    }else{
      return  this.next.fn(type)
    }
}
function isAgg(type) {
    if (type === 'agg') {
        return 'agg'
    }else{
        return ''
    }
}
let funIns=new ChainFactory(isFun)
let catIns=new ChainFactory(isCat)
let aggIns=new ChainFactory(isAgg)
funIns.setNext(catIns).setNext(aggIns)
let res=funIns.start('l')
console.log(res)
