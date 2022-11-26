module.exports.run = async (bot) => {
	bot.on("voiceStateUpdate", (o, n) => {
		try {
			if(o.channel.members.has(bot.user.id) && o.channel.members.size < 2) {
				let queue = bot.queue.get(n.guild.id)
				queue.message.delete().catch(e => {})
				queue.timeout ? clearTimeout(queue.timeout) : undefined
				queue.voice.destroy();
				queue.text.send("Me salí del canal de voz debido a que ya se fueron todos <:CryingPanda:741458687713083515>.")
			}
		} catch (e){
			return;
		}
		
	})
}
