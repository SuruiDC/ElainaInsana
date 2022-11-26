const { MessageEmbed } = require("discord.js")
const { Types } = require("mongoose")
const { utc } = require("moment")
module.exports = {
	async run(bot, message){
		const invites = [
			"discord.gg",
			"discord.me",
			"discord.io/",
			"discordapp.com/invite",
			"discord.gg/",
			"invite.gg",
			"invite.gg/",
			"https://discord.com/invite/"
		]
		if(invites.some(word => message.content.toLowerCase().includes(word))) {
			var data = await bot.guildsData.findOne({guild: message.guild.id})
			var allyPoints = await bot.usersData.findOne({guild: message.guild.id, user: message.author.id})
			if(!allyPoints){
				let x = await bot.usersData.create({
					_id: Types.ObjectId(),
					user: message.author.id,
					guild: message.guild.id,
					warns: 0,
					AllyPoints: 0,
					AllyTotal: 0,
					serverPoints: 0,
					serverAllys: 0
				})
				allyPoints = x
			}
			
			if(!data.allysets.channelAllyID && !data.allyembed.description && data.allysets.roleStaffAlly) return;

			let dayShort = message.createdAt.toDateString()
			let dayLong = utc(message.createdAt).format("dddd, MMMM do YYYY, HH:mm:ss")
			let amount = Math.floor(Math.random() * 3) + 1

			let searchRole = message.guild.roles.cache.find(a => a.id === data.allysets.roleStaffAlly)
			if(!searchRole) return data.updateOne({"allysets.roleStaffAlly": null})

			let searchMention = message.guild.roles.cache.find(a => a.id === data.allysets.roleMentionAlly)
			if(!searchMention) data.updateOne({"allysets.roleMentionAlly": null, "allysets.roleMentionActive": null})

			if(message.channel.id === data.allysets.channelAllyID){
				if(message.member.roles.cache.has(searchRole.id)){
					if(data.allysets.embedActive === "on"){
						if(data.allyembed.title === null && data.allyembed.description === null && data.allyembed.image === null ){
							return data.updateOne({"allysets.embedActive": null})           
						}else{
						if(data.allysets.roleMentionActive === "on"){
							searchMention ? message.channel.send(`<@&${searchMention.id}>`) : undefined
						}
						let embed = new MessageEmbed()
						data.allyembed.title ? embed.setTitle(data.allyembed.title) : undefined
						data.allyembed.color ? embed.setColor(data.allyembedcolor) : undefined
						data.allyembed.description ? embed.setDescription(data.allyembed.description.replace(`{user:mention}`, message.author).replace(`{user:username}`, message.author.username).replace(`{user:tag}`, message.author.tag).replace(`{user:id}`, message.author.id).replace(`{user:points}`, allyPoints.AllyPoints).replace(`{server:points}`, allyPoints.serverPoints).replace(`{user:allys}`, allyPoints.AllyTotal).replace(`{server:allys}`, allyPoints.serverAllys).replace(`{date:short}`, dayShort).replace(`{date:long}`, dayLong)) : undefined         
						data.allyembed.image ? embed.setImage(data.allyembed.image) : undefined
						message.channel.send({ embeds: [embed] })
						let sumaAllys = allyPoints.AllyTotal + 1
						let sumaAllyPoins = allyPoints.AllyPoints + amount
						let sumaAllysServer = allyPoints.serverAllys + 1
						let sumaPointsServer = allyPoints.serverPoints + amount
						await allyPoints.updateOne({AllyPoints: sumaAllyPoins, AllyTotal: sumaAllys, serverAllys: sumaAllysServer, serverPoints: sumaPointsServer})
						}
					}
				}
			}
	    }		
	}
}