const { MessageEmbed } = require("discord.js")
const translate = require('node-google-translate-skidz');

module.exports.run = async (bot, message, args) => {

        let texto = args.join(" ");
        if(!texto) return message.channel.send("Especificame el texto.")
        message.delete().catch(err => {})

        let a = await translate({text: texto, source: 'en', target: 'es'})
        let embed = new MessageEmbed()
        .setTitle(`__Sistema de traducción de ${message.guild.name}__`)
        .setDescription(a.translation)
        .setColor("#fffefe")
        .setFooter(`Texto traducido para ${message.author.tag}`, message.author.displayAvatarURL())
        if(a.length > 2048) return message.channel.cend("El contenido supera el limite de **2048** caracteres.")
        message.channel.send({ embeds: [embed] }).then(x => setTimeout(() => x.delete(), 60000))
    }

exports.conf = {
    aliases: []
};
    exports.help = {
    name: "español",
    description: "Traduce un texto en ingles al español.", 
    usage: "e!español",
    cooldown: 5
}

