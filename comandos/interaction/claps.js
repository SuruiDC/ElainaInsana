const { MessageEmbed } = require("discord.js")

module.exports.run = async (bot, message, args) => {

    let resultado = bot.interaction.claps[Math.floor(bot.interaction.claps.length * Math.random())];
    let author = message.author

    let embed = new MessageEmbed()
    .setDescription(`${author} ha empezado a aplaudir.`)
    .setImage(resultado)
    .setColor(`RANDOM`)

    message.channel.send({ embeds: [embed] })
}

exports.conf = {
    aliases: []
};
    exports.help = {
    name: "claps",
    description: "Empieza a aplaudir.", 
    usage: "e!claps",
    cooldown: 3
}