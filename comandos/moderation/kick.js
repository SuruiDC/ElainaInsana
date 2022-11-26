const { MessageEmbed } = require("discord.js")
const { Types } = require("mongoose")
module.exports.run = async (bot, message, args) => {

    if(!message.member.permissions.has("KICK_MEMBERS")) return message.channel.cend("Requieres del permiso de `Expulsar Usuarios` para usar este comando.");
    let kUser = message.mentions.members.first()
    if(!kUser) return message.channel.cend("Especifica el usuario al que expulsar.");
    if(kUser.id === message.author.id) return message.channel.cend("No puedes expulsarte a ti mismo.")
    let kReason = args.slice(1).join(" ")
    if(!kReason) return message.channel.cend("Especifica la razón de la expulsión.");
    if(kUser.permissions.has("ADMINISTRATOR")) return message.channel.cend("No puedes expulsar a un usuario con el permiso de `Administrador`.");
    var data = await bot.guildsData.findOne({guild: message.guild.id})
    if(message.member.roles.highest.comparePositionTo(kUser.roles.highest) <= 0) return message.channel.cend("No puedes expulsar a alguien con un rol superior al tuyo")
    if(message.guild.me.roles.highest.comparePositionTo(kUser.roles.highest) <= 0) return message.channel.cend("No puedo expulsar a alguien con un rol superior al mio.")
    let kickEmbed = new MessageEmbed()
    .setColor(`RANDOM`)
    .setDescription("**__Registro de expulsión__**")
    .addField("✿•°Usuario expulsado", `➼<@` + kUser + `>`)
    .addField("✿•°ID", `➼` + kUser.id)
    .addField("✿•°Expulsado por", `➼<@` + message.author + `>`)
    .addField("✿•°Razón", `➼` + kReason)
    .addField("✿•°Fecha", `➼` + message.createdAt.toLocaleString())
    .setFooter(`Elaina`, bot.user.displayAvatarURL());

    let kickChannel = kUser.guild.channels.cache.find(channel => channel.id === data.config.logs);
    if(!kickChannel)  return message.channel.cend("No se ha establecido el canal de logs usa el comando **logs-setchannel**.");
    if(!kickChannel.permissionsFor(message.guild.me).has("VIEW_CHANNEL" && "SEND_MESSAGES" && "EMBED_LINKS")) return message.channel.cend("Necesito tener estos permisos: `VIEW_CHANNEL`,`SEND_MESSAGES`,`EMBED_LINKS`, para usar ese comando.")
    if(!message.guild.me.permissions.has("KICK_MEMBERS")) return message.channel.cend("No tengo permisos para expulsar en este servidor")
    kUser.kick(`Kickeado por ${message.author.tag} por "${kReason}"`).catch(err => {
        message.channel.cend("Espera un momento ha ocurrido un error.")
    })
    message.channel.cend("Usuario expulsado exitósamente");
    kickChannel.send({ embeds: [kickEmbed] }).catch(err => {
        message.channel.cend("No pude enviar el registro por que no puedo ver ese canal.")
    })
}

exports.conf = {
    aliases: []
};
    exports.help = {
    name: "kick",
    description: "Expulsa a un usuario del servidor y registralo.", 
    usage: "e!kick @user [Razón]",
    cooldown: 5
}