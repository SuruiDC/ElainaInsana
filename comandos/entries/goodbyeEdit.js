module.exports.run = async (bot, message, args) => {

    if(!message.member.permissions.has(`MANAGE_GUILD`)) return message.channel.send("Requieres del permiso de `Gestionar Servidor` para poder establecer los parametros de la bienvenida.")
    let param = args[0]
    let options = ["author","authorImage","color","description","thumbnail","footer","footerImage","title","image","timestamp"]
    let setting = args.slice(1).join(" ")
    if(!setting) return message.channel.send(`Debes especificar el parametro a editar, parametros disponibles: ${options.join(", ")}`)
    let image = message.attachments.first()
    if(!options.some(x => x.toLowerCase() === param.toLowerCase())) return message.channel.send(`Parametro invalido, parametros validos: ${options.join(", ")}`)
    var data = await bot.guildsData.findOne({ guild: message.guild.id })   
    switch(param.toLowerCase()){
        case "author":

        if(!setting) return message.channel.send("Debes especificar el texto a establecer.")
        if(setting.length > 256) return message.channel.send("El `author` no puede pasar los 256 caracteres")
        await data.updateOne({ "goodbyeConfig.author": setting })
        message.channel.send("Se actualizo el `author`.")

        break;

        case "authorimage":

        if(image) {
            await data.updateOne({ "welcomeConfig.authorImage": image.url})
            return message.channel.send("Se actualizo el `authorImage`.")
        }else {
            if(!setting) return message.channel.send("Debes incrustar una image al mensaje o puedes escribir las variables `{guild.image}` o `{member.image}`.")
            if(["{member.image}","{guild.image}"].some(x => x.toLowerCase() === setting)){
                await data.updateOne({ "goodbyeConfig.authorImage": setting.toLowerCase() })
                return message.channel.send("Se actualizo el `authorImage`.")
            } 
            else return message.channel.send("Solo se permite en el `authorImage` las variables `{guild.image}` o `{member.image}`.")
        }

        break;

        case "description":

        if(!setting) return message.channel.send("Debes especificar el texto a establecer.")
        if(setting.length > 2048) return message.channel.send("El `description` no puede pasar los 2048 caracteres.")
        await data.updateOne({ "goodbyeConfig.description": setting })
        message.channel.send("Se actualizo el `description`.")

        break;

        case "image":

        if(!image) return message.channel.send("Debes incrustar un mensaje a la imagen.")
        await data.updateOne({ "goodbyeConfig.image": image.url })
        message.channel.send("Se actualizo el `image`.")

        break;

        case "thumbnail":

        if(image) {
            await data.updateOne({ "welcomeConfig.thumbnail": image.url })
            return message.channel.send("Se actualizo el `thumbnail`.")
        }else {
            if(!setting) return message.channel.send("Debes incrustar una image al mensaje o puedes escribir las variables `{guild.image}` o `{member.image}`.")
            if(["{member.image}","{guild.image}"].some(x => x.toLowerCase() === setting)){
                await data.updateOne({ "goodbyeConfig.thumbnail": setting.toLowerCase() })
                return message.channel.send("Se actualizo el `thumbnail`.")
            } 
            else return message.channel.send("Solo se permite en el `thumbnail` las variables `{guild.image}` o `{member.image}`.")
        }

        break;

        case "footer":

        if(!setting) return message.channel.send("Debes especificar el texto a establecer.")
        if(setting.length > 100) return message.channel.send("El `footer` no puede pasar los 100 caracteres.")
        await data.updateOne({ "goodbyeConfig.footer": setting })
        message.channel.send("Se actualizo el `footer`.")

        break;

        case "footerimage":

        if(image) {
            await data.updateOne({ "welcomeConfig.footerImage": image.url})
            return message.channel.send("Se actualizo el `footerImage`.")
        }else {
            if(!setting) return message.channel.send("Debes incrustar una image al mensaje o puedes escribir las variables `{guild.image}` o `{member.image}`.")
            if(["{member.image}","{guild.image}"].some(x => x.toLowerCase() === setting)){
                await data.updateOne({ "goodbyeConfig.footerImage": setting.toLowerCase() })
                return message.channel.send("Se actualizo el `footerImage`.")
            } 
            else return message.channel.send("Solo se permite en el `footerImage` las variables `{guild.image}` o `{member.image}`.")
        }

        break;

        case "color":

        if(!setting) return message.channel.send("Especifica el color a establecer.")
        if(!setting.match(/^#(?:[0-9a-fA-F]{3}){1,2}$/g)) return message.channel.send("Color invalido.")
        await data.updateOne({ "goodbyeConfig.color": setting })
        message.channel.send("Se actualizo el `color`.")

        break;

        case "timestamp":

        if(setting.toLowerCase() === "on") {
            await data.updateOne({ "goodbyeConfig.timestamp": true})
        } else {
            await data.updateOne({ "goodbyeConfig.timestamp": false})
        }
        message.channel.send("Se actualizo el `timestamp`.")

        break;

        case "title":

        if(!setting) return message.channel.send("Debes especificar el texto a establecer.")
        if(setting.length > 256) return message.channel.send("El `title` no puede pasar los 256 caracteres.")
        await data.updateOne({ "goodbyeConfig.title" : setting })
        message.channel.send("Se actualizo el `title`.")

        break;
    }


}
exports.conf = {
    aliases: []
};
    exports.help = {
    name: "goodbyeedit",
    description: "Configurar el mensaje embed de las despedidas.", 
    usage: "e!goodbyeedit [`parametro`]",
    cooldown: 2
}