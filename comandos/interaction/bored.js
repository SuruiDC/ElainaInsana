const { MessageEmbed } = require("discord.js")

module.exports.run = async (bot, message, args) => {

    let resultado = bot.interaction.bored[Math.floor(bot.interaction.bored.length * Math.random())];
    let author = message.author

    let embed = new MessageEmbed()
    .setDescription(`${author} se ha aburrido.`)
    .setImage(resultado)
    .setColor(`RANDOM`)

    message.channel.send({ embeds: [embed] })
}

exports.conf = {
    aliases: []
};
    exports.help = {
    name: "bored",
    description: "Da a entender que estas aburrido", 
    usage: "e!bored",
    cooldown: 3
}