const { MessageEmbed } = require('discord.js');  

module.exports.run = async (bot, message, args) => {

    let guildRoles = message.guild.roles.cache.map(role => `୨୧・${role.name}`).join("\n")


    for(var i = 0; i < guildRoles.length; i += 2048) {

        let cola = guildRoles.substring(i, Math.min(guildRoles.length, i + 2048))

        var embed = new  MessageEmbed()
        .setTitle(`**__Roles de ${message.guild.name}__**`)
        .setThumbnail(message.guild.iconURL({size: 1024, dynamic: true}))
        .setColor(`#fffefe`)
        .setDescription(cola)
    }
    message.channel.cend(".").then(a => {
        message.member.send({ embeds: [embed] }).catch(err => {
            a.edit("Espera si no te llegaron es por que tienes md cerrado o me has bloqueado.")
        })
        a.edit("Se envio la lista de roles a tus mensajes privados.")
    })

}

exports.conf = {
    aliases: []
};
    exports.help = {
    name: "roles",
    description: "Lista de roles del servidor.", 
    usage: "e!roles",
    cooldown: 20
}