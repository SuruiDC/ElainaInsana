module.exports.run = async (bot, message, args) => {
   
    if(!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send("Requieres del permiso de `Gestionar mensajes` para ejecutar este comando.")
    if(!message.channel.permissionsFor(message.guild.me).has("MANAGE_MESSAGES")) return message.channel.send("No tengo permitido eliminar mensajes en este canal.")
    let amount = args[0]

    if (isNaN(amount) || parseInt(amount) <= 0) return message.channel.send('Da un numero de mensajes para borrar.')
    
    if(parseInt(amount > 100)) return message.channel.send("Solo puedes borrar 100 mensajes a la vez.")
    if(!message.guild.me.permissions.has("MANAGE_MESSAGES")) return message.channel.send("No tengo permisos para gestionar mensajes en este servidor")    
    message.channel.bulkDelete(amount).catch(err => {
        message.channel.send("Hubieron mensajes que no pudieron ser borrados por que superan las 2 semanas de antiguedad.")
    })

    message.channel.send(`Se han borrado **${amount}** mensajes con exito.`).then(a =>{
        a.delete({timeout: 3000})
    })
}

exports.conf = {
    aliases: ['cls']
};
    exports.help = {
    name: "clear",
    description: "Limpia el chat borrando los mensajes.", 
    usage: "e!clear [Número de mensajes a borrar]",
    cooldown: 5
}