const { MessageEmbed } = require("discord.js")
const { utc } = require("moment")
module.exports.run = async (bot) => {
	bot.on("guildMemberAdd", async member => {

		var data = await bot.guildsData.findOne({guild: member.guild.id})
		if(!data) return;
		if(!data.welcomeConfig.channel) return;
		if(!data.welcomeConfig.title && !data.welcomeConfig.author && !data.welcomeConfig.image && !data.welcomeConfig.description) return;

		let channel;
		try {
			channel = await bot.channels.fetch(data.welcomeConfig.channel)
		} catch (e) {
			return await data.updateOne({"welcomeConfig.channel": null})
		}

		if(!channel.permissionsFor(bot.user).has("VIEW_CHANNEL" && "SEND_MESSAGES" && "EMBED_LINKS")) return;
		let joined = utc(member.joinedAt)
		let created = utc(member.createdAt)
		let embed = new MessageEmbed()

		data.welcomeConfig.author ? (
			data.welcomeConfig.authorImage ? embed.setAuthor(data.welcomeConfig.author.replace("{member.name}", member.user.username).replace("{member.id}", member.id).replace("{guild.members}", member.guild.memberCount) , data.welcomeConfig.authorImage.replace("{guild.image}", member.guild.iconURL({ size : 4096, format: "png", dynamic: true })).replace("{member.image}", member.user.displayAvatarURL({ size: 4096, format: "png", dynamic: true }))) : embed.setAuthor(data.welcomeConfig.author.replace("{member.name}", member.user.username).replace("{member.id}", member.id).replace("{guild.members}", member.guild.memberCount))
		) : undefined

		data.welcomeConfig.title ? embed.setTitle(data.welcomeConfig.title.replace("{member.name}", member.user.username).replace("{member.id}", member.id).replace("{guild.members}", member.guild.memberCount)) : undefined
		data.welcomeConfig.thumbnail ? embed.setThumbnail(data.welcomeConfig.thumbnail.replace("{guild.image}", member.guild.iconURL({ size : 4096, format: "png", dynamic: true })).replace("{member.image}", member.user.displayAvatarURL({ size: 4096, format: "png", dynamic: true }))) : undefined
		data.welcomeConfig.color ? embed.setColor(data.welcomeConfig.color) : undefined
		data.welcomeConfig.description ? embed.setDescription(data.welcomeConfig.description.replace("{member.name}", member.user.username).replace("{member.id}", member.id).replace("{member.mention}", member.toString()).replace("{guild.members}", member.guild.memberCount).replace("{joined.calendar}", joined.calendar()).replace("{joined.dateShort}", member.joinedAt.toDateString()).replace("{joined.dateLong}", joined.format("dddd, MMMM do YYYY, HH:mm:ss"))) : undefined
		data.welcomeConfig.image ? embed.setImage(data.welcomeConfig.image) : undefined
		data.welcomeConfig.timestamp ? embed.setTimestamp() : undefined
		data.welcomeConfig.footer ? (
			data.welcomeConfig.footerImage ? embed.setFooter(data.welcomeConfig.footer.replace("{member.name}", member.user.username).replace("{member.id}", member.id).replace("{guild.members}", member.guild.memberCount), data.welcomeConfig.footerImage.replace("{guild.image}", member.guild.iconURL({ size : 4096, format: "png", dynamic: true })).replace("{member.image}", member.user.displayAvatarURL({ size: 4096, format: "png", dynamic: true }))) : embed.setFooter(data.welcomeConfig.footer.replace("{member.name}", member.user.username).replace("{member.id}", member.id).replace("{guild.members}", member.guild.memberCount))
		) : undefined

		data.welcomeConfig.mention ? channel.send({ content: member.user.toString() , embeds: [embed] }) : channel.send({ embeds: [embed] })
	})
}