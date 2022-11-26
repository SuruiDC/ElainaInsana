const { MessageEmbed } = require("discord.js");
const { canModifyQueue } = require("../../util/module")

module.exports.run = async (bot, message, args) => {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.reply("No se puede pausar debido a que no hau nada reproduciendose.")
    if (!canModifyQueue(message.member, message)) return;

    if (queue.playing) {
      queue.player.pause();
      queue.playing = false
      return queue.text.send({
          embeds: [
              new MessageEmbed()
              .setAuthor('Se pauso la canción', message.author.displayAvatarURL({ dynamic: true }))
              .setColor(bot.color)
              .setDescription(`(<:pause:802207012460691526>)${message.author} ha pausado la reproducción(<:pause:802207012460691526>)`)
          ]
      })
    }
}
exports.conf = {
    aliases: []
};
    exports.help = {
    name: "pause",
    description: "Coloca pausa a la cola de reproducción.", 
    usage: "e!pause",
    cooldown: 3
}