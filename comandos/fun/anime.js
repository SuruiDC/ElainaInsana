const Discord = require("discord.js")
const { getInfoFromName } = require("mal-scraper")
const translate = require('node-google-translate-skidz');

module.exports.run = async (bot, message, args) => {

    let anime = args.join(" ")
    if(!anime) return message.channel.cend("Menciona el nombre de un anime.")

    getInfoFromName(anime).then((data) => {

        translate({text: data.synopsis, source: 'en', target: 'es'}).then(result => {

            let embed = new Discord.MessageEmbed()
            .setTitle(`**__Resultados de la busqueda__**`)
            .setColor(`#fffefe`)
            .setThumbnail(`${data.picture}`)
            .setDescription(`**✿•°Titulo:**\n[${data.title}](${data.url})\n**✿•°Synonpsis**\n${result}`)
            .addField(`**✿•°ID:**`, `${data.id}`, true)
            .addField(`**✿•°Episodios:**`, `${data.episodes}`, true)
            .addField(`**✿•°Tipo:**`, `${data.type}`, true)
            .addField(`**✿•°Estado:**`, `${data.status}`, true)
            .addField(`**✿•°Puntuación:**`, `${data.score}`, true)
            .setFooter(`Elaina`, bot.user.displayAvatarURL())

            message.channel.send({ embeds: [embed] })
      })
    })
}

exports.conf = {
    aliases: []
};
    exports.help = {
    name: "anime",
    description: "Obtén información de un anime por su nombre.", 
    usage: "e!anime [Nombre del Anime]",
    cooldown: 5
}