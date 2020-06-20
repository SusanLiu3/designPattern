/**
 * 单例模式：确保一个类只有一个实例
 */
/**
 * 实现方式1：
 * 缺点：违背'单一职责'原则；一个类尽可能的只实现一个功能；
 * CreateDiv 构造函数 做了两件事：init初始化；确保只有一个实例
 */
var createDiv=(function(){
    let instance=null
    let CreateDiv=function(html){
        if (instance) {
            return instance
        }
        this.init(html)
        return instance=this
    }
    CreateDiv.prototype.init=function(html){
        console.log(html,'创建成功')
    }
    return CreateDiv
})()
let div1 = new createDiv('lss')
let div2 = new createDiv('ldd')
console.log(div1===div2)

/**
 * 相较于前一种，下面的单例模式保证了一个类只实现一个功能；
 */
createDiv=function(html){
    this.init(html)
}
createDiv.prototype.init = function (html) {
    console.log(html, '新增成功')
}

let singleCreateDiv=(function(){
    let instance=null
    return function(html){
        if (!instance){
            instance=new createDiv(html)
        }
        return instance
    }
})()
let sDiv1=new singleCreateDiv('mm')
let sDiv2=new singleCreateDiv('nn')
console.log(sDiv1===sDiv2)

/**************以上两种方式都是传统意义的实现方式；我们知道JavaScript是无类的概念(ES5)，
 **************在JavaScript中，创建对象对象的方式非常简单，就是一个{}**************** */
/**
 * 惰性单例模式：在需要的时候创建
 * 案例：现在要实现一个登录框的创建
 */
let loginLayerCreate=function(){
    console.log('登录框创建')
    return true
}
/**
 * 单个实例的获取
 */
var getSingle=(function(){
    let instance=null;
    return function(){
        return instance || (instance=loginLayerCreate()) // 这里可以优化，写死了某个对象的创建
    }
})()
let instance1=getSingle()
let instance2=getSingle()
console.log(instance1===instance2)

// 假如现在想实现iframe的创建呢，可以对上面的getSingle进行优化

getSingle=function(fn){
    let instance=null;
    return function(){
        return instance ||(instance=fn.apply(this,arguments))
    }
}
let createStu=function(){
    console.log(arguments,'创建了')
    return true
}
let getLoginInstance = getSingle(loginLayerCreate)
let getCreateStuInstance = getSingle(createStu)
let ins1=getLoginInstance()
let ins2 = getLoginInstance()
console.log(ins1===ins2)

let ins4 = getCreateStuInstance('hhh')

let ins5 = getCreateStuInstance('lll')
console.log(ins4===ins5)
