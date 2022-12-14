const { MessageEmbed } = require("discord.js")
const forniteClient = require("fortnite")
const fortnite = new forniteClient("dffa5de7-5a43-41fb-9e2f-0d84fc165e21")

module.exports.run = async (bot, message, args) => {

    let plataforma = args[0]
    if(!plataforma) return message.channel.cend("Especifica la plataforma, opciones: `pc`, `xbl`, `psn`")
    let limits = ["pc","xbl","psn"]
    if(!limits.some(a => plataforma === a)) return message.channel.cend("Plataforma invalida.")
    let jugador = args.slice(1).join(" ");
    if(!jugador) return message.channel.cend("Menciona un nombre de un jugador.")
    fortnite.user(jugador, plataforma).then(a => {
 
        let embed = new MessageEmbed()
        .setTitle("**__Fornite Stats__**")
        .setColor("RANDOM")
        .setDescription("Este es el perfil de **"+ a.username+ "** `π€Ήπ»β`")
        .addField("`πββοΈ` | Solo:", "`π`Victorias: **" + a.stats.solo.wins +"**\n`π‘οΈ`Kills: **"+a.stats.solo.kills+"**\n`π `Partidas: **"+ a.stats.solo.matches+"**", true)
        .addField("`π¬` | Duo:", "`π`Victorias: **" + a.stats.duo.wins +"**\n`π‘οΈ`Kills: **"+a.stats.duo.kills+"**\n`π `Partidas: **"+ a.stats.duo.matches+"**", true)
        .addField("`π¨βπ¨βπ¦βπ¦`| Squad", "`π`Victorias: **" + a.stats.squad.wins +"**\n`π‘οΈ`Kills: **"+a.stats.squad.kills+"**\n`π `Partidas: **"+ a.stats.squad.matches+"**", true)
        .setFooter(message.author.tag, message.author.avatarURL())
        .setTimestamp()
        message.channel.send({ embeds: [embed] })
    }).catch(err => {
        message.channel.cend("No se encontro al jugador.")
    })
}
exports.conf = {
    aliases: []
};
    exports.help = {
    name: "fortnite",
    description: "ObtΓ©n informaciΓ³n de un jugador de fortnite", 
    usage: "e!fortnite [Nombre del jugador]",
    cooldown: 5
}