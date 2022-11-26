const { MessageEmbed } = require('discord.js');
const { utc } = require('moment');
const { Types } = require("mongoose")
const ms = require("parse-ms")
const fetch = require("node-fetch")
module.exports.run = async (bot, message, args) => {

    let user = message.guild.members.cache.get(args[0]) || message.mentions.members.first() || message.member
    var data = await bot.dataMarry.findOne({userID: user.id})
    if(!data){
        let a = await bot.dataMarry.create({
            _id: Types.ObjectId(),
            userID: user.id,
            marry: null
            })
        data = a
    }

    let api = await ( await fetch(`https://discord.com/api/v8/users/${user.id}`,{ headers: { 'Content-Type': 'application/json', 'Authorization': 'Bot ' + bot.token }}) ).json()
    let flags = {
        "DISCORD_EMPLOYEE": "<:emoji_9:836034466827731034>",
        "PARTNERED_SERVER_OWNER": "<:emoji_4:836034466765733888>",
        "HYPESQUAD_EVENTS": "<:emoji_7:836034466807545886>",
        "BUGHUNTER_LEVEL_1": "<:emoji_10:836034467092365332>",
        "HOUSE_BRAVERY": "<:emoji_5:836034466769666070>",
        "HOUSE_BRILLIANCE": "<:emoji_8:836034466815541288>",
        "HOUSE_BALANCE": "<:emoji_3:836034466765471744>",
        "EARLY_SUPPORTER": "<:emoji_1:836034466618802287>",
        "TEAM_USER": "<:emoji_13:836036143946006539>",
        "SYSTEM": "<:emoji_11:836036143556067339>",
        "BUGHUNTER_LEVEL_2": "<:emoji_2:836034466673459242>",
        "VERIFIED_BOT": "<:emoji_12:836036143774171177>",
        "EARLY_VERIFIED_BOT_DEVELOPER": "<:emoji_6:836034466773991475>"
    }

    let roles = []
    user.roles.cache.sort((a, b) => b.rawPosition - a.rawPosition).forEach(x => roles.push(x))
    let colorRol = roles.filter(a => a.color !== 0).length >= 1 ? roles.filter(a => a.color !== 0)[0] : "Ninguno"
    let allRoles = roles.length > 4 ? `${roles[0]}, ${roles[1]}, ${roles[2]}, ${roles[3]}, **${roles.length - 4} más...**` : roles.join(", ")
    let banderas = user.user.flags === null || user.user.flags.toArray() < 1 ? "Ninguna" : user.user.flags.toArray().map(x => flags[x]).join("")
    let casado = data.marry ? (await bot.users.fetch(data.marry)).tag : "Nadie"
    let embed = new MessageEmbed()
    .setTitle(`__Información de ${user.user.username}__`)
    .setThumbnail(user.user.displayAvatarURL({size: 4096, dynamic: true, format: "png"}))
    .setColor(user.displayHexColor)
    .addField("✿•Información como usuario:", `─━━━━━━⊱❉⊰━━━━━━─\n> `+"`Tag:`"+`${user.user.tag}\n> `+"`ID:`"+`${user.id}\n> `+"`Creo su cuenta el:`"+`${utc(user.user.createdAt).calendar()}` + " hace `(" + `${ms(Date.now() - user.user.createdAt.getTime()).days}`+")`"+` días`+"\n─━━━━━━⊱❉⊰━━━━━━─")
    .addField("✿•Información como miembro:", "─━━━━━━⊱❉⊰━━━━━━─\n> `Se unio el:` "+utc(user.joinedAt).calendar() +" `("+ms(Date.now() - user.joinedAt.getTime()).days+")` días"+"\n> `Rol de Color:`"+`${colorRol}`+"\n> `Roles:` "+`${allRoles}\n─━━━━━━⊱❉⊰━━━━━━─`)
    .addField("✿•Información extra:", "─━━━━━━⊱❉⊰━━━━━━─"+"\n> `Flags:` "+banderas+"\n> `Casad@ con:` "+`${casado}`+"\n─━━━━━━⊱❉⊰━━━━━━─")
    .addField("✿•Permisos:", "```ml\n"+user.permissions.toArray().join(", ")+"```")
    api.banner ? embed.setImage(`https://cdn.discordapp.com/banners/${user.id}/${api.banner}.${api.banner.includes("a_") ? "gif" : "png"}?size=4096`) : undefined

    message.channel.send({ embeds: [embed] })

}
exports.conf = {
    aliases: ['ui']
};
    exports.help = {
    name: "userinfo",
    description: "Obtén información de un usuario", 
    usage: "e!userinfo [@user o `Id` o Nada]",
    cooldown: 5
}