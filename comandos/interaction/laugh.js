const { MessageEmbed } = require("discord.js")

module.exports.run = async (bot, message, args) => {

    let resultado = bot.interaction.laugh[Math.floor(bot.interaction.laugh.length * Math.random())];
    let author = message.author

    let embed = new MessageEmbed()
    .setDescription(`${author} no puede contener más la risa.`)
    .setImage(resultado)
    .setColor(`RANDOM`)

    message.channel.send({ embeds: [embed] })
}

exports.conf = {
    aliases: []
};
    exports.help = {
    name: "laugh",
    description: "Empieza a reirte.", 
    usage: "e!laugh",
    cooldown: 3
}