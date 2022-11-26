const { MessageEmbed } = require("discord.js")

module.exports.run = async (bot, message, args) => {

    let resultado = bot.interaction.fbi[Math.floor(bot.interaction.fbi.length * Math.random())];

    let embed = new MessageEmbed()
    .setDescription(`Ya llego la fbi, cagaron.`)
    .setImage(resultado)
    .setColor(`RANDOM`)

    message.channel.send({ embeds: [embed] })
}

exports.conf = {
    aliases: []
};
    exports.help = {
    name: "fbi",
    description: "Llama a la fbi para que lleguen lo antes posible.", 
    usage: "e!fbi",
    cooldown: 3
}