const { MessageEmbed } = require("discord.js")

module.exports.run = async (bot, message, args) => {

    let imagenes = [

        "https://media.discordapp.net/attachments/717740010807230494/764226786958639136/El_que_lea_es_daku.png",
        "https://media.discordapp.net/attachments/717740010807230494/764226774846406696/Si_me_lees_sos_daku.png"
    ]

    let resultado = imagenes[Math.floor(imagenes.length * Math.random())];

    let embed = new MessageEmbed()
    .setImage(resultado)
    .setColor("#fffefe")
    .setDescription(`${message.author} obtuviste:`)

    message.channel.send({ embeds: [embed] })

}
exports.conf = {
    aliases: []
};
    exports.help = {
    name: "coin",
    description: "Obten cara o sello de una moneda al azar.", 
    usage: "e!coin",
    cooldown: 5
}