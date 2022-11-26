const { MessageEmbed } = require("discord.js")
const { Types } = require("mongoose")
module.exports.run = async (bot, message, args) => {

    var datamod = await bot.guildsData.findOne({guild: message.guild.id})
    let antiinvites = datamod.automod.anti1
    let antilinks = datamod.automod.anti2
    let embed = new MessageEmbed()
    embed.setTitle("__Estado de la automoderación__")
    embed.setColor("#fffefe")
    embed.setDescription("Cualquier miembro con el permiso de `Gestionar Mensajes` no sera afectado por la automoderación.")
    if(!antiinvites){
        embed.addField("✿•°Anti Invites:", "<:off:775971904565018655>╎Off")
    }else{
        embed.addField("✿•°Anti Invites:", "<:on:775971905017872404>╎On")
    }
    if(!antilinks){
        embed.addField("✿•°Anti Links:", "<:off:775971904565018655>╎Off")
    }else{
        embed.addField("✿•°Anti Links:", "<:on:775971905017872404>╎On")
    }
    embed.setFooter(`Elaina`, bot.user.displayAvatarURL())

    message.channel.send({ embeds: [embed] })

}
exports.conf = {
    aliases: []
};
    exports.help = {
    name: "automod",
    description: "Muestra el estado de la `Automoderación` del servidor.", 
    usage: "e!automod",
    cooldown: 5
}