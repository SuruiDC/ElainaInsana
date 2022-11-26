const { MessageEmbed } = require("discord.js")

module.exports.run = async (bot, message, args) => {

    let miembro;
    try{
        miembro = await bot.users.fetch(args[0])
    } catch (e) {
        miembro = message.mentions.users.first() || message.author
    }
    if(!miembro.avatarURL()) return message.channel.cend("Este usuario no posee avatar.")
    let embed = new MessageEmbed()
    .setTitle(`**__Avatar de ${miembro.username}__**`)
    .setColor("RANDOM")
    .setDescription(`[Link del Avatar](${miembro.avatarURL({dynamic: true, size: 4096, format: "png"})})`)
    .setImage(miembro.avatarURL({dynamic: true, size: 4096, format: "png"}))
    .setFooter(`Solicitado por ${message.author.tag}`, message.author.avatarURL({dynamic : true}))
    message.channel.send({ embeds: [embed] })
}

exports.conf = {
    aliases: ['av']
};
    exports.help = {
    name: "avatar",
    description: "Obtén el avatar de un usuario", 
    usage: "e!avatar [`Id` o @user o Nada]",
    cooldown: 5
}