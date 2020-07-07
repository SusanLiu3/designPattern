/**
 * 享元模式
 */
// 现在想衡量某种食物的糖分是否超标
// 水果类 sugar >60  fruit
// 蔬菜类 sugar>20 // vegetable
function Sugar(name, type, sugar) {
    this.type = type; // 食物类型
    this.sugar = sugar;
    this.name = name
}
Sugar.prototype.judge = function () {
    console.log(this.name, this[this.type]())
}
Sugar.prototype.fruit = function () {
    return this.sugar > 60 ? '超标了' : '没有超标'
}
Sugar.prototype.vegetable = function () {
    return this.sugar > 20 ? '超标了' : '没有超标'
}
let foodList = [{
        name: '香蕉',
        sugar: 40,
        type: 'fruit'
    },
    {
        name: '苹果',
        sugar: 80,
        type: 'fruit'
    },
    {
        name: '西瓜',
        sugar: 90,
        type: 'fruit'
    },
    {
        name: '猕猴桃',
        sugar: 70,
        type: 'fruit'
    },
    {
        name: '哈密瓜',
        sugar: 100,
        type: 'fruit'
    },
    {
        name: '西蓝花',
        sugar: 10,
        type: 'vegetable'
    },
    {
        name: '西红柿',
        sugar: 25,
        type: 'vegetable'
    },
    {
        name: '黄瓜',
        sugar: 10,
        type: 'vegetable'
    }
]
// for (let i = 0, food; food = foodList[i++];) {
//     let sugar = new Sugar(food.name, food.type, food.sugar)
//     sugar.judge()
// }
// 以上实现：目前只有这十几个食物，程序中就创建了十几个对象，如果是大量的食物，那么就得创建大量对象来实现；
// 程序性能相对不友好；
// 在这个例子中，type 是不会变化的，只有两种 水果和蔬菜所以可以作为内部对象

// 剥离内部状态
function Fly(type){
    this.type=type
}
Fly.prototype.judge=function(name){
    // 这一步其实是合并外部和内部状态
    flyManage.setExternalState(name,this) 
   console.log(name,this[this.type]())
}
Fly.prototype.fruit = function () {
    return this.sugar > 60 ? '超标了' : '没有超标'
}
Fly.prototype.vegetable = function () {
    return this.sugar > 20 ? '超标了' : '没有超标'
}
// 创建对象工厂，类似单例模式
let FlyFactory = function () {
    let obj = {}
    return {
        create: function (type) {
            if (obj[type]) {
                return obj[type]
            }
            return obj[type]=new Fly(type)
        }
    }
}()
// 添加对象
let flyManage=function(){
    let databaseObj={}
    return {
        // 创建对象
        add:function(name,type,sugar){
            let fly = FlyFactory.create(type)
            // 保存外部状态以待使用
            databaseObj[name]={
                sugar:sugar
            }
            return fly
        },
        // 设置外部状态
        setExternalState(name,obj){
            var data = databaseObj[name];
            for (var i in data) {
                obj[i] = data[i];
            }
        }
    }
}()
for (let i = 0, food; food = foodList[i++];) {
    let sugar = flyManage.add(food.name, food.type, food.sugar)
    sugar.judge(food.name)
}