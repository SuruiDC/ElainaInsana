const { MessageEmbed } = require("discord.js")
module.exports.run = async (bot, message, args) => {
    if(!message.member.permissions.has(`MANAGE_MESSAGES`)){
        return message.channel.cend("Requieres del permiso de `Gestionar Mensajes` para usar este comando.")
    } 
    let channel = message.mentions.channels.first()
    let image = message.attachments.first()
    if(!channel){
        return message.channel.cend("Ejemplo de uso: `e!embed #reglas __Reglas__$#fafafa$Llevarse bien con los miembros del servidor` si se agrego una imagen al usar el comando se pondrá en el embed.")
    } 
    let permissions = channel.permissionsFor(message.guild.me).toArray()
    if(!permissions.includes("SEND_MESSAGES")) return message.channel.cend("Necesito tener estos permisos: `VIEW_CHANNEL`,`SEND_MESSAGES`,`EMBED_LINKS`, para usar ese comando.")
    if(!permissions.includes("EMBED_LINKS")) return message.channel.cend("Necesito tener estos permisos: `VIEW_CHANNEL`,`SEND_MESSAGES`,`EMBED_LINKS`, para usar ese comando.")
    if(!permissions.includes("VIEW_CHANNEL")) return message.channel.cend("Necesito tener estos permisos: `VIEW_CHANNEL`,`SEND_MESSAGES`,`EMBED_LINKS`, para usar ese comando.")
    let x = args.slice(1).join(" ").trim().split("$")
    let a = [];
    x.forEach(m => {
        m.length < 1 ? undefined : a.push(m)
    })
    if(a.length < 1) {
        return message.channel.cend("Debes especificar el titulo del embed o puedes poner `Nothing`.")
    }
    if(a[0].length > 100) return message.channel.cend("El limite del tamaño del titulo es de 100 caracteres.")
    if(a.length < 2){
        return message.channel.cend("Debes especificar el color del embed o puedes poner `Random`.")
    }
    if(!a[1].length === 7 && !a[1].startsWith("#")) return message.channel.cend("El color debe empezar por # y ser de 6 digitos.")
    if(a.length < 3){
        return message.channel.cend("Debes especificar la descripción del embed o puedes poner `Nothing`.")
    }
    if(a[2].length > 2048) return message.channel.cend("El limite de caracteres de la descripción es de 2048.")
    if(!image && a[0].toLowerCase() === "nothing" && a[2].toLowerCase() === "nothing") return message.channel.cend("No puedes enviar un embed que solo contenga el color.")
    let embed = new MessageEmbed()
    a[0].toLowerCase() === "nothing" ? undefined : embed.setTitle(a[0])
    a[1].toLowerCase() === "random" ? embed.setColor("RANDOM") : embed.setColor(a[1])
    a[2].toLowerCase() === "nothing" ? undefined : embed.setDescription(a[2])
    image ? embed.setImage(image.url) : undefined
    channel.send({ embeds: [embed] })
}
exports.conf = {
    aliases: []
};
    exports.help = {
    name: "embed",
    description: "Crea un embed y lo envia al canal que desees.", 
    usage: "e!embed [Parametros]",
    cooldown: 1
}