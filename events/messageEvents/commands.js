const { Types } = require("mongoose")
module.exports.run = async (bot, message) => {
        let blacklist = await bot.blacklist.findOne({user: "720509373020897331"})
        var data = await bot.guildsData.findOne({guild: message.guild.id})
        let prefix = data.config.prefix ? data.config.prefix : "e!"
        if(!message.content.toLowerCase().startsWith(prefix) || message.content.toLowerCase() == prefix) return;
        if(blacklist.blacklist.includes(message.author.id)) return;
        let messageArray = message.content.split(" ")
        let cmd = messageArray[0].toLowerCase();
        let args =  messageArray.slice(1).join(" ").trim().split(" ");
        let permisos = message.channel.permissionsFor(message.guild.me).toArray()
       	if(!permisos.includes("EMBED_LINKS") || !permisos.includes("SEND_MESSAGES") || !permisos.includes("USE_EXTERNAL_EMOJIS")) return message.channel.send("Mientras no tenga los permisos de `EMBED_LINKS` y `USE_EXTERNAL_EMOJIS` no respondere a ningún comando.").catch(e => {})
        let commandfile = bot.commands.get(cmd.slice(prefix.length)) || bot.commands.find(a => a.conf.aliases.includes(cmd.slice(prefix.length)))
        if(!commandfile) return;
        if(bot.cooldown.has(message.author.id+commandfile.help.name)) return message.channel.send(`Este comando esta en cooldown espera **${commandfile.help.cooldown}s**.`).then(a => setTimeout(() => a.delete(), 30000))
        try {
            await commandfile.run(bot, message, args)
        } catch (e) {
            return message.channel.send("Ocurrio un error inesperado: `"+ e.message+ "`")
        }
            
        bot.cooldown.add(message.author.id+commandfile.help.name)
        setTimeout(() => bot.cooldown.delete(message.author.id+commandfile.help.name), commandfile.help.cooldown * 1000)

}