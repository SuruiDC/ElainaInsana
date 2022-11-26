module.exports = {
    async handler(bot){
        let a = ["ally","automod","config","fun","info","interaction","moderation","nsfw","traductor","music","entries"]
        const Read = require("util").promisify(require("fs").readdir)
            for (var i of a){
            let x = await Read(`./comandos/${i}`)
            x.forEach(a => {
                let directory = `../comandos/${i}/${a}`
                let cmd = require(directory)
                bot.commands.set(cmd.help.name, cmd)
            })
        }
        console.log("Se cargaron todos los comandos.")
    }
}