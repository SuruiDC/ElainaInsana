const { MessageEmbed } = require("discord.js")

module.exports.run = async (bot, message, args) => {

    let resultado = bot.interaction.lick[Math.floor(bot.interaction.lick.length * Math.random())];
    let author = message.author

    let user = message.mentions.users.first();

    if(!user) return message.channel.cend(`Menciona a quien quieres lamer 7w7.`)

    if(user === author) return message.channel.cend(`No puedes lamerte a ti mismo.`)

    let embed = new MessageEmbed()
    .setDescription(`${author} lamio de manera sabrosa a ${user}`)
    .setImage(resultado)
    .setColor(`RANDOM`)

    message.channel.send({ embeds: [embed] })
}

exports.conf = {
    aliases: []
};
    exports.help = {
    name: "lick",
    description: "Empieza a lamer a alguien uwu.", 
    usage: "e!lick @user",
    cooldown: 3
}