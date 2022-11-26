const { MessageEmbed } = require("discord.js")

module.exports.run = async (bot, message, args) => {

    let resultado = bot.interaction.kill[Math.floor(bot.interaction.kill.length * Math.random())];
    let author = message.author

    let user = message.mentions.users.first();

    if(!user) return message.channel.cend(`Menciona a quien quieres asesinar.`)

    if(user === author) return message.channel.cend(`No puedes asesinarte a ti mismo.`)

    let embed = new MessageEmbed()
    .setDescription(`${author} ha asesinado a ${user} D´:`)
    .setImage(resultado)
    .setColor(`RANDOM`)

    message.channel.send({ embeds: [embed] })
}

exports.conf = {
    aliases: []
};
    exports.help = {
    name: "kill",
    description: "Asesina a un usuario en un instante.", 
    usage: "e!kill",
    cooldown: 3
}
