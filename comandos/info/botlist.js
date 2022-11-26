const { MessageEmbed } = require("discord.js")

module.exports.run = async (bot, message, args) => {
    let embed = new MessageEmbed()
    .setTitle("__Bot Lists__")
    .setThumbnail(bot.user.displayAvatarURL({size: 1024}))
    .setColor("#fffefe")
    .setDescription("**✿⊰[Portal My Bot](https://portalmybot.com)**\nhttps://portalmybot.com/mybotlist/bot/720509373020897331 \n\n**✿⊰[Discord Things](https://discordthings.com)**\nhttps://discordthings.com/bot/720509373020897331 \n\n**✿⊰[AuraList](https://auralist.glitch.me)** \nhttps://auralist.glitch.me/bots/720509373020897331 \n\n**✿⊰[NeoList](https://neolist.glitch.me)** \nhttps://neolist.glitch.me/bots/720509373020897331\n\n**✿⊰[Discord Boats]( https://discord.boats/)** \nhttps://discord.boats/bot/720509373020897331")
    message.channel.send({ embeds: [embed] })
}
exports.conf = {
    aliases: ['btl']
};
    exports.help = {
    name: "botlist",
    description: "Lista de botlists donde se encuentra Elaina.", 
    usage: "e!botlist",
    cooldown: 5
}