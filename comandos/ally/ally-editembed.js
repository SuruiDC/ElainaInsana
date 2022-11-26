const { Types } = require("mongoose")

module.exports.run = async (bot, message, args) => {

    if(!message.member.permissions.has("MANAGE_GUILD")) return message.channel.cend("Requieres del permiso de `Gestionar Servidor` para usar este comando.")

    var data = await bot.guildsData.findOne({guild: message.guild.id})
    let parametro = args[0]
    if(!parametro) return message.channel.cend("Especifica el parametro que quieres editar, parametros disponibles: `title`, `color`, `description`, `image`")
    let parametros = [
        "image",
        "color",
        "description",
        "title"
    ]
    if(!parametros.some(a => parametro.toLowerCase() === a)) return message.channel.cend("`❌` Parametro invalido `❌`")
    const filtrer = m => m.author.id === message.author.id;
    let prefix = data.config.prefix ? data.config.prefix : "e!"
        if(parametro.toLowerCase() === "image"){
            message.channel.cend("Incrusta una imagen al mensaje para el embed o escribe `cancel` para cancelar el comando. `Time: 30s`")
            message.channel.awaitMessages(filtrer, {max: 1, time: 30000}).then(async a => {
                if(a.first().content === "cancel" || a.first().content.toLowerCase().startsWith(prefix)) return message.channel.cend("Comando cancelado.")
                if(a.first().content === "delete"){
                    if(!data.allyembed.image) return message.channel.cend("No puedes eliminar algo que no existe.")
                    await data.updateOne({"allyembed.image": null})
                    return message.channel.cend("Imagen eliminado exitosamente")
                }
                let imagen = a.first().attachments.first()
                if(!imagen) return message.channel.cend("El mensaje no contiene una imagen intenta de nuevo.")
                await data.updateOne({"allyembed.image": imagen.url})
                message.channel.cend(`Se establecio ${imagen.url} como imagen del embed.`)
            }).catch(err => {
                message.channel.cend("Se acabo tu tiempo.")
                console.log(err)
            })
        }

        if(parametro.toLowerCase() === "title"){
            message.channel.cend("Da un titulo para el embed, escribe `cancel` para cancelar el comando o `delete` para eliminar este parametro. `Time: 30s`")
            message.channel.awaitMessages(filtrer, {max: 1, time: 30000}).then(async a => {
                if(a.first().content === "cancel" || collected.first().content.toLowerCase().startsWith(prefix)) return message.channel.cend("Comando cancelado.")
                if(a.first().content === "delete"){
                    if(!data.allyembed.title) return message.channel.cend("No puedes eliminar algo que no existe.")
                    await data.updateOne({"allyembed.title": null})
                    return message.channel.cend("Titulo eliminado exitosamente")
                }
                if(a.first().content.length > 100) return message.channel.cend("El titulo no puede contener más de 100 caracteres")
                
                let title = a.first().content
                await data.updateOne({"allyembed.title": title})
                message.channel.cend(`Se establecio **${title}** como titulo del embed.`)
            }).catch(err => {
                message.channel.cend("Se acabo tu tiempo.")
            })
        }

        if(parametro.toLowerCase() === "color"){
            message.channel.cend("Da un color en hex para el embed, escribe `cancel` para cancelar el comando o `delete` para eliminar este parametro. `Time: 30s`")
            message.channel.awaitMessages(filtrer, {max: 1, time: 30000}).then(async a => {
                if(a.first().content === "cancel" || collected.first().content.toLowerCase().startsWith(prefix)) return message.channel.cend("Comando cancelado.")
                if(a.first().content === "delete"){
                    if(!data.allyembed.color) return message.channel.cend("No puedes eliminar algo que no existe.")
                    await data.updateOne({"allyembed.color": null})
                    return message.channel.cend("Color eliminado exitosamente")
                }
                if(a.first().content.length > 7) return message.channel.cend("Los colores hex solo tienen 7 digitos asegurate de proporcionar uno.")
                if(!a.first().content.startsWith("#")) return message.channel.cend("Los colores en HEX contienen un `#`.")
                let color = a.first().content
                await data.updateOne({"allyembed.color": color})
                message.channel.cend(`Se establecio **${color}** como color del embed.`)
            }).catch(err => {
                message.channel.cend("Se acabo tu tiempo.")
            })
        }

    if(parametro.toLowerCase() === "description"){
        message.channel.cend("Da una descripción para el embed, escribe `cancel` para cancelar el comando o `delete` para eliminar este parametro. `Time: 5min`")
        message.channel.awaitMessages(filtrer, {max: 1, time: 300000}).then(async a => {
            if(a.first().content === "cancel" || collected.first().content.toLowerCase().startsWith(prefix)) return message.channel.cend("Comando cancelado.")
            if(a.first().content === "delete"){
                if(!data.allyembed.description) return message.channel.cend("No puedes eliminar algo que no existe.")
                await data.updateOne({"allyembed.description": null})
                return message.channel.cend("Descripción eliminada exitosamente")
            }
            if(a.first().content.length > 2048) return message.channel.cend("La descripción no puede contener más de 2048 caracteres")
        
            let Description = a.first().content
            await data.updateOne({"allyembed.description": Description})
            message.channel.cend(`Se establecio **${Description}** como descripción del embed.`)
        }).catch(err => {
            message.channel.cend("Se acabo tu tiempo.")
        })
    }
    
    
}
exports.conf = {
    aliases: []
};
    exports.help = {
    name: "editembed",
    description: "Edita el embed del sistema de alianzas.", 
    usage: "e!editembed [parametro]",
    cooldown: 3
}