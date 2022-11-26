const { Types } = require("mongoose")
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
            const bad = [
                "https://",
                "https:/"
            ]
            var data = await bot.guildsData.findOne({guild: message.guild.id})
            if(invites.some(a => message.content.toLowerCase().includes(a))){
    
                if(data.automod.anti1 === "on"){
                    if(message.member.hasPermission("MANAGE_MESSAGES")) return;
                    if(data.allysets.channelAllyID){
                    	if(message.channel.id === data.allysets.channelAllyID) return;
              		}
                    message.delete()
                    message.channel.cend(`${message.author} no estan permitidas las invites en este servidor.`)
                }else{
                    return;
                }
            }
            if(bad.some(a => message.content.toLowerCase().includes(a)))
            if(data.automod.anti2 === "on"){
                if(message.member.hasPermission("MANAGE_MESSAGES")) return;
                if(data.allysets.channelAllyID){
                    	if(message.channel.id === data.allysets.channelAllyID) return;
              	}
                message.delete()
                message.channel.cend(`${message.author} no estan permitidos los links en este servidor.`)
            }else{
                return;
            }                    	
	}
}