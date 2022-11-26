const { Types } = require("mongoose")

module.exports.run = async (bot, message, args) => {

    if(!message.member.permissions.has("MANAGE_GUILD")) return message.channel.cend("Requieres del permiso de `Gestionar Servidor` para usar este comando.")
 
    var data = await bot.guildsData.findOne({guild: message.guild.id})
    if(data.allyembed.title === null && data.allyembed.description === null && data.allyembed.image === null && data.allyembed.color === null ) {
        return message.channel.cend("Si no tienes nada colocado en el embed no puedes establecerlo.")
    }
    if(data.allyembed.title === null && data.allyembed.description === null && data.allyembed.image === null) {
        await dataActive.updateOne({"allysets.embedActive": null})
        return message.channel.cend("No solo puedes colocar el color del embed debe tener por lo menos titulo para poder establecerlo.")
    }else{
    await data.updateOne({"allysets.embedActive": "on"})
    message.channel.cend("Se establecio el mensaje embed")
    }
}

exports.conf = {
    aliases: []
};
    exports.help = {
    name: "setembed",
    description: "Establece que el embed para las alianzas.",
    usage: "e!setembed",
    cooldown: 5
}
