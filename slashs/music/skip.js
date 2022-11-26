const { canModifyQueue } = require("../../util/module")
const { SlashCommandBuilder } = require('@discordjs/builders')
let command = new SlashCommandBuilder()
.setName("skip")
.setDescription("Salta el video actual en la cola.")

module.exports.run = async (interaction, bot) => {

	const queue = bot.queue.get(interaction.member.guild.id);
    if (!queue) return interaction.reply("No hay nada que satar en la cola.")
    if (!canModifyQueue(interaction.member, interaction)) return;

    queue.playing = true;
    queue.player.stop();
    interaction.reply(`${interaction.member.user.toString()} ha saltado la música actual.`)
}
exports.data = command