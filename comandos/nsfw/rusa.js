const { MessageEmbed }= require("discord.js")

module.exports.run = async (bot, message, args) => {

    let images = [
        "https://media.discordapp.net/attachments/775135383905763368/792918788478599178/19507941.gif",
        "https://media.discordapp.net/attachments/775135383905763368/792918791188250664/b0e16466bf64b1dd8fe161df11abe877c3c11036.gif",
        "https://media.discordapp.net/attachments/775135383905763368/792918796120883200/GL1NSvu.gif",
        "https://media.discordapp.net/attachments/775135383905763368/792918796863275018/th-1.gif",
        "https://media.discordapp.net/attachments/775135383905763368/792918805843804220/triple-h-hentai-5.gif",
        "https://media.discordapp.net/attachments/775135383905763368/792918816220774450/3.gif",
        "https://media.discordapp.net/attachments/775135383905763368/792918821392351252/8.gif",
        "https://media.discordapp.net/attachments/775135383905763368/792918853087920148/9.gif",
        "https://media.discordapp.net/attachments/775135383905763368/792918855751303178/tumblr_ovjak9U9h71wps3bio1_540.gif",
        "https://media.discordapp.net/attachments/775135383905763368/792918862114324491/40.gif",
        "https://media.discordapp.net/attachments/775135383905763368/792918866123948032/19019785.gif",
        "https://media.discordapp.net/attachments/775135383905763368/792918867072385104/767_1000.gif",
        "https://media.discordapp.net/attachments/775135383905763368/792918872864194570/60.gif",
        "https://media.discordapp.net/attachments/775135383905763368/792918877175808041/tumblr_o44cxr8vj61rs1r89o1_500.gif",
        "https://media.discordapp.net/attachments/775135383905763368/792918877293379634/19097248.gif",
        "https://media.discordapp.net/attachments/775135383905763368/792918878136958996/1myx8.gif",
        "https://media.discordapp.net/attachments/775135383905763368/792918878375772190/29.gif",
        "https://media.discordapp.net/attachments/775135383905763368/792918900685799454/13.gif",
        "https://media.discordapp.net/attachments/775135383905763368/792918922281615360/tumblr_nr8n4vVFAm1usi2sbo10_500.gif",
        "https://media.discordapp.net/attachments/775135383905763368/792918925180272650/18002445.gif"
    ]
    if(!message.channel.nsfw) return message.channel.cend("Debes utilizar este comando en un canal `NSFW`.")
    let resultado = images[Math.floor(images.length * Math.random())];

    let embed = new MessageEmbed()
    .setImage(resultado)
    .setColor(`RANDOM`)

    message.channel.send({ embeds: [embed] })
}

exports.conf = {
    aliases: []
};
    exports.help = {
    name: "rusa",
    description: "La legendaria rusa.", 
    usage: "e!rusa",
    cooldown: 5
}