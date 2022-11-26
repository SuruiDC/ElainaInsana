const { MessageEmbed } = require("discord.js");
const { canModifyQueue } = require("../../util/module")

module.exports.run = async (bot, message, args) => {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.channel.cend("No hay lista de reproducción.")
    if (!args.length) return message.channel.cend(`Debes especificar el numero del video en la cola.`);
    if (isNaN(args[0])) return message.channel.cend("Debes especificar el numero del video en la cola.");
    if(parseInt(args[0]) > queue.songs.length) return message.channel.send("El numero no puede superior a la lista de videos.")
    if (!canModifyQueue(message.member, message)) return;
    queue.text.send({
        embeds: [
            new MessageEmbed()
            .setAuthor('Se skipeo la canción', message.author.displayAvatarURL({ dynamic: true }))
            .setColor(bot.color)
            .setDescription(`(<:skip:802207012427005953>)${message.author} ha saltado **${args[0] - 1}** videos en la cola(<:skip:802207012427005953>)`)
        ]
    })
    queue.playing = true;
    queue.songs = queue.songs.slice(args[0] - 2);
    queue.player.stop();

}
exports.conf = {
    aliases: ['st']
};
    exports.help = {
    name: "skipto",
    description: "Salta varios videos en la cola de reproducción.", 
    usage: "e!skipto [Posición del video]",
    cooldown: 3
}