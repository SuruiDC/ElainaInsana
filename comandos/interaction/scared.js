const { MessageEmbed } = require("discord.js")

module.exports.run = async (bot, message, args) => {

    let resultado = bot.interaction.scared[Math.floor(bot.interaction.scared.length * Math.random())];
    let author = message.author

    let embed = new MessageEmbed()
    .setDescription(`${author} se ha asustado repentinamente.`)
    .setImage(resultado)
    .setColor(`RANDOM`)

    message.channel.send({ embeds: [embed] })
}
exports.conf = {
    aliases: []
};
    exports.help = {
    name: "scared",
    description: "Asustate de manera repentina.", 
    usage: "e!scared",
    cooldown: 3
}