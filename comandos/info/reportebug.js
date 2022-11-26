const { MessageEmbed } = require("discord.js")

module.exports.run = async (bot, message, args) => {

    let elaina = bot.guilds.cache.find(a => a.id === "766142723362521088")
    let canal = elaina.channels.cache.find(c => c.id === "766498800256679946")
    let reporte = args.join(" ")
    if(!reporte) return message.channel.send("Especifica tu reporte sobre el bug encontrado.")

    let embed = new MessageEmbed()
    .setTitle("__Nuevo reporte__")
    .setThumbnail(`${message.author.displayAvatarURL({dynamic: true})}`)
    .setColor("#fffefe")
    .setDescription("✿•°" + reporte)
    .addField("✿•°Usuario:", `${message.author.tag}\nID:${message.author.id}`)
    .setFooter(`Reporte enviado desde ${message.guild.name}`, message.guild.iconURL())

    canal.send({ embeds: [embed] })
    message.channel.send("Reporte enviado exitosamente, muchas gracias por ayudar al desarrollo de **Elaina**.")


}
exports.conf = {
    aliases: ['rbug']
};
    exports.help = {
    name: "reportebug",
    description: "Reporta un bug de Elaina.", 
    usage: "e!reportebug [Tu Mensaje]",
    cooldown: 3600
}