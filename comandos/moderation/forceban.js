module.exports.run = async (bot, message, args) => {
	if(!message.member.permissions.has("BAN_MEMBERS")) return message.channel.cend("Requieres del permiso de `Banear Miembros` para poder usar este comando.")
    let IDS = args[0]
    if(!IDS) return message.channel.cend("Especifica la ID del usuario al cual banear.")
    if(!message.guild.me.permissions.has("BAN_MEMBERS")) return message.channel.cend("No tengo permisos para banear en este servidor")
    let search = message.guild.members.cache.find(a => a.id === IDS)
    if(!search){
    message.channel.cend("Espera un segundo..").then(a => {
    	
    	message.guild.members.ban(IDS).catch(err => {
    		return a.edit("Id invalida corrigela por favor.")
    	})
		a.edit(`Se baneo la ID:**${IDS}** correctamente.`)
    })
        
    }else{
        message.channel.cend("El comando `forceban` solo puede ser usado para banear a usuarios fuera del servidor.")
    }
}
exports.conf = {
    aliases: []
};
    exports.help = {
    name: "forceban",
    description: "Banea la un usuario fuera del servidor.", 
    usage: "e!forceban [Id del Usuario]",
    cooldown: 5
}