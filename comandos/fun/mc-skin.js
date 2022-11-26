const { MessageEmbed } = require("discord.js")

module.exports.run = async (bot, message, args) => {
    let skin = args.join(" ")
    if(!skin) return message.channel.send("Debes especificar un nombre de skin de minecraft.")
    let img = `https://minecraftskinstealer.com/api/v1/skin/render/fullbody/${skin}/700`
    .replace(" ", "_")
    let embed = new MessageEmbed()
    .setAuthor(`${skin}`, message.author.displayAvatarURL({dynamic: true}))
    .setColor("RANDOM")
    .setImage(img)
    .setFooter(`Pedido por ${message.author.tag}`)
    .setTimestamp()
    message.channel.send({ embeds: [embed] })
}
exports.conf = {
    aliases: ['msk']
};
    exports.help = {
    name: "mc-skin",
    description: "Obtén la skin de minecraft de un usuario.", 
    usage: "e!mc-skin [Nombre del Usuario]",
    cooldown: 5
}