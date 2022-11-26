const { MessageEmbed } = require("discord.js")
const { utc } = require('moment');

module.exports.run = async (bot, message, args) => {

    let guild = message.guild
    let regions = {
        "brazil": ":flag_br:Brazil",
        "hongkong": ":flag_hk:Hong Kong",
        "europe": ":flag_eu:Europa",
        "india": ":flag_in:India",
        "japan": ":flag_jp:Japón",
        "russia": ":flag_ru:Rusia",
        "singapore": ":flag_sg:Singapore",
        "sydney": ":flag_au:Sydney",
        "southafrica": ":flag_za:South Africa",
        "us-central": ":flag_us:Us Central",
        "us-east": ":flag_us:Us East",
        "us-south": ":flag_us:Us South",
        "us-west": ":flag_us:Us West"
    }
    
    let verification = {
        "NONE": "Ninguno",
        "LOW": "Bajo",
        "MEDIUM": "Medio",
        "HIGH": "Alto",
        "VERY_HIGHT": "Muy alto"
    }

    let features = {
        ANIMATED_ICON: `> [Icono](${guild.iconURL({
          dynamic: true,
          size: 2048,
        })})`,
        BANNER: `> ${guild.banner ? `[Banner](${guild.bannerURL({ size: 2048 })})` : ``}`,
        INVITE_SPLASH: guild.splash ? `> [Splash Imagen](${guild.splashURL({ size: 2048 })})` : '',
        PUBLIC: '> Server Público',
        PARTNERED: '> Server asociado'
      };

    let owner = await message.guild.fetchOwner()
    let embed = new MessageEmbed()
    .setTitle(`**__Infomarción General de ${guild.name}__**`)
    .setColor(`RANDOM`)
    .setThumbnail(guild.iconURL({dynamic: true, size: 4096, format: "png"}))
    .addField("Información General:", "─━━━━━━⊱❉⊰━━━━━━─\n> `Owner`: "+owner.toString()+" `"+owner.id+"`\n> `Nombre:` "+guild.name+" `"+guild.id+"`\n─━━━━━━⊱❉⊰━━━━━━─")
    .addField("Estadísticas:",  "─━━━━━━⊱❉⊰━━━━━━─\n> `Miembros`: "+guild.memberCount+"\n> `Roles:` "+guild.roles.cache.size+"\n> `Emojis:` "+guild.emojis.cache.size+"\n> `Canales:` "+guild.channels.cache.size+"\n─━━━━━━⊱❉⊰━━━━━━─")
    .setFooter(`Servidor creado el ${utc(guild.createdAt).calendar()}`, message.author.displayAvatarURL({ dynamic: true }))
    
    if(guild.premiumTier !== "NONE"){
        let promo = []
        for (var i of guild.features.map(f => features[f] ? features[f] : undefined)){
            !i ? undefined : promo.push(i)
        }
        embed.addField("Privilegios:", "─━━━━━━⊱❉⊰━━━━━━─\n"+promo.join("\n").trim() +"\n─━━━━━━⊱❉⊰━━━━━━─")
    }
    message.channel.send({ embeds: [embed] })
}

exports.conf = {
    aliases: ['svi']
};
    exports.help = {
    name: "serverinfo",
    description: "Obtén la información del servidor.", 
    usage: "e!serverinfo",
    cooldown: 5
}