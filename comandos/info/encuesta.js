const { MessageEmbed } = require("discord.js")
const { Types } = require("mongoose")
module.exports.run = async (bot, message, args) => {

    if(!message.member.permissions.has(`MANAGE_MESSAGES`)) return message.channel.cend("Requieres del permiso de `Gestionar Mensajes` para realizar una encuesta.")
    let x = args.join(" ").trim().split("$")
    let a = [];
    x.forEach(m => {
        m.length < 1 ? undefined : a.push(m)
    })
    if(a.length < 1) return message.channel.cend("Debes especificar las opciones de la encuesta puedes usar el `$` para separar las opciones. **Ejem: e!poll Que vestido vamos a sortear$Vestido Negro$Vestido Azul**")
    if(a.length < 3) return message.channel.cend("Deben haber por lo menos 2 propuestas para la encuesta.")
    if(a.length > 11) return message.channel.cend("El limite de propuestas es de 10.")

    var data = await bot.guildsData.findOne({guild: message.guild.id})
    let sChannel = message.guild.channels.cache.find(c => c.id  === data.config.poll)
    if(!sChannel) return message.channel.cend(`No se ha establecido el canal de encuestas usa el comando **poll-setchannel**.`)
    if(!sChannel.permissionsFor(message.guild.me).has("VIEW_CHANNEL" && "SEND_MESSAGES" && "EMBED_LINKS")) return message.channel.cend("Necesito tener estos permisos: `VIEW_CHANNEL`,`SEND_MESSAGES`,`EMBED_LINKS`, para usar ese comando.")

    let emojis = {
        1: "1️⃣",
        2: "2️⃣",
        3: "3️⃣",
        4: "4️⃣",  
        5: "5️⃣",
        6: "6️⃣",
        7: "7️⃣",
        8: "8️⃣",
        9: "9️⃣",
        10:"🔟"
    }
    let poll = `${a[0]}\n`+a.slice(1).map((e, i) => "`"+emojis[i + 1]+"`. "+e).join("\n")
    if(poll.length > 2048) return message.channel.send("La encuestra supera los 2048 caracteres.")
    let embed = new MessageEmbed()
    .setTitle(`__Sistema de encuestas de ${message.guild.name}__`)
    .setColor("RANDOM")
    .setDescription(poll)
    .setFooter(`Encuesta realizada por ${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}))
    sChannel.send({ embeds: [embed] }).then(msg => {
        a.slice(1).forEach(async (e, i) => await msg.react(emojis[i + 1]))
    })

    message.channel.cend(`Encuesta enviada exitosamente.`)
}

exports.conf = {
    aliases: []
};
    exports.help = {
    name: "poll",
    description: "Crea una encuesta para tu servidor.", 
    usage: "e!poll [Titulo$Opción 1$Opción 2...$Opción 10]",
    cooldown: 10
}