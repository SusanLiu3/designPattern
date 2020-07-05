/**
 * 模板方法模式
 */
// Coffee 和Tea

function Beverage(){}
Beverage.prototype.boilWater=function(){
    console.log('煮水')
}
Beverage.prototype.brew=function(){} // 泡饮料
Beverage.prototype.pourInup=function(){} // 将饮料倒进杯子
Beverage.prototype.addCondiment=function(){}// 添加额外的材料
Beverage.prototype.init=function(){
    this.boilWater()
    this.brew()
    this.pourInup()
    this.addCondiment()
}
function Coffee(){}
Coffee.prototype=Beverage.prototype;
Coffee.prototype.brew=function(){
    console.log('冲咖啡')
}
Coffee.prototype.pourInup=function(){
    console.log('将咖啡倒进杯子')
}
Coffee.prototype.addCondiment=function(){
    console.log('加牛奶')
}
let coffee = new Coffee()
coffee.init()
 
function Tea() {}
Tea.prototype = Beverage.prototype;
Tea.prototype.brew = function () {
    console.log('泡茶')
}
Tea.prototype.pourInup = function () {
    console.log('将茶倒进杯子')
}
Tea.prototype.addCondiment=function(){
    console.log('加柠檬')
}

let tea=new Tea()
tea.init()
