/**
 * 迭代器模式
 */
/**
 * 外部迭代器
 * @param {迭代对象} arr 
 */
let iterator = function (arr) {
    let current = 0 // 当前索引
    // 指针指向下一个元素
    let next = function () {
        current++
    }
    let isDone = function () {
        return current >= arr.length - 1
    }
    let getCurrItem = function () {
        return arr[current]
    }
    return {
        next,
        isDone,
        getCurrItem
    }
}
let iter = iterator([2, 3, 4])
console.log(iter.getCurrItem())
iter.next()
console.log(iter.getCurrItem(), iter.isDone())
/**
 * 内部迭代器
 * @param {迭代对象} arr 
 * @param {回调函数} callback 
 */
let innerIterator = function (arr, callback) {
    for (let i = 0; i < arr.length; i++) {
        callback(i, arr[i])
    }
}
innerIterator([1, 2, 3], function (idx, item) {
    console.log(item)
})
/**
 * 迭代类数组对象和对象字面量
 */

let each = function (obj, callback) {
    if (Object.prototype.toString.call(obj) === '[object Array]') {
        for (let i = 0; i < obj.length; i++) {
            callback(i, obj[i])
        }
    } else {
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                const element = obj[key];
                callback.call(element, key, element)
            }
        }
    }
}
each({a:1,b:6},function(key,value){
    console.log(key,value)
})