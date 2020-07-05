/**
 * 组合模式
 */
// 宏命令形式的组合模式
let macroCommand = function () {
    return {
        commandList: [],
        add: function (command) {
            this.commandList.push(command)
        },
        excuse: function () {
            for (let i = 0; i < this.commandList.length; i++) {
                this.commandList[i].excuse()
            }
        }
    }
}


let openDoorCommand = {
    excuse: function () {
        console.log('打开房门')
    }
}
let openQQCommand = {
    excuse: function () {
        console.log('打开QQ')
    }
}
let closePcCommand = {
    excuse: function () {
        console.log('关闭...')
    }
}
let closeWXCommand = {
    excuse: function () {
        console.log('关闭WX...')
    }
}
let openCommand=macroCommand()
openCommand.add(openDoorCommand)
openCommand.add(openQQCommand)
let closeCommand=macroCommand()
closeCommand.add(closePcCommand)
closeCommand.add(closeWXCommand)

let component=macroCommand()
component.add(openCommand)
component.add(closeCommand)
component.excuse()