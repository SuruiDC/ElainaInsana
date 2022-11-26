const { MessageEmbed } = require("discord.js");

module.exports.run = async (bot, message, args) => {


    let categorias = args[0]
    if(!categorias) return message.channel.cend(`Menciona una categoría para mostrarte los comandos.`).then(a => setTimeout(() => a.delete(), 60000))
    categorias = args[0].toLowerCase()
    const categorías = ["config","fun","interaction","info","traductor","moderation","nsfw","automod","ally","music","entries"]

    if(!categorías.some(a => categorias.toLowerCase() === a)) return message.channel.cend("**(<a:No:766163261762437141>)** Categoría invalida **(<a:No:766163261762437141>)**").then(a => a.delete({timeout: 60000}))
    if(categorias === "config"){

        let config = new MessageEmbed()
        .setTitle(`**__Comandos de configuración__**`)
        .setColor(`#fffefe`)
        .addField("**Configuración:**", "<a:White:766148148904067082>**╎**Suggest-setchannel\n<a:White:766148148904067082>**╎**Logs-setchannel\n<a:White:766148148904067082>**╎**Poll-setchannel\n<a:White:766148148904067082>**╎**SetPrefix\n<a:White:766148148904067082>**╎**ResetPrefix\n<a:White:766148148904067082>**╎**Osu-beatmap")
        .setFooter(`Elaina`, bot.user.displayAvatarURL())

        message.channel.send({ embeds: [config] }).then(a => setTimeout(() => a.delete(), 60000))
    }

    if(categorias === "fun") {
           
        let fun = new MessageEmbed()
        .setTitle(`**__Comandos de diversión__**`)
        .setColor(`#fffefe`)
        .addField(`**Diversión:**`, `<a:White:766148148904067082>**╎**Rol\n<a:White:766148148904067082>**╎**Anime\n<a:White:766148148904067082>**╎**Osu\n<a:White:766148148904067082>**╎**Coin\n<a:White:766148148904067082>**╎**8ball\n<a:White:766148148904067082>**╎**Say\n<a:White:766148148904067082>**╎**Fortnite\n<a:White:766148148904067082>**╎**Marry\n<a:White:766148148904067082>**╎**Divorce\n<a:White:766148148904067082>**╎**Mc-server\n<a:White:766148148904067082>**╎**Mc-skin\n<a:White:766148148904067082>**╎**Weather\n<a:White:766148148904067082>**╎**Summoner\n<a:White:766148148904067082>**╎**Dthings\n<a:White:766148148904067082>**╎**BestChamps\n<a:White:766148148904067082>**╎**Maps`)
        .setFooter(`Elaina`, bot.user.displayAvatarURL())

        message.channel.send({ embeds: [fun] }).then(a => setTimeout(() => a.delete(), 60000))
    }

    if(categorias === "info"){
        
        let info = new MessageEmbed()
        .setTitle(`**__Comandos de información__**`)
        .setColor(`#fffefe`)
        .addField(`**Información:**`, `<a:White:766148148904067082>**╎**Serverinfo\n<a:White:766148148904067082>**╎**Userinfo\n<a:White:766148148904067082>**╎**Emojis\n<a:White:766148148904067082>**╎**Roles\n<a:White:766148148904067082>**╎**Suggest\n<a:White:766148148904067082>**╎**Poll\n<a:White:766148148904067082>**╎**Avatar\n<a:White:766148148904067082>**╎**Servericon\n<a:White:766148148904067082>**╎**Embed\n<a:White:766148148904067082>**╎**Jumbo\n<a:White:766148148904067082>**╎**ReporteBug\n<a:White:766148148904067082>**╎**Help\n<a:White:766148148904067082>**╎**Commands\n<a:White:766148148904067082>**╎**Status\n<a:White:766148148904067082>**╎**MemberStatus\n<a:White:766148148904067082>**╎**Botlist`)
        .setFooter(`Elaina`, bot.user.displayAvatarURL())

        message.channel.send({ embeds: [info] }).then(a => setTimeout(() => a.delete(), 60000))
    }

    if(categorias === "interaction"){

        let interacion = new MessageEmbed()
        .setTitle(`**__Comandos de interacción__**`)
        .setColor(`#fffefe`)
        .addField(`**Interacción:**`, "<a:White:766148148904067082>**╎**Kiss\n<a:White:766148148904067082>**╎**Hug\n<a:White:766148148904067082>**╎**Slap\n<a:White:766148148904067082>**╎**Kill\n<a:White:766148148904067082>**╎**Sleep\n<a:White:766148148904067082>**╎**Bored\n<a:White:766148148904067082>**╎**Cry\n<a:White:766148148904067082>**╎**Happy\n<a:White:766148148904067082>**╎**Fbi\n<a:White:766148148904067082>**╎**Angry\n<a:White:766148148904067082>**╎**Pat\n<a:White:766148148904067082>**╎**Suicide\n<a:White:766148148904067082>**╎**Hi\n<a:White:766148148904067082>**╎**Scared\n<a:White:766148148904067082>**╎**Lick\n<a:White:766148148904067082>**╎**Claps\n<a:White:766148148904067082>**╎**Run\n<a:White:766148148904067082>**╎**Laugh")
        .setFooter(`Elaina`, bot.user.displayAvatarURL())

        message.channel.send({ embeds: [interacion] }).then(a => setTimeout(() => a.delete(), 60000))
    }

    if(categorias === "moderation"){

        let moderation = new MessageEmbed()
        .setTitle(`**__Comandos de moderación__**`)
        .setColor(`#fffefe`)
        .addField(`**Moderación:**`, `<a:White:766148148904067082>**╎**Ban\n<a:White:766148148904067082>**╎**Kick\n<a:White:766148148904067082>**╎**Warn\n<a:White:766148148904067082>**╎**Warnings\n<a:White:766148148904067082>**╎**Clear\n<a:White:766148148904067082>**╎**Clearwarns\n<a:White:766148148904067082>**╎**Forceban\n<a:White:766148148904067082>**╎**Addrole`)
        .setFooter(`Elaina`, bot.user.displayAvatarURL())

        message.channel.send({ embeds: [moderation] }).then(a => setTimeout(() => a.delete(), 60000))
    }

    if(categorias === "traductor") {

        let traductor = new MessageEmbed()
        .setTitle(`**__Comandos de traducción__**`)
        .setColor("#fffefe")
        .addField("**Traducción:**", "<a:White:766148148904067082>**╎**Español `De ingles a español`\n<a:White:766148148904067082>**╎**Ingles `De español a ingles`")
        .setFooter(`Elaina`, bot.user.displayAvatarURL())

        message.channel.send({ embeds: [traductor] }).then(a => setTimeout(() => a.delete(), 60000))
    }

    if(categorias === "nsfw") {

        let nsfw = new MessageEmbed()
        .setTitle("**__Comandos NSFW__**")
        .setColor("#fffefe")
        .addField("**Nsfw:**", `<a:White:766148148904067082>**╎**Fuck\n<a:White:766148148904067082>**╎**Cum\n<a:White:766148148904067082>**╎**Hentai\n<a:White:766148148904067082>**╎**Rusa`)
        .setFooter(`Elaina`, bot.user.displayAvatarURL())

        message.channel.send({ embeds: [nsfw] }).then(a => setTimeout(() => a.delete(), 60000))
    }

    if(categorias === "automod"){
        let automod = new MessageEmbed()
        .setTitle("__Comandos AutoMod__")
        .setColor("#fffefe")
        .addField("AutoMod:", `<a:White:766148148904067082>**╎**AutoMod\n<a:White:766148148904067082>**╎**AntiInvites\n<a:White:766148148904067082>**╎**AntiLinks`)
        .setFooter(`Elaina`, bot.user.displayAvatarURL())
        
        message.channel.send({ embeds: [automod] }).then(a => setTimeout(() => a.delete(), 60000))
    }

    if(categorias === "ally"){
        let ally = new MessageEmbed()
        .setTitle(`__Comandos Alianzas__`)
        .setColor("#fffefe")
        .addField("Ally:", `<a:White:766148148904067082>**╎**SetStaff\n<a:White:766148148904067082>**╎**SetChannel\n<a:White:766148148904067082>**╎**SetMention\n<a:White:766148148904067082>**╎**MentionRole\n<a:White:766148148904067082>**╎**EditEmbed\n<a:White:766148148904067082>**╎**ViewEmbed\n<a:White:766148148904067082>**╎**Points\n<a:White:766148148904067082>**╎**Variables\n<a:White:766148148904067082>**╎**SetEmbed`)
        .setFooter(`Elaina`, bot.user.displayAvatarURL())

        message.channel.send({ embeds: [ally] }).then(a => setTimeout(() => a.delete(), 60000))
    }
    if(categorias === "music"){
        let music = new MessageEmbed()
        .setTitle("__Comandos de Música__")
        .setColor("#fffefe")
        .addField("Music:", `<a:White:766148148904067082>**╎**Play\n<a:White:766148148904067082>**╎**Playlist\n<a:White:766148148904067082>**╎**Skip\n<a:White:766148148904067082>**╎**Skipto\n<a:White:766148148904067082>**╎**Stop\n<a:White:766148148904067082>**╎**Pause\n<a:White:766148148904067082>**╎**Resume\n<a:White:766148148904067082>**╎**Bucle\n<a:White:766148148904067082>**╎**Remove\n<a:White:766148148904067082>**╎**Queue`)
        .setFooter(`Elaina`, bot.user.displayAvatarURL())
        
        message.channel.send({ embeds: [music] }).then(a => setTimeout(() => a.delete(), 60000))
    }
    if(categorias === "entries"){
        let entries = new MessageEmbed()
        .setTitle("__Comandos de Entradas__")
        .setColor("#fffefe")
        .addField("Entries:", "<a:White:766148148904067082>**╎**Setwelcome\n<a:White:766148148904067082>**╎**Setgoodbye\n<a:White:766148148904067082>**╎**Welcomeedit\n<a:White:766148148904067082>**╎**Goodbyeedit\n<a:White:766148148904067082>**╎**Deleteconfig\n<a:White:766148148904067082>**╎**Entriesguide\n<a:White:766148148904067082>**╎**Entriesvariables\n<a:White:766148148904067082>**╎**Welcomemention")
        .setFooter(`Elaina`, bot.user.displayAvatarURL())

        message.channel.send({ embeds: [entries] }).then(a => setTimeout(() => a.delete(), 60000))
    }
}

exports.conf = {
    aliases: ['commands']
};
    exports.help = {
    name: "commands",
    description: "Lista de comandos de cada categoría de Elaina.", 
    usage: "e!commands [categoría]",
    cooldown: 3
}