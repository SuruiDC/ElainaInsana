const { MessageEmbed } = require("discord.js");
const { canModifyQueue } = require("../../util/module")
module.exports.run = async (bot, message, args) => {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.channel.send("Esta no es una lista de reproducción.")
    if (!canModifyQueue(message.member, message)) return;
    
    if (!args.length) return message.channel.cend("Debes especificar el numero del video en la cola.");
    if (isNaN(args[0])) return message.channel.cend("Debes especificar el numero del video en la cola.");

    const song = queue.songs.splice(args[0] - 1, 1);
    queue.text.send({
        embeds: [
            new MessageEmbed()
            .setAuthor('Se removio una canción de la cola', message.author.displayAvatarURL({ dynamic: true }))
            .setColor(bot.color)
            .setDescription(`(<:stop:802207012607361124>)${message.author} ha removido **${song[0].title}** de la cola.(<:stop:802207012607361124>)`)
        ]
    });
}
exports.conf = {
    aliases: []
};
    exports.help = {
    name: "remove",
    description: "Remueve un video de la cola de reproducción.", 
    usage: "e!remove [Posición del video]",
    cooldown: 5
}