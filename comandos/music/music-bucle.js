const { MessageEmbed } = require("discord.js");
const { canModifyQueue } = require("../../util/module")

module.exports.run = async (bot, message, args) => {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.channel.send("No hay nada reproduciendose por ello no puedes activar el bucle.")
    if (!canModifyQueue(message.member, message)) return;

    queue.loop = !queue.loop;
    return queue.text.send({
        embeds: [
            new MessageEmbed()
            .setAuthor('Se cambio el estado de bucle', message.author.displayAvatarURL({ dynamic: true }))
            .setColor(bot.color)
            .setDescription(`(<:bucle:802207012439064656>)La reproducción en bucle ha sido ${queue.loop ? "encendida(<:bucle:802207012439064656>)" : "apagada(<:bucle:802207012439064656>)"}`)
        ]
    })

}
exports.conf = {
    aliases: []
};
    exports.help = {
    name: "bucle",
    description: "Activa el bucle a la cola de reproducción.", 
    usage: "e!bucle",
    cooldown: 3
}