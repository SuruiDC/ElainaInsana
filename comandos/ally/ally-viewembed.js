const { MessageEmbed } = require("discord.js");

module.exports.run = async (bot, message, args) => {

    if(!message.member.permissions.has("MANAGE_GUILD")) return message.channel.cend("Requieres del permiso de `Gestionar Servidor` para usar este comando.")
    var data = await bot.guildsData.findOne({guild: message.guild.id})
    let title = data.allyembed.title
    let description = data.allyembed.description
    let color = data.allyembed.color
    let image = data.allyembed.image
    
    let embed = new MessageEmbed()
    
    if(!title){
        embed.setTitle("__No establecido__")
    }else{
        embed.setTitle(title)
    }
    if(!description){
        embed.setDescription("[No establecido]")
    }else{
        embed.setDescription(description)
    }
    if(!color){
        embed.setFooter("Color no establecido")
    }else{
        embed.setColor(color)
    }
    if(!image){
        embed.setImage("https://media.discordapp.net/attachments/757994881087176845/779882484170883103/NotImage.jpg")
    }else{
        embed.setImage(image)
    }

    message.channel.send({ embeds: [embed] })
}
exports.conf = {
    aliases: []
};
    exports.help = {
    name: "viewembed",
    description: "Muestra como esta configurado el embed de alianza.", 
    usage: "e!viewembed",
    cooldown: 5
}