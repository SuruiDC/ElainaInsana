const { MessageEmbed } = require("discord.js");

module.exports.run = async (bot, message, args) => {

    let pregunta = args.join(" ");
    if(!pregunta) return message.channel.cend("Especifica tu pregunta.")
    if(pregunta.length > 1000) return message.channel.cend("La pregunta no puede superar los 1000 caracteres.")
    let respuestas = [
        "No lo creo",
        "Si",
        "No",
        "Hay posiblidades",
        "El piensa eso",
        "No realmente",
        "Con mucha seguridad",
        "Ha de ser una confusión",
        "Talvez"
    ]

    let resultado = respuestas[Math.floor(respuestas.length * Math.random())];

    let embed = new MessageEmbed()
    .setTitle(message.author.tag)
    .setThumbnail("https://media.discordapp.net/attachments/633484673456275470/766750006190407731/pc7TP-K4aEemYTND25Hyso-DfsN4SJPX-nUbogjnybyYIzfGDjMj1wnfoFIenzwPc34.png")
    .addField(`**__Pregunta__**`, pregunta)
    .addField(`**__Respuesta__**`, resultado)
    .setColor("#fffefe")

    message.channel.send({ embeds: [embed] })
}

exports.conf = {
    aliases: []
};
    exports.help = {
    name: "8ball",
    description: "Haz una pregunta a la 8ball.", 
    usage: "e!8ball [pregunta]",
    cooldown: 5
}