const { MessageEmbed } = require("discord.js")
module.exports.run = async (bot, message, args) => {

    let sugerencia = args.join(" ")

    if(!sugerencia) return message.channel.cend(`Menciona tu sugerencia.`)
    if(sugerencia.length > 2048) return message.channel.cend("Tu sugerencia no puede pasar los 2048 caracteres.")
    var data = await bot.guildsData.findOne({guild: message.guild.id})
    
    let embed = new MessageEmbed()
    .setTitle(`**__Sistema de Sugerencias de ${message.guild.name}__**`)
    .setColor(`RANDOM`)
    .setDescription(`${sugerencia}`)
    .setFooter(`Sugerencia enviada por ${message.author.tag}`, message.author.displayAvatarURL())

    let sChannel = message.guild.channels.cache.find(c => c.id  === data.config.suggest)
    if(!sChannel) return message.channel.cend(`No se ha establecido el canal de sugerencia usa el comando **suggest-setchannel**.`)
    if(!sChannel.permissionsFor(message.guild.me).has("VIEW_CHANNEL" && "SEND_MESSAGES" && "EMBED_LINKS")) return message.channel.cend("Necesito tener estos permisos: `VIEW_CHANNEL`,`SEND_MESSAGES`,`EMBED_LINKS`, para usar ese comando.")
    sChannel.send({ embeds: [embed] }).then(async a =>{
        await a.react("🔼")
        await a.react("🔽")
    })

    message.channel.cend(`Sugerencia enviada exitosamente.`)
    
}

exports.conf = {
    aliases: ['sug']
};
    exports.help = {
    name: "suggest",
    description: "Envia una sugerencia al servidor.", 
    usage: "e!suggest [Sugerencia]",
    cooldown: 5
}