/**
 * 中介者模式
 */
// 团队游戏例子
function player(name, team) {
    this.team = team // 哪一组
    this.name = name // 名字
    this.state = 'alive' // 生存状态
}
player.prototype.win = function () {
    console.log(this.name, 'win')
}
player.prototype.lose = function () {
    console.log(this.name, 'lose')
}
// 
player.prototype.die = function () {
    this.state = 'die'
    mediatorFactory.receiveMessage('playDie', this)
}
// 移除
player.prototype.remove = function () {
    mediatorFactory.receiveMessage('removePlayer',this)
}
player.prototype.change = function (team) {
    // 换队
    mediatorFactory.receiveMessage('changeTeam',this,team)
}

function playerFactory(name, team) {
    let newPlayer = new player(name, team)
    mediatorFactory.receiveMessage('addPlayer', newPlayer)
    return newPlayer
}
// 定义中介者对象
let mediatorFactory=(function(){
    // 所有的玩家对象
    let players={}
    // 一些可操作的对象
    let operations={}
    // 新增玩家
    operations.addPlayer=function(player){
        players[player.team] = players[player.team]||[]
        players[player.team].push(player)
    }
    // 移除玩家
    operations.removePlayer=function(player){
       players[player.team]= players[player.team].filter(i => i !== player)
    }
    operations.changeTeam=function(player,team){
        operations.removePlayer(player)
        player.team=team
        operations.addPlayer(player)
    }
    // 玩家死亡
    operations.playDie=function(player){
        let {team}=player
        console.log(players[team])
        let flag=players[team].filter(i=>i.state!=='die').length===0// 全灭
        if (flag){
            players[team].map(i=>{
                i.lose()
            })
            for (const t in players) {
                if (players.hasOwnProperty(t)) {
                    if (t!==team){
                        players[t].map(i=>{
                            i.win()
                        })
                    }
                    
                }
            }
        }
    }
    let receiveMessage=function(){
        let type=[].shift.call(arguments)
        operations[type].apply(this,arguments)
    }
    return {receiveMessage}
})()

let a=playerFactory('lss','A')
let b=playerFactory('lbb','A')

let c = playerFactory('lcc', 'B')
let d = playerFactory('ldd', 'B')
let e = playerFactory('lee', 'B')
e.change('C')
c.die()
d.die()

