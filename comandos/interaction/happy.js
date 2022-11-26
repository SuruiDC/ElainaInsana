const { MessageEmbed } = require("discord.js")

module.exports.run = async (bot, message, args) => {

    let resultado = bot.interaction.happy[Math.floor(bot.interaction.happy.length * Math.random())];
    let author = message.author

    let embed = new MessageEmbed()
    .setDescription(`${author} ha sonreído.`)
    .setImage(resultado)
    .setColor(`RANDOM`)

    message.channel.send({ embeds: [embed] })
}

exports.conf = {
    aliases: []
};
    exports.help = {
    name: "happy",
    description: "Alegrate por la situación.", 
    usage: "e!happy",
    cooldown: 3
}