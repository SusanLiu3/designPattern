/**
 * 策略模式：定义一些算法并封装成策略类，当客户对context发起请求的时候，context总是将这些请求
 * 委托给这些策略对象中的某一个进行计算
 */
/**
 * 例子：根据员工的等级计算年终奖
 */
// 在不使用设计模式时的实现
/**
 * 缺点: 缺乏弹性，如果需要增加一个等级，就得修改计算的方法；
 * 随着等级的不断增加，函数的实现体会越来越臃肿；
 * 复用性较差
 */
function calculateBonus(salary, level) {
    if (level === 'A') {
        return 5 * salary
    }
    if (level === 'B') {
        return 3 * salary
    }
    // .....
}
// 先定义一些策略类
function performanceA() {}
performanceA.prototype.calculate = function (salary) {
    return salary * 5
}
function performanceB() {}
performanceB.prototype.calculate = function (salary) {
    return salary * 3
}
function performanceC() {}
performanceC.prototype.calculate = function (salary) {
    return salary * 1
}
// 环境类
function bonus(salary, strategy) {
    this.salary = salary
    this.strategy = strategy
}
bonus.prototype.getBonus = function () {
    return this.strategy.calculate(this.salary)
}
let bonusA = new bonus(1000, new performanceA()).getBonus()
console.log(bonusA)

// 以上是傳統的设计模式實現模式，JavaScript版本的实现如下：
let strategies = {
    A: salary => salary * 5,
    B: salary => salary * 3,
    C: salary => salary
}
function getBonus(level, salary) {
    return strategies[level](salary)
}
console.log(getBonus('B', 2000))

/**
 * 最经典的表格验证实现
 */

let strategy = {
    isNotEmpty: (value, errorMsg) => {
        if (value === '') {
            return errorMsg
        }
    },
    minLength: (value, length, errorMsg) => {
        if (value.length < length) {
            return errorMsg
        }
    },
    isPhone: (value, errorMsg) => {
        if (!/^1[3,5,8][0-9]{9}/.test(value)) {
            return errorMsg
        }
    }
}

function validator() {
    this.cache = []
}
validator.prototype.add = function (value, rule, errorMsg) {
    let arg = rule.split(':')
    this.cache.push(() => {
        let stra = arg.shift()
        arg.unshift(value)
        arg.push(errorMsg)
        return strategy[stra].apply(strategy, arg)
    })
}
validator.prototype.start=function(){
    for(let i=0,validate;validate=this.cache[i++];){
        let errorMsg=validate()
        if (errorMsg) {
            console.log(errorMsg)
            return errorMsg
        }
    }
}

function validateFunc(){
    let v=new validator()
    v.add('123','isNotEmpty','请输入名字')
    v.add('123456','minLength:6','最少6个字符')
    v.add('13245674890','isPhone','格式不正确')
    v.start()
}
validateFunc()
