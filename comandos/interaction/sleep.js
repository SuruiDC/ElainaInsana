const { MessageEmbed } = require("discord.js")

module.exports.run = async (bot, message, args) => {

    let resultado = bot.interaction.sleep[Math.floor(bot.interaction.sleep.length * Math.random())];
    let author = message.author

    let embed = new MessageEmbed()
    .setDescription(`${author} se ha quedado dormido o le ha dado sueño nwn.`)
    .setImage(resultado)
    .setColor(`RANDOM`)

    message.channel.send({ embeds: [embed] })
}

exports.conf = {
    aliases: []
};
    exports.help = {
    name: "sleep",
    description: "Empieza a dormir.", 
    usage: "e!sleep",
    cooldown: 5
}