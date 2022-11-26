const { MessageEmbed } = require("discord.js")
const { LolApi } = require("twisted")
const fetch = require("node-fetch")
const emojis = require("../../includes/emojis")

module.exports.run = async (bot, message, args) => {

	const data = await bot.summoner.findOne({bot: "720509373020897331"})
	const api = new LolApi({
        rateLimitRetry: true,
        key: data.key
    })

	let region = args[0]

    if(!region) return message.channel.send("Especifica la región.")
    const anti = ["las","lan","na","brasil","korea","japon","euw"]

    if(!anti.some(a => region === a)) return message.channel.send("Región invalida.Región disponibles: `las`, `lan`, `na`, `brasil`, `korea`, `japon`")

	let name = args.slice(1).join(" ")
	if(!name) return message.channel.cend("Especifica el invocador.")

	const regions = {
		"las": "LA2",
		"lan": "LA1",
		"na": "NA1",
		"brasil": "BR1",
		"japon": "JP1",
		"korea": "KR",
		"euw": "EUW1"
	}

	let summoner = await api.Summoner.getByName(name, regions[region])
	let mastery = await api.Champion.masteryBySummoner(summoner.response.id, regions[region])
	if(mastery.response.length < 1) return message.channel.send("Este jugador no posee niveles de maestría.")

	let champs = []

	let res = await fetch(`http://ddragon.leagueoflegends.com/cdn/${data.version}/data/de_DE/champion.json`)
	let result = await res.json()
	let body = result.data

	for (var i of mastery.response.slice(0, 20)){
		for (var e in body){
			if(body[e].key === i.championId.toString()) champs.push({ name: body[e].name, mastery: i.championPoints, lvl: i.championLevel })
		}
	}

	let total = 0
	for (var g of mastery.response){
		total = total + g.championPoints
	}

	let veinte = 0
	for (var r of mastery.response.slice(0, 20)){
		veinte = veinte + r.championPoints
	}
	/*let rotation = await api.Champion.rotation("LA2")
	let champsRotation = []
	for (var a of rotation.response.freeChampionIds){
		for (var x in body){
			if(body[x].key === a.toString()) champsRotation.push(body[x].name) 
		}
	}
	console.log(champsRotation)
	*/

	let embed = new MessageEmbed()
	.setTitle(`__Lista de los mejores campeones de ${summoner.response.name}__`)
	.setThumbnail(`https://ddragon.leagueoflegends.com/cdn/${data.version}/img/profileicon/${summoner.response.profileIconId}.png`)
	.setColor("RANDOM")
	.addField("Info:", `> ${"`"}Invocador:${"`"} ${summoner.response.name}\n> ${"`"}Maestría Total:${"`"} ${total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}\n> ${"`"}Mejores Campeones:${"`"} ${veinte.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`)
	.addField("Champs:", champs.map((x, i) => `> ${"`"}${i + 1}${"`"}${emojis[x.name]}${x.name}: ${x.mastery.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`).join("\n"))
	
	message.channel.send({ embeds: [embed] })
}

exports.conf = {
    aliases: ['bc']
};
    exports.help = {
    name: "bestchamps",
    description: "Obtén información de los 20 mejores champs de un jugador de lol.", 
    usage: "e!bestchamps [región] [Nombre del Invocador]",
    cooldown: 5
}