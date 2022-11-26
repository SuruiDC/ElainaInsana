const { MessageEmbed } = require("discord.js")
module.exports.run = async (bot, message, args) => {

	let embed = new MessageEmbed()
	.setTitle("__Guía del sistema de entradas y salidas de Elaina__")
	.setColor("#fafafa")
	.setThumbnail(bot.user.displayAvatarURL({ size: 4096 , format: "png" }))
	.setDescription("> Hey si estas leyendo esto quiere decir que estas interesado en que consiste este sistema, dejame explicarte la manera sencilla de usarlo...\n\n> Amtes que nada te recomiendo establecer los canales de bienvenidas y despedidas con sus respectivos comandos `setwelcome` y `setgoodbye` una vez hecho esto podemos empezar a configurar.\n\n> Actualmente este sistema solo cuenta con configuración mediante embeds ya que creo que estos son bastante populares, con el comando `welcomeedit` y el comando `goodbyeedit` puede configurar estos mismos, en cuanto a los parametros que contengan imagenes estos necesitan que incrustes una image al mensaje o puedes usar variables que ya comentare más adelante.\n\n> Una vez hecho esto te dejare datos extra, cualquier configuración puede ser borrada con el comando `deleteconfig` ya sea de despedidas o bienvenidas y las bienvenidas puede activar una mención para así poder taguear al usuario que se une esto esta disponible solo para las bienvenidas y puede ser activado o desactivado a travez del comando `welcomemention`\n\n> Ahora hablemos de las variables estas son textos entre corchetes `{}` que ayudan a Elaina a entender algo que tu desees puedes ver todas estas con el comando `entriesVariables` y te indicara en que parametros puedes usarlas.")
	.setFooter("Atentamente el equipo administrativo de Elaina", bot.user.displayAvatarURL())
	.setTimestamp()

	message.channel.send({ embeds: [embed] })
}
exports.conf = {
    aliases: []
};
    exports.help = {
    name: "entriesguide",
    description: "Pequeña guía del sistema de entradas.", 
    usage: "e!entriesguide",
    cooldown: 5
}