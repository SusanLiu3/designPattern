/**
 * 命令模式
 */
// 定义接受者对象
// 一个简单的命令模式
// 刷新菜单
let menuBar={
    refresh:function(){
        console.log('点菜')
    },
    unRefresh:function(){
        console.log('撤销')
    }

}
// 在这里 receiver 指对象 menuBar ,约定接受者都包含refresh方法
function refreshMenuBarCommand(receive){
    return {
        execute:function(){
            receive.refresh()
        },
        undo:function(){
            receive.unRefresh()
        }
    }
}
let command=refreshMenuBarCommand(menuBar)
command.execute()
command.undo()



