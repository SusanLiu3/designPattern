/**
 * 适配器模式
 */
// 
let baiduMap={
    show:function(){
        console.log('百度地图渲染')
    }
}
let googleMap={
    display:function(){
        console.log('谷歌地图渲染')
    }
}
let googleMapAdapter={
    show:function(){
        return googleMap.display()
    }
}
function renderMap(map){
    if (typeof map.show==='function'){
        return map.show()
    }
}
renderMap(baiduMap)
renderMap(googleMapAdapter)