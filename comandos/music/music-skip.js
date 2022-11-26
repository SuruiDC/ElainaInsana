const { MessageEmbed } = require("discord.js");
const { canModifyQueue } = require("../../util/module")

module.exports.run = async (bot, message, args) => {

    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.reply("No hay nada que satar en la cola.")
    if (!canModifyQueue(message.member, message)) return;
    queue.text.send({
        embeds: [
            new MessageEmbed()
            .setAuthor({ name: 'Se skipeo la canción', iconURL: message.author.displayAvatarURL({ dynamic: true })})
            .setColor(bot.color)
            .setDescription(`(<:skip:802207012427005953>)${message.author} ha saltado la música actual(<:skip:802207012427005953>)`)
        ]
    }).then(x => setTimeout(() => x.delete().catch(e => {}), 5000))
    queue.playing = false;
    queue.player.stop();

}
exports.conf = {
    aliases: ['s']
};
    exports.help = {
    name: "skip",
    description: "Skipea el video actual.", 
    usage: "e!skip",
    cooldown: 3
}