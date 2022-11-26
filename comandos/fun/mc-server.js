const { MessageEmbed } = require("discord.js")
const fetch = require("node-fetch")

module.exports.run = async (bot, message, args) => {
    let server = args[0]
    if(!server) return message.channel.send("Debes especificar la ip del server.")
    message.channel.send("Buscando servidor...").then(laputa => {
        fetch(`https://api.minetools.eu/ping/${server}`).then(async (res, err) => {
            return res.json().then(async a => {
                let xd = a.description
                .replace(/§\w/g, "")
                let asd = `https://api.minetools.eu/favicon/${server}`
                laputa.edit("Ya casi esta...")
                let embed = new MessageEmbed()
                .setAuthor(`${server}`, message.author.displayAvatarURL({dynamic: true}))
                .setThumbnail(asd)
                .setColor("#fffefe")
                .addField("Descripción:", xd)
                .addField("Versión:", a.version.name)
                .addField("Protocolo:" , a.version.protocol)
                .setFooter(`Users: ${a.players.online}/${a.players.max}`)
                message.channel.send({ embeds: [embed] })
                await laputa.delete()
            }).catch(err => {
                return laputa.edit("No se encontro el servidor.")
            })
        })
    })
}
exports.conf = {
    aliases: ['mcs']
};
    exports.help = {
    name: "mc-server",
    description: "Obtén información de un servidor de minecraft.", 
    usage: "e!mc-server [Ip del servidor]",
    cooldown: 5
}