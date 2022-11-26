const { MessageEmbed } = require("discord.js")

module.exports.run = async (bot, message, args) => {

    let images = [
        "https://media.discordapp.net/attachments/775135435273011250/792921008880222248/393.jpg",
        "https://media.discordapp.net/attachments/775135435273011250/792921009426006046/394.jpg",
        "https://media.discordapp.net/attachments/775135435273011250/792921010747605002/395.jpg",
        "https://media.discordapp.net/attachments/775135435273011250/792921012299104276/396.jpg",
        "https://media.discordapp.net/attachments/775135435273011250/792921015415341086/397.jpg",
        "https://media.discordapp.net/attachments/775135435273011250/792921017285869638/398.jpg",
        "https://media.discordapp.net/attachments/775135435273011250/792921018711801874/399.jpg",
        "https://media.discordapp.net/attachments/775135435273011250/792921020389654528/400.jpg",
        "https://media.discordapp.net/attachments/775135435273011250/792921021657120768/401.jpg",
        "https://media.discordapp.net/attachments/775135435273011250/792921023145443348/356.jpg",
        "https://media.discordapp.net/attachments/775135435273011250/792921054204788756/365.jpg",
        "https://media.discordapp.net/attachments/775135435273011250/792921060797710376/366.jpg",
        "https://media.discordapp.net/attachments/775135435273011250/792921063658487818/376.jpg",
        "https://media.discordapp.net/attachments/775135435273011250/792921065432809472/377.jpg",
        "https://media.discordapp.net/attachments/775135435273011250/792921067685281812/378.jpg",
        "https://media.discordapp.net/attachments/775135435273011250/792921069736296458/382.jpg",
        "https://media.discordapp.net/attachments/775135435273011250/792921071501312040/383.jpg",
        "https://media.discordapp.net/attachments/775135435273011250/792921072982687744/385.jpg",
        "https://media.discordapp.net/attachments/775135435273011250/792921074546245663/386.jpg",
        "https://media.discordapp.net/attachments/775135435273011250/792921076061175818/387.jpg",
        "https://media.discordapp.net/attachments/775135435273011250/792921096483373066/390.jpg",
        "https://media.discordapp.net/attachments/775135435273011250/792921103047327805/392.jpg"
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
    name: "hentai",
    description: "Obtén la imagen de un hentai(||`No doy nombres por cierto`||)",
    usage: "e!hentai",
    cooldown: 5
}