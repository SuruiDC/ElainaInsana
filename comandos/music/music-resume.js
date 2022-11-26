const { MessageEmbed } = require("discord.js");
const { canModifyQueue } = require("../../util/module")

module.exports.run = async (bot, message, args) => {

const queue = message.client.queue.get(message.guild.id);
if (!queue) return message.channel.send("No puedes pausar debido a que no hay nada reproduciendose.")
if (!canModifyQueue(message.member, message)) return;

if (!queue.playing) {
  queue.player.unpause();
  queue.playing = true;
  return queue.text.send({
    embeds: [
      new MessageEmbed()
      .setAuthor('Se resumio la canción', message.author.displayAvatarURL({ dynamic: true }))
      .setColor(bot.color)
      .setDescription(`(<:play:802207012561223762>)${message.author} ha reanudado la reproducción(<:play:802207012561223762>)`)
    ]
  })
}

return message.channel.send("La reproducción no esta en pausa.")
}
exports.conf = {
    aliases: []
};
    exports.help = {
    name: "resume",
    description: "Resume la reproducción.", 
    usage: "e!resume",
    cooldown: 3
}