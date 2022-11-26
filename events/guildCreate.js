module.exports.run = async (bot) => {
	bot.on("guildCreate", async guild => {
		if(guild.memberCount < 15) {
			console.log(`Me salí del servidor ${guild.name} debido a que este tiene menos de 15 usuarios.`)
			return guild.leave()
		}else{
			require("../includes/loadSlashCommands").createCommands(guild)
			console.log(`Me uní a un nuevo servidor llamado ${guild.name} y tiene ${guild.memberCount} usuarios.`)
		}
	})
}