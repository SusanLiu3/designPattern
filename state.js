/**
 * 状态模式
 */
function State(){}
State.prototype.buttonPress=function(){
    console.log('子类无该方法')
}
function offLight(light) {
    this.light = light
}
offLight.prototype=new State()
offLight.prototype.buttonPress=function(){
    this.light.setState('off')
}
function onLight(light) {
    this.light = light
}
onLight.prototype=new State()
onLight.prototype.buttonPress=function(){
    this.light.setState('on')
}
 // 定义light类
function Light(){
    this.state=''
    this.offLight=new offLight(this)
    this.onLight=new onLight(this)
}
Light.prototype.setState=function(state){
    this.state=state
}
let l=new Light()
l.offLight.buttonPress()
console.log(l.state)
l.onLight.buttonPress()
console.log(l.state)
