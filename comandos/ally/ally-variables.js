const { MessageEmbed } = require("discord.js");

module.exports.run = async (bot, message, args) => {
    
    let embed = new MessageEmbed()
    .setTitle(`__Variables__`)
    .setColor("#fffefe")
    .setDescription("Recuerda que estas solo pueden ser usadas en el parametro `description` del embed.\n**⊹˚ʚUsuario**\n୨୧・`{user:mention}` - Menciona al usuario que hizo la alianza.\n୨୧・`{user:username}` - Menciona el nombre del usuario que hizo la alianza.\n୨୧・`{user:tag}` - Menciona el tag del usuario que hizo la alianza.\n୨୧・`{user:id}` - Menciona la id del usuario que hizo la alianza.\n**⊹˚ʚPuntos**\n୨୧・`{user:points}` - Menciona los puntos del usuario.\n୨୧・`{server:points}` - Menciona los puntos del server.\n୨୧・`{user:allys}` - Muestra el numero de alianzas que ha hecho el usuario.\n୨୧・`{server:allys}` - Muestra el numero de alianzas del server.\n**⊹˚ʚFecha**\n୨୧・`{date:long}` - Muestra la fecha en la que se realizo la alianza.\n୨୧・`{date:short}` - Muestra la fecha en la que se realizo la alianza.")
    message.channel.send({ embeds: [embed] })
}
exports.conf = {
    aliases: []
};
    exports.help = {
    name: "variables",
    description: "Muestra las variabels disponibles para el parametro `description`.", 
    usage: "e!variables",
    cooldown: 5
}