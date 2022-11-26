const { MessageEmbed } = require("discord.js")

module.exports.run = async (bot, message, args) => {

    let resultado = bot.interaction.punch[Math.floor(bot.interaction.punch.length * Math.random())];
    let author = message.author

    let user = message.mentions.users.first();

    if(!user) return message.channel.cend(`Menciona a quien quieres golpear.`)

    if(user === author) return message.channel.cend(`No puedes golpearte a ti mismo.`)

    let embed = new MessageEmbed()
    .setDescription(`${author} le ha dado un super puñetazo a ${user}`)
    .setImage(resultado)
    .setColor(`RANDOM`)

    message.channel.send({ embeds: [embed] })
}

exports.conf = {
    aliases: []
};
    exports.help = {
    name: "punch",
    description: "Dale un buen puñetazo a alguien.", 
    usage: "e!punch @user",
    cooldown: 3
}