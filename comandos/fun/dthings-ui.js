const { MessageEmbed } = require("discord.js")
const { getUser } = require("dthings-api")
module.exports.run = async (bot, message, args) => {
	  let user;
  	try {
    	user = await bot.users.fetch(args[0]) 
  	} catch (e) {
    	user = message.mentions.users.first() || message.author
  	}
  	if(user.bot) return message.channel.cend("Este comando es para obtener información de usuarios, si quieres obtener info sobre un bot usa el comando `dthings`.") 
	let info = await getUser(user.id)
	.catch(e => {
		message.channel.cend("El usuario no esta registrado en la pagina")
	})

	if(!info) return;
	let badges = {
		"Caza Errores": "<:wiCazaErrores:842919543592714261>",
		"Desarrollador de Bots": "<:wiBotDeveloper:842858382578679868>",
		"Desarrollador Certificado": "<:wiDesarrolladorCert:842904408773230632>",
		"Nitro Suscriber": "<:winitro:830506813178642473>",
        "Nitro": "<:winitro:830506813178642473>",
        "Booster": "<:booster:854897315647455254>",
		"Nitro Classic": "<:winitro:830506813178642473>",
		"Seguidor": "<:wthingSeguidor:840987644602351636>",
		"Promovedor": "<:wiPromovedor:843581218473508904>",
		"Moderador": "<:wiModerador:842855555977445396>",
		"Moderador Jefe": "<:wiModeradorJefe:843185644763349053>",
		"Desarrollador": "<:wiWebDeveloper:842871449772621829>",
		"Administrador": "<:wtthingsadministrador:840956777797124096>",
		"Brilliance": "<:emoji_8:836034466815541288>",
		"Balance": "<:emoji_3:836034466765471744>",
		"Bravery": "<:emoji_5:836034466769666070>",
		"Cliente PyroNode": "<:wiPyroClient:844234365813784586>",
		"Usuario de PyroNode": "<:wiUsuarioPyroNode:818331427321675777>",
		"Caza Errores Experto": "<:wibugexpertodthings:856243797046067232>"
	}

	let embed = new MessageEmbed()
	.setTitle(`__Información de ${info.username}__`)
	.setThumbnail(user.displayAvatarURL({dynamic: true, size: 4096}))
	.setColor("RANDOM")
	.addField("・Descripción:", `> ${info.description}`)
	.addField("・Insignias:", info.badges.length < 1 ? "> No posee insginias" : `> ${info.badges.map(x => badges[x]).join("")}`)
	.addField("・Votos Totales:", `> ${info.votes}`)
	.addField("・Puntos:", `> ${info.points}`)
	.addField("・Bots:", info.bots.length < 1 ? "> No posee bots" : `**${info.bots[0].certificate ? "<:wiDesarrolladorCert:842904408773230632>" : ""}${info.bots[0].name}:**`+"\n> `Avatar:` "+`[Enlace](${info.bots[0].avatar})`+"\n> `Votos:` "+info.bots[0].votes+"\n> `Invites:` "+info.bots[0].invites,true)
	if(info.bots.length > 1){
		for (var i of info.bots.slice(1)){
			embed.addField("\u200b", `**${i.certificate ? "<:wiDesarrolladorCert:842904408773230632>" : ""}${i.name}:**`+"\n> `Avatar:` "+`[Enlace](${i.avatar})`+"\n> `Votos:` "+i.votes+"\n> `Invites:` "+i.invites, true)
		}   
	} 

	message.channel.send({ embeds: [embed] })
}
exports.conf = {
    aliases: ["dtu", "dui"]
};
    exports.help = {
    name: "dthings-ui",
    description: "Obtén info de un usuario registrado en discordthings.com", 
    usage: "e!dthings-ui [@user o Id o Nada]",
    cooldown: 5
}