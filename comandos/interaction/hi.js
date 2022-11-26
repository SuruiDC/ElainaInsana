const { MessageEmbed } = require("discord.js")

module.exports.run = async (bot, message, args) => {

    let resultado = bot.interaction.hi[Math.floor(bot.interaction.hi.length * Math.random())];
    let author = message.author

    let embed = new MessageEmbed()
    .setDescription(`${author} esta saludando a todo el mundo.`)
    .setImage(resultado)
    .setColor(`RANDOM`)

    message.channel.send({ embeds: [embed] })
}
exports.conf = {
    aliases: []
};
    exports.help = {
    name: "hi",
    description: "Saluda a todo el mundo.", 
    usage: "e!hi",
    cooldown: 3
}