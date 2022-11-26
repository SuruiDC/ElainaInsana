const { MessageEmbed } = require("discord.js")

module.exports.run = async (bot, message, args) => {

    let resultado = bot.interaction.pat[Math.floor(bot.interaction.pat.length * Math.random())];
    let author = message.author

    let user = message.mentions.users.first();

    if(!user) return message.channel.cend(`Menciona a quien quieres acaririciar <a:Zero02Pat:775852550401687582>`)

    if(user === author) return message.channel.cend(`No puedes acariciarte a ti mismo.`)

    let embed = new MessageEmbed()
    .setDescription(`${author} acaricio a ${user} nwn`)
    .setImage(resultado)
    .setColor(`RANDOM`)

    message.channel.send({ embeds: [embed] })
}

exports.conf = {
    aliases: []
};
    exports.help = {
    name: "pat",
    description: "Acaricia a alguien.", 
    usage: "e!pat @user",
    cooldown: 5
}