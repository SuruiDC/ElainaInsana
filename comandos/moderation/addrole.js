module.exports.run = async (bot, message, args) => {

    if(!message.member.permissions.has("MANAGE_ROLES")) return message.channel.cend("Requieres del permiso de `Manejar Roles` para ejecutar este comando.")
    let member = message.mentions.members.first();
    if(!member) return message.channel.cend("Debes mencionar a que miembro quieres agregar un rol.")
    let role = message.mentions.roles.first();
    if(!role) return message.channel.cend("Debes mencionar el rol que quieres añadir.")

    let search = message.guild.roles.cache.find(r => r.id === role.id)
    if(!search) return messagec.channel.cend("No se encontro ese rol en este servidor.")

    if(member.roles.cache.has(search.id)) return message.channel.cend("Este miembro ya cuenta con este rol.")
    if(!message.guild.me.permissions.has("MANAGE_ROLES")) return message.channel.cend("No tengo permisos para manejar roles en este servidor")
    if(!search.editable) return message.channel.cend("No puedo agregar un rol superior al mio.")
    member.roles.add(search)
    
    message.channel.cend("Rol agregado exitosamente.")

}
exports.conf = {
    aliases: []
};
    exports.help = {
    name: "addrole",
    description: "Añade un rol a un usuario.", 
    usage: "e!addrole @member @role",
    cooldown: 10
}