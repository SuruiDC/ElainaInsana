const { Types } = require("mongoose")
const { Api } = require("node-osu")
const osu = new Api(process.env.OSU , {
    notFoundAsError: true,
    completeScores: false 
})
const ms = require("parse-ms")
const { MessageEmbed } = require("discord.js")
module.exports = {
    async run(bot, message){
        var data = await bot.guildsData.findOne({guild: message.guild.id})
        if(data.osu.standar){
            if(message.content.match(/https:[//]+osu.ppy.sh[/]beatmapsets[/]\d*#osu[/]\d*/g)){
                osu.getBeatmaps({b: message.content.match(/https:[//]+osu.ppy.sh[/]beatmapsets[/]\d*#osu[/]\d*/g)[0].split("/")[5]}).then(x => {
                    if(!message.channel.permissionsFor(message.guild.me).has("EMBED_LINKS")) return message.channel.cend("El sistema de osu esta activado pero no tengo permisos para enviar la información.")
                    let time = ms(x[0].length.total * 1000)
                    let embed = new MessageEmbed()
                    .setTitle(`__${x[0].creator}・${x[0].title}__`)
                    .setURL(`https://osu.ppy.sh/beatmapsets/${x[0].beatmapSetId}#osu/${x[0].id}`)
                    .setImage(`https://assets.ppy.sh/beatmaps/${x[0].beatmapSetId}/covers/cover.jpg`)
                    .setColor("RANDOM")
                    .setThumbnail("https://cdn.discordapp.com/attachments/827777231803645972/849503007104434246/OsuLogo_2015.png")
                    .addField(`<a:rembaka:849505834320265236>・Información general del mapa:`, "> `Versión:` "+x[0].version+"\n> `Género:` "+x[0].genre+"\n> `Modo:` "+x[0].mode+"\n> `Estado:` "+x[0].approvalStatus)
                    .addField(`<a:raphtalia_pat:849506990051950623>・Información en el juego:`, "> `Dificultad:` "+parseInt(x[0].difficulty.rating).toFixed()+"★\n > `Duración:` "+`${time.minutes}m ${time.seconds}`+"s\n> `MaxCombo:` "+x[0].maxCombo+"\n > `Normal:` "+x[0].objects.normal+"\n > `Sliders:` "+x[0].objects.slider+"\n > `Ruletas:` "+x[0].objects.spinner)
                    .setFooter(`Publicado el ${x[0].raw_submitDate.split(" ")[0]}`, message.author.displayAvatarURL({dynamic: true}))
                    message.channel.send({ embeds: [embed] })
                })
                .catch(x => message.channel.cend("Mapa no encontrado."))
            }
        }

        if(data.osu.mania){
            if(message.content.match(/https:[//]+osu.ppy.sh[/]beatmapsets[/]\d*#mania[/]\d*/g)){
                osu.getBeatmaps({ b: message.content.match(/https:[//]+osu.ppy.sh[/]beatmapsets[/]\d*#mania[/]\d*/g)[0].split("/")[5]}).then(x => {
                    if(!message.channel.permissionsFor(message.guild.me).has("EMBED_LINKS")) return message.channel.cend("El sistema de osu esta activado pero no tengo permisos para enviar la información.")
                    let combo = x[0].maxCombo ? x[0].maxCombo : "Indefinido"
                    let time = ms(x[0].length.total * 1000)
                    let embed = new MessageEmbed()
                    .setTitle(`__${x[0].creator}・${x[0].title}__`)
                    .setURL(`https://osu.ppy.sh/beatmapsets/${x[0].beatmapSetId}#mania/${x[0].id}`)
                    .setImage(`https://assets.ppy.sh/beatmaps/${x[0].beatmapSetId}/covers/cover.jpg`)
                    .setColor("RANDOM")
                    .setThumbnail("https://cdn.discordapp.com/attachments/827777231803645972/849503007104434246/OsuLogo_2015.png")
                    .addField(`<a:rembaka:849505834320265236>・Información general del mapa:`, "> `Versión:` "+x[0].version+"\n> `Género:` "+x[0].genre+"\n> `Modo:` "+x[0].mode+"\n> `Estado:` "+x[0].approvalStatus)
                    .addField(`<a:raphtalia_pat:849506990051950623>・Información en el juego:`, "> `Dificultad:` "+parseInt(x[0].difficulty.rating).toFixed()+"★\n > `Duración:` "+`${time.minutes}m ${time.seconds}`+"s\n> `MaxCombo:` "+combo+"\n > `Normal:` "+x[0].objects.normal+"\n > `Sliders:` "+x[0].objects.slider+"\n > `Ruletas:` "+x[0].objects.spinner)
                    .setFooter(`Publicado el ${x[0].raw_submitDate.split(" ")[0]}`, message.author.displayAvatarURL({dynamic: true}))
                    message.channel.send({ embeds: [embed] })
                })
                .catch(x => message.channel.cend("Mapa no encontrado."))
            }
        }

        if(data.osu.taiko){
            if(message.content.match(/https:[//]+osu.ppy.sh[/]beatmapsets[/]\d*#taiko[/]\d*/g)){
                osu.getBeatmaps({ b: message.content.match(/https:[//]+osu.ppy.sh[/]beatmapsets[/]\d*#taiko[/]\d*/g)[0].split("/")[5]}).then(x => {
                    if(!message.channel.permissionsFor(message.guild.me).has("EMBED_LINKS")) return message.channel.cend("El sistema de osu esta activado pero no tengo permisos para enviar la información.")
                    let combo = x[0].maxCombo ? x[0].maxCombo : "Indefinido"
                    let time = ms(x[0].length.total * 1000)
                    let embed = new MessageEmbed()
                    .setTitle(`__${x[0].creator}・${x[0].title}__`)
                    .setURL(`https://osu.ppy.sh/beatmapsets/${x[0].beatmapSetId}#taiko/${x[0].id}`)
                    .setImage(`https://assets.ppy.sh/beatmaps/${x[0].beatmapSetId}/covers/cover.jpg`)
                    .setColor("RANDOM")
                    .setThumbnail("https://cdn.discordapp.com/attachments/827777231803645972/849503007104434246/OsuLogo_2015.png")
                    .addField(`<a:rembaka:849505834320265236>・Información general del mapa:`, "> `Versión:` "+x[0].version+"\n> `Género:` "+x[0].genre+"\n> `Modo:` "+x[0].mode+"\n> `Estado:` "+x[0].approvalStatus)
                    .addField(`<a:raphtalia_pat:849506990051950623>・Información en el juego:`, "> `Dificultad:` "+parseInt(x[0].difficulty.rating).toFixed()+"★\n > `Duración:` "+`${time.minutes}m ${time.seconds}`+"s\n> `MaxCombo:` "+combo+"\n > `Normal:` "+x[0].objects.normal+"\n > `Sliders:` "+x[0].objects.slider+"\n > `Ruletas:` "+x[0].objects.spinner)
                    .setFooter(`Publicado el ${x[0].raw_submitDate.split(" ")[0]}`, message.author.displayAvatarURL({dynamic: true}))
                    message.channel.send({ embeds: [embed] })
                })
                .catch(x => message.channel.cend("Mapa no encontrado."))
            }
        }

        if(data.osu.catch){
            if(message.content.match(/https:[//]+osu.ppy.sh[/]beatmapsets[/]\d*#fruits[/]\d*/g)){
                osu.getBeatmaps({ b: message.content.match(/https:[//]+osu.ppy.sh[/]beatmapsets[/]\d*#fruits[/]\d*/g)[0].split("/")[5]}).then(x => {
                    if(!message.channel.permissionsFor(message.guild.me).has("EMBED_LINKS")) return message.channel.cend("El sistema de osu esta activado pero no tengo permisos para enviar la información.")
                    let combo = x[0].maxCombo ? x[0].maxCombo : "Indefinido"
                    let time = ms(x[0].length.total * 1000)
                    let embed = new MessageEmbed()
                    .setTitle(`__${x[0].creator}・${x[0].title}__`)
                    .setURL(`https://osu.ppy.sh/beatmapsets/${x[0].beatmapSetId}#fruits/${x[0].id}`)
                    .setImage(`https://assets.ppy.sh/beatmaps/${x[0].beatmapSetId}/covers/cover.jpg`)
                    .setColor("RANDOM")
                    .setThumbnail("https://cdn.discordapp.com/attachments/827777231803645972/849503007104434246/OsuLogo_2015.png")
                    .addField(`<a:rembaka:849505834320265236>・Información general del mapa:`, "> `Versión:` "+x[0].version+"\n> `Género:` "+x[0].genre+"\n> `Modo:` "+x[0].mode+"\n> `Estado:` "+x[0].approvalStatus)
                    .addField(`<a:raphtalia_pat:849506990051950623>・Información en el juego:`, "> `Dificultad:` "+parseInt(x[0].difficulty.rating).toFixed()+"★\n > `Duración:` "+`${time.minutes}m ${time.seconds}`+"s\n> `MaxCombo:` "+combo+"\n > `Normal:` "+x[0].objects.normal+"\n > `Sliders:` "+x[0].objects.slider+"\n > `Ruletas:` "+x[0].objects.spinner)
                    .setFooter(`Publicado el ${x[0].raw_submitDate.split(" ")[0]}`, message.author.displayAvatarURL({dynamic: true}))
                    message.channel.send({ embeds: [embed] })
                })
                .catch(x => message.channel.cend("Mapa no encontrado."))
            }
        }                    
    }
}