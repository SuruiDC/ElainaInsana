module.exports.run = async (bot) => {
	bot.on("ready", async () => {
		console.log(bot.user.username + ' lista para una nueva aventura')
    	console.log("━━━━━━━━━━━━━━━━━━━━━━━━") 
    	bot.user.setActivity("viajando por el mundo | @Elaina para ver mi prefix", {type: "LISTENING"});

	})
}