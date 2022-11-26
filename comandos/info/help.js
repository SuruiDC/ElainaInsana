const { MessageEmbed } = require("discord.js")
const { Types } = require("mongoose")
module.exports.run = async (bot, message, args) => {

    var data = await bot.guildsData.findOne({guild: message.guild.id})
    let prefix = data.config.prefix ? data.config.prefix : "e!"
        let embed = new MessageEmbed()
        .setTitle(`**__Mis comandos__**`)
        .setColor(`#fffefe`)
        .setThumbnail(bot.user.displayAvatarURL({size: 1024}))
        .addField(`**✿⊰Mi prefix:**`, `${prefix}`)
        .addField(`**✿⊰Uso:**`, `${prefix}commands [categoría]`)
        .addField(`**✿⊰Categorías:**`, "・`Config`\n・`Interaction`\n・`Moderation`\n・`Info`\n・`Fun`\n・`Traductor`\n・`NSFW`\n・`Automod`\n・`Ally`\n・`Music`\n・`Entries`")
        .addField("**✿⊰Info Extra:**", `[Invite](https://discord.com/oauth2/authorize?client_id=720509373020897331&permissions=1241178828023&scope=bot%20applications.commands) **|** [Soporte](https://discord.gg/zQfdFwZ) **|** [Creador](https://github.com/SuruiDC) **|** [DiscordThings](https://discordthings.com/bot/720509373020897331) **|** [Website](https://elaina-web.netlify.app)`)
        .setImage("https://media.discordapp.net/attachments/720840538538115183/816934122017652736/cropped-1366-768-1114171.jpg?width=761&height=428")
        .setFooter(`Elaina`, bot.user.displayAvatarURL())

    message.channel.send({ embeds: [embed] })
    
}
exports.conf = {
    aliases: ['h']
};
    exports.help = {
    name: "help",
    description: "Comando de ayuda para Elaina.", 
    usage: "e!help",
    cooldown: 3
}