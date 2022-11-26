const { MessageEmbed } = require("discord.js")
const { utc } = require("moment")
module.exports.run = async (bot) => {
	bot.on("guildMemberRemove", async member => {

		var data = await bot.guildsData.findOne({guild: member.guild.id})
		if(!data) return;
		if(!data.goodbyeConfig.channel) return;
		if(!data.goodbyeConfig.title && !data.goodbyeConfig.author && !data.goodbyeConfig.image && !data.goodbyeConfig.description) return;

		let channel;
		try {
			channel = await bot.channels.fetch(data.goodbyeConfig.channel)
		} catch (e) {
			return await data.updateOne({"goodbyeConfig.channel": null})
		}

		if(!channel.permissionsFor(bot.user).has("VIEW_CHANNEL" && "SEND_MESSAGES" && "EMBED_LINKS")) return;
		let joined = utc(member.joinedAt)
		let created = utc(member.createdAt)
		let embed = new MessageEmbed()

		data.goodbyeConfig.author ? (
			data.goodbyeConfig.authorImage ? embed.setAuthor(data.goodbyeConfig.author.replace("{member.name}", member.user.username).replace("{member.id}", member.id).replace("{guild.members}", member.guild.memberCount) , data.goodbyeConfig.authorImage.replace("{guild.image}", member.guild.iconURL({ size : 4096, format: "png", dynamic: true })).replace("{member.image}", member.user.displayAvatarURL({ size: 4096, format: "png", dynamic: true }))) : embed.setAuthor(data.goodbyeConfig.author.replace("{member.name}", member.user.username).replace("{member.id}", member.id).replace("{guild.members}", member.guild.memberCount))
		) : undefined

		data.goodbyeConfig.title ? embed.setTitle(data.goodbyeConfig.title.replace("{member.name}", member.user.username).replace("{member.id}", member.id).replace("{guild.members}", member.guild.memberCount)) : undefined
		data.goodbyeConfig.thumbnail ? embed.setThumbnail(data.goodbyeConfig.thumbnail.replace("{guild.image}", member.guild.iconURL({ size : 4096, format: "png", dynamic: true })).replace("{member.image}", member.user.displayAvatarURL({ size: 4096, format: "png", dynamic: true }))) : undefined
		data.goodbyeConfig.color ? embed.setColor(data.goodbyeConfig.color) : undefined
		data.goodbyeConfig.description ? embed.setDescription(data.goodbyeConfig.description.replace("{member.name}", member.user.username).replace("{member.id}", member.id).replace("{member.mention}", member.toString()).replace("{guild.members}", member.guild.memberCount).replace("{joined.calendar}", joined.calendar()).replace("{joined.dateShort}", member.joinedAt.toDateString()).replace("{joined.dateLong}", joined.format("dddd, MMMM do YYYY, HH:mm:ss"))) : undefined
		data.goodbyeConfig.image ? embed.setImage(data.goodbyeConfig.image) : undefined
		data.goodbyeConfig.timestamp ? embed.setTimestamp() : undefined
		data.goodbyeConfig.footer ? (
			data.goodbyeConfig.footerImage ? embed.setFooter(data.goodbyeConfig.footer.replace("{member.name}", member.user.username).replace("{member.id}", member.id).replace("{guild.members}", member.guild.memberCount), data.goodbyeConfig.footerImage.replace("{guild.image}", member.guild.iconURL({ size : 4096, format: "png", dynamic: true })).replace("{member.image}", member.user.displayAvatarURL({ size: 4096, format: "png", dynamic: true }))) : embed.setFooter(data.goodbyeConfig.footer.replace("{member.name}", member.user.username).replace("{member.id}", member.id).replace("{guild.members}", member.guild.memberCount))
		) : undefined

		channel.send({ embeds: [embed] })
	})
}