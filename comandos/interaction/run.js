const { MessageEmbed } = require("discord.js")

module.exports.run = async (bot, message, args) => {

    let resultado = bot.interaction.run[Math.floor(bot.interaction.run.length * Math.random())];
    let author = message.author

    let embed = new MessageEmbed()
    .setDescription(`${author} ha salido corriendo sin explicación alguna`)
    .setImage(resultado)
    .setColor(`RANDOM`)

    message.channel.send({ embeds: [embed] })
}

exports.conf = {
    aliases: []
};
    exports.help = {
    name: "run",
    description: "Empieza a correr a toda potencia.", 
    usage: "e!run",
    cooldown: 3
}