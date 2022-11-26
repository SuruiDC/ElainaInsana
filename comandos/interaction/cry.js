const { MessageEmbed } = require("discord.js")

module.exports.run = async (bot, message, args) => {

    let resultado = bot.interaction.cry[Math.floor(bot.interaction.cry.length * Math.random())];
    let author = message.author

    let embed = new MessageEmbed()
    .setDescription(`${author} ha comenzado a llorar<:CryingPanda:741458687713083515>.`)
    .setImage(resultado)
    .setColor(`RANDOM`)

    message.channel.send({ embeds: [embed] })
}

exports.conf = {
    aliases: []
};
    exports.help = {
    name: "cry",
    description: "Empieza a llorar.", 
    usage: "e!cry",
    cooldown: 3
}
