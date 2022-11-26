const { MessageEmbed, escapeMarkdown, splitMessage } = require("discord.js")

module.exports.run = async (bot, message, args) => {

    if(message.guild.emojis.cache.size === 0) return message.channel.cend("Este servidor no tiene emojis.")
    let emojis = message.guild.emojis.cache.map(e => `${e.toString()}`).join("-")
    if(emojis.length > 2048) return message.channel.cend("No se puede enviar la lista de emojisp por que es muy larga.")
    var embed = new MessageEmbed()
    .setTitle(`**__Emojis de ${message.guild.name}__**`)
    .setThumbnail(message.guild.iconURL({size: 4096, dynamic: true}))
    .setDescription(emojis)
    .setColor("#fffefe")

    let a = await message.channel.send(".")
    message.member.send({ embeds: [embed] }).catch(e => {
        return a.edit("Tienes los mensajes privados.")
    })
    a.edit(`${message.author} revisa tus mensajes privados uwu.`)
}

exports.conf = {
    aliases: []
};
    exports.help = {
    name: "emojis",
    description: "Lista de emojis del servidor.", 
    usage: "e!emojis",
    cooldown: 20
}