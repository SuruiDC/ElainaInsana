const { MessageEmbed } = require("discord.js")

module.exports.run = async (bot, message, args) => {
    
    let resultado = bot.interaction.kiss[Math.floor(bot.interaction.kiss.length * Math.random())];
    let author = message.author

    let user = message.mentions.users.first();

    if(!user) return message.channel.cend(`Menciona a alguien uwu.`)

    if(user === author) return message.channel.cend(`No puedes besarte a ti mismo.`)

    let embed = new MessageEmbed()
    .setDescription(`${author} le ha dado un beso a ${user} uwu.`)
    .setImage(resultado)
    .setColor(`RANDOM`)

    message.channel.send({ embeds: [embed] })
}

exports.conf = {
    aliases: []
};
    exports.help = {
    name: "kiss",
    description: "Dale un beso a un usuario.", 
    usage: "e!kiss @user",
    cooldown: 3
}