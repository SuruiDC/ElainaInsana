const { MessageEmbed } = require("discord.js");
const { canModifyQueue } = require("../../util/module")

module.exports.run = async (bot, message, args) => {

    const queue = message.client.queue.get(message.guild.id);
    
    if (!queue) return message.reply("No puedes detener la reproducción por que no hay nada reproduciendose.")
    if (!canModifyQueue(message.member, message)) return;

    queue.voice.destroy();
    queue.text.send({
        embeds : [
            new MessageEmbed()
            .setAuthor({ name: 'Se detuvo la reproducción', iconURL: message.author.displayAvatarURL({ dynamic: true })})
            .setColor(bot.color)
            .setDescription(`(<:stop:802207012607361124>)${message.author} ha detenido la reproducción(<:stop:802207012607361124>)`)
        ]
    })
}
exports.conf = {
    aliases: []
};
    exports.help = {
    name: "stop",
    description: "Detiene la reproducción.", 
    usage: "e!stop",
    cooldown: 5
}