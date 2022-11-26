const { MessageEmbed } = require("discord.js")

module.exports.run = async (bot, message, args) => {

    let surui = await bot.users.fetch("618634689204322314")
    //let servers = await bot.shard.fetchClientValues('guilds.cache.size').then(results => results.reduce((acc, guildCount) => acc + guildCount, 0))
    //let guilds = await bot.shard.fetchClientValues("guilds.cache")
    //guilds = guilds[0].concat(guilds[1])
    let users = 0
    bot.guilds.cache.forEach(x => users = x.memberCount + users)
    //let channels = await bot.shard.fetchClientValues('channels.cache.size').then(results => results.reduce((acc, guildCount) => acc + guildCount, 0))
    //let emojis = await bot.shard.fetchClientValues('emojis.cache.size').then(results => results.reduce((acc, guildCount) => acc + guildCount, 0))
    let channels = bot.channels.cache.size
    let emojis = bot.emojis.cache.size
    let servers = bot.guilds.cache.size

    let embed = new MessageEmbed()
    .setTitle("__Informacion sobre Elaina__")
    .setColor("#fffefe")
    .setThumbnail(bot.user.avatarURL({size: 4096, format: "png"}))
    .addField(String.raw`🤹🏻‍╎Creador:`, surui.tag, true)
    .addField("<a:Discordjs:775122150171738112>╎Librería:", `Discord.js`, true)
    .addField("<a:Estrellasawa:775123329224933376>╎Servidores:", servers.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), true)
    .addField("<a:nubexd:775123996269871115>╎Usuarios:", users.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), true)
    .addField("<a:asddsa:775124482502295554>╎Canales:", channels.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), true)
    .addField("<a:Soraka:741458693668995074>╎Emojis:", emojis.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), true)
    .addField("<:NODE:775125812403765298>╎Node:", process.version, true)
    .addField("<:MEMORIA:775125849715245068>╎Memoria Usada:", (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) + "MB", true)

    message.channel.send({ embeds: [embed] })
}
exports.conf = {
    aliases: ['st']
};
    exports.help = {
    name: "status",
    description: "Muestra las estadísticas de Elaina.", 
    usage: "e!status",
    cooldown: 5
}