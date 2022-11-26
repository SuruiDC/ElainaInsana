const { MessageEmbed } = require("discord.js")

module.exports.run = async (bot, message, args) => {

    if(!message.guild.iconURL()) return message.channel.cend("Este servidor no posee icono.")
    let embed = new MessageEmbed()
    .setTitle(`**__Icono de ${message.guild.name}__**`)
    .setDescription(`[Link Del Icono](${message.guild.iconURL({dynamic: true, size: 4096, format: "png"})})`)
    .setImage(message.guild.iconURL({dynamic: true, size: 4096, format: "png"}))
    .setFooter(`Pedido por ${message.author.tag}`, message.author.displayAvatarURL())
    .setColor("#fffefe")

    message.channel.send({ embeds: [embed] })
}

exports.conf = {
    aliases: ['sic']
};
    exports.help = {
    name: "servericon",
    description: "Muestra el icono del servidor.", 
    usage: "e!servericon",
    cooldown: 5
}