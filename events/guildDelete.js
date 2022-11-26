module.exports.run = async (bot) => {
	bot.on("guildDelete", async guild => {
		require("../includes/loadSlashCommands").deleteCommands(guild)
		let data = await bot.guildsData.findOne({ guild: guild.id })
		data ? (
			await bot.guildsData.deleteOne({ guild: guild.id }),
			console.log(`Se borro la db de el server ${guild.name}.`)
		) : undefined 
	})
}