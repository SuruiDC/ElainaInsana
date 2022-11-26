const { MessageEmbed } = require("discord.js")
const { LolApi } = require("twisted")
const fetch = require("node-fetch")
const emojis = require("../../includes/emojis")
module.exports.run = async (bot, message, args) => {

    const data = await bot.summoner.findOne({bot: "720509373020897331"})
    const lol = new LolApi({
        rateLimitRetry: true,
        key: data.key
    })
    const regions = {
        "las": "LA2",
        "lan": "LA1",
        "na": "NA1",
        "brasil": "BR1",
        "japon": "JP1",
        "korea": "KR",
        "euw": "EUW1"
    }
    const tiers = {
        "IRON": "<:Hierro:814941012290961478>",
        "BRONZE": "<:Bronce:814937526963929138>",
        "SILVER": "<:Plata:814941012518109205>",
        "GOLD": "<:Oro:814941013205450772>",
        "PLATINUM": "<:Platino:814941013323546664>",
        "DIAMOND": "<:Diamante:814941013872476240>",
        "MASTER": "<:Master:814941013893578782>",
        "GRANDMASTER": "<:GranMaster:814941013344649297>",
        "CHALLENGER": "<:Challenger:814941013398782021>"
    }
    let region = args[0]

    if(!region) return message.channel.send("Especifica la región")
    const anti = ["las","lan","na","brasil","korea","japon","euw"]

    if(!anti.some(a => region === a)) return message.channel.send("Región invalida.Región disponibles: `las`, `lan`, `na`, `brasil`, `korea`, `japon`")

    let nameSum = args.slice(1).join(" ")

    if(!nameSum) return message.channel.send("Especifica el invocador.")

    lol.Summoner.getByName(nameSum, regions[region]).then(async summoner => {
        lol.Champion.masteryBySummoner(summoner.response.id, regions[region]).then(async champs => {
            fetch(`http://ddragon.leagueoflegends.com/cdn/${data.version}/data/de_DE/champion.json`).then(async res => {
                let body = await res.json()
                let championList = body.data
                let main;
                let main1;
                let main2;
                for (var i in championList) {

                    if(champs.response[0] === undefined){
                        main = "No hay maestrías"       
                    }
                    else if(championList[i].key == champs.response[0].championId){
                        main = championList[i].name
                    }
                    if(champs.response[1] === undefined){
                        main1 = false
                    }
                    else if(championList[i].key == champs.response[1].championId){
                        main1 = championList[i].name
                    }
                    if(champs.response[2] === undefined){
                        main2 = false
                    }
                    else if(championList[i].key == champs.response[2].championId){
                        main2 = championList[i].name
                    }
                }
                lol.League.bySummoner(summoner.response.id, regions[region]).then(async league => {
                    var soloq = league.response.filter(a => a.queueType === "RANKED_SOLO_5x5")[0]
                    var flex = league.response.filter(a => a.queueType === "RANKED_FLEX_SR")[0]
                    let tierQ;
                    let rankQ;
                    let tierF;
                    let rankF;
                    if(soloq === undefined){
                        tierQ = "Unraked"
                        rankQ = ""
                    }else{
                        tierQ = tiers[soloq.tier]+soloq.tier
                        rankQ = `${soloq.rank}\nLp: ${soloq.leaguePoints} W: ${soloq.wins} L: ${soloq.losses}`
                    }
                    if(flex === undefined){
                        tierF = "Unraked"
                        rankF = ""
                    }else{
                        tierF = tiers[flex.tier]+flex.tier
                        rankF = `${flex.rank}\nLp: ${flex.leaguePoints} W: ${flex.wins} L: ${flex.losses}`
                    }
                    let champOne; 
                    let champTwo;
                    let champThird;
                    if(main === "No hay maestrías"){
                        champOne = "No hay maestrías"
                    }else{
                        champOne = "`1`" + `${emojis[main]}${main}: ${champs.response[0].championPoints.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
                    }
                    if(main1 === false){
                        champTwo = ""
                    }else{
                        champTwo = "`2`" + `${emojis[main1]}${main1}: ${champs.response[1].championPoints.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
                    }
                    if(main2 === false){
                        champThird = ""
                    }else{
                        champThird = "`3`" + `${emojis[main2]}${main2}: ${champs.response[2].championPoints.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
                    }
                    let embed = new MessageEmbed()
                    .setAuthor(summoner.response.name, `https://media.discordapp.net/attachments/757994881087176845/814781449206497300/762411217032970260.png`)
                    .setThumbnail(`https://ddragon.leagueoflegends.com/cdn/${data.version}/img/profileicon/${summoner.response.profileIconId}.png`)
                    .setColor("RANDOM")
                    .addField(`**Perfil:**`, `**Región:** ${region.toUpperCase()}\n**Nivel:** ${summoner.response.summonerLevel}`)
                    .addField(`**Campeones:**`, `${champOne}\n${champTwo}\n${champThird}`)
                    .addField("Ranked SoloQ:", `${tierQ} ${rankQ}`,true)
                    .addField("Ranked Flex:", `${tierF} ${rankF}`,true)

                    message.channel.send({ embeds: [embed] })
                })

            })
        })
    }).catch(err => {
        message.channel.send("No se encontro a ese invocador.")
    })
}
exports.conf = {
    aliases: ['sum']
};
    exports.help = {
    name: "summoner",
    description: "Obtén información de un jugador de League Of Legends.", 
    usage: "e!summoner [region] [Nombre del Invocador]",
    cooldown: 5
}