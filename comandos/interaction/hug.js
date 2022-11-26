const { MessageEmbed } = require("discord.js")

module.exports.run = async (bot, message, args) => {

    let resultado = bot.interaction.hug[Math.floor(bot.interaction.hug.length * Math.random())];  
    let author = message.author

    let user = message.mentions.users.first();

    if(!user) return message.channel.cend(`Menciona a alguien owo.`)

    if(user === author) return message.channel.cend(`No puedes abrazarte a ti mismo.`)

    let embed = new MessageEmbed()
    .setDescription(`${author} le ha dado un abrazo a ${user} owo.`)
    .setImage(resultado)
    .setColor(`RANDOM`)

    message.channel.send({ embeds: [embed] })
}

exports.conf = {
    aliases: []
};
exports.help = {
    name: "hug",
    description: "Abraza a un usuario con todo el amor.", 
    usage: "e!hug",
    cooldown: 3
}

