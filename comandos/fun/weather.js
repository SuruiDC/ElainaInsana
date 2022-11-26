const { MessageEmbed } = require("discord.js")
const { find } = require("weather-js")
const translate = require("node-google-translate-skidz")
module.exports.run = async (bot, message, args) => {

    let locate = args.join(" ")
    if(!locate) return message.channel.send("Debes especificar una localización.")
    find({search: locate, degreeType: 'C'}, function(err, a){
        if(a.length < 1) return message.channel.send("Localización invalida.")
        const current = a[0].current;
        const location = a[0].location;
        translate({text: current.skytext, source: 'en', target: 'es'}).then(async xd => {
            let embed = new MessageEmbed()
            .setTitle(`__Clima de ${locate}__`)
            .setThumbnail(current.imageUrl)
            .setColor("#fffefe")
            .addField("Tiempo Climático:", `${xd}`,true)
            .addField("Punto de observación:", `${current.observationpoint}`,true)
            .addField("Temperatura:", `${current.temperature}`,true)
            .addField("Grados:", `${location.degreetype}`, true)
            .addField("Humedad:", `${current.humidity}`,true)
            .addField("Viento:", `${current.windspeed}`,true)
            .setFooter(`Fecha: ${current.day} ${current.date}`)

            message.channel.send({ embeds: [embed] })
        })
    })
}
exports.conf = {
    aliases: ['wea']
};
    exports.help = {
    name: "weather",
    description: "Obtén información del clima de una localización.", 
    usage: "e!weather [Localización]",
    cooldown: 5
}