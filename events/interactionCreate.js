module.exports.run = async (bot) => {
	bot.on("interactionCreate", async interaction => {
		if(!interaction.isCommand()) return;
		if(!bot.slashs.has(interaction.commandName)) return;
		if(!interaction.member) return interaction.reply({ content: "No se permite el uso de slash commands en mensajes privados.", ephemeral: true })

		let channel = bot.channels.cache.get(interaction.channelId)
		let permissions = channel.permissionsFor(bot.user).toArray()
		if(!permissions.includes("SEND_MESSAGES")) return interaction.reply({ content: "No tengo permisos en este canal.", ephemeral: true})
		if(!permissions.includes("VIEW_CHANNEL")) return interaction.reply({ content: "No tengo permisos en este canal.", ephemeral: true})
			
		try {
			await bot.slashs.get(interaction.commandName).run(interaction, bot)
		} catch (e) {
			await interaction.reply({ content: `Ha ocurrido un error ${e.message}`, ephemeral: true })
		}
	})
}