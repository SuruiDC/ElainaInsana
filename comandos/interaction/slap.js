const { MessageEmbed } = require("discord.js")

module.exports.run = async (bot, message, args) => {

    let resultado = bot.interaction.slap[Math.floor(bot.interaction.slap.length * Math.random())];
    let author = message.author

    let user = message.mentions.users.first();

    if(!user) return message.channel.send(`Menciona a quien quieres bofetear.`)

    if(user === author) return message.channel.send(`No puedes bofetearte a ti mismo.`)

    let embed = new MessageEmbed()
    .setDescription(`${author} le ha dado una bofetada a ${user} -3-.`)
    .setImage(resultado)
    .setColor(`RANDOM`)

    message.channel.send({ embeds: [embed] })
}

exports.conf = {
    aliases: []
};
    exports.help = {
    name: "slap",
    description: "Lanzale una bofetada a alguien.", 
    usage: "e!slap",
    cooldown: 5
}
