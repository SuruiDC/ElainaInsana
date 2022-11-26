const { Types } = require("mongoose")
module.exports.run = async (bot, message, args) => {
	if(!message.member.permissions.has("MANAGE_GUILD")) return message.channel.cend("Requieres del permiso de `Gestionar Servidor` para usar este comando.")
	var data = await bot.guildsData.findOne({guild: message.guild.id})
	let mode = args[0]
	let boo = args[1]

	if(!mode) return message.channel.cend("Especifica el modo de juego que quieres activar o escribe `all` para todos. Modos de juego: [`mania`,`catch`,`taiko`,`standar`]")
	if(!["taiko","catch","standar","mania","all"].includes(mode.toLowerCase())) return message.channel.cend("Modo invalido.")
	if(!boo) return message.channel.cend("Especifica el estado a establecer del sistema: `on`,`off`")
	if(!["on","off"].includes(boo.toLowerCase())) return message.channel.cend("Estado invalido.")

	switch(mode.toLowerCase()){
		case "all":
		if(boo.toLowerCase() === "on"){
			await data.updateOne({"osu.standar": true, "osu.taiko": true, "osu.catch": true, "osu.mania": true})
			message.channel.cend("Se cambio el estado de todos los modos a `on`.")
		}else{
			data.updateOne({"osu.standar": false, "osu.taiko": false, "osu.catch": false, "osu.mania": false})
			message.channel.cend("Se cambio el estado de todos los modos a `off`.")
		}
		break;

		case "taiko":
		if(boo.toLowerCase() === "on"){
			await data.updateOne({"osu.taiko": true})
			message.channel.cend(`Se cambio el estado del modo taiko a `+"`on`")				
		}else{
			await data.updateOne({"osu.taiko": false})
			message.channel.cend(`Se cambio el estado del modo taiko a `+"`off`")				
		}
		break;

		case "standar":
		if(boo.toLowerCase() === "on"){
			await data.updateOne({"osu.standar": true})
			message.channel.cend(`Se cambio el estado del modo standar a `+"`on`")				
		}else{
			await data.updateOne({"osu.standar": false})
			message.channel.cend(`Se cambio el estado del modo standar a `+"`off`")				
		}
		break;

		case "mania":
		if(boo.toLowerCase() === "on"){
			await data.updateOne({"osu.mania": true})
			message.channel.cend(`Se cambio el estado del modo mania a `+"`on`")				
		}else{
			await data.updateOne({"osu.mania": false})
			message.channel.cend(`Se cambio el estado del modo mania a `+"`off`")				
		}
		break;

		case "catch":
		if(boo.toLowerCase() === "on"){
			await data.updateOne({"osu.catch": true})
			message.channel.cend(`Se cambio el estado del modo catch a `+"`on`")				
		}else{
			await data.updateOne({"osu.catch": false})
			message.channel.cend(`Se cambio el estado del modo catch a `+"`off`")				
		}
		break;
	}

}
exports.conf = {
    aliases: ["osu-b"]
};
    exports.help = {
    name: "osu-beatmap",
    description: "Establece el sistema de obtención de datos de un mapa de osu.", 
    usage: "e!osu-beatmap [`mode`] [`on` or `off`]",
    cooldown: 5
}