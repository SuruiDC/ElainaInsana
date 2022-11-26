const { MessageEmbed, MessageButton, MessageActionRow, User} = require('discord.js')
const { Api } = require('node-osu');
const osu = new Api(process.env.OSU , {
    notFoundAsError: true,
    completeScores: true
})
const ms = require("parse-ms")
module.exports.run = async (bot, message, args) => {

    if(!args[0]) return message.channel.send('Especifica el modo de juego, `std`, `taiko`. `mania`, `catch`.')
    if(!['std','taiko','mania','catch'].includes(args[0].toLowerCase())) return message.channel.send('Modo de juego invalido, permitido: `std`, `taiko`. `mania`, `catch`')
    if(!args.slice(1).join(' ')) return message.channel.send("Especifica el nick de un jugador de osu.")

    const modes = {
        'std': 0,
        'taiko': 1,
        'catch': 2,
        'mania': 3
    }

    let user = await osu.getUser({ u: args.slice(1).join(" "), m: modes[args[0].toLowerCase()] })
    .catch(e => {
        return message.channel.send("No se encontro un jugador con ese nombre.")
    })

    if(!user || !user.pp) return;

    let userRecent;
    try {
        userRecent = await osu.getUserRecent({ u: args.slice(1).join(" "), m: modes[args[0].toLowerCase()] })
    }
    catch (e) {
        userRecent = undefined
    }

    let profile = new MessageButton()
    .setStyle('LINK')
    .setLabel('Profile')
    .setEmoji("759600909839499315")
    .setURL(`https://osu.ppy.sh/users/${user.id}`)

    let score = new MessageButton()
    .setCustomId('score')
    .setStyle('PRIMARY')
    .setLabel('Get Score info')
    .setEmoji('785212944253583440')

    let button = new MessageButton()
    .setStyle("PRIMARY")
    .setLabel("Get Beatmap info")
    .setCustomId("beatmap")
    .setEmoji("766349092133142549")

    let avatar = new MessageButton()
    .setStyle('LINK')
    .setLabel('Avatar')
    .setEmoji('818737245422092288')
    .setURL(`http://s.ppy.sh/a/${user.id}`)

    let row = new MessageActionRow()
    .addComponents([button, score, profile, avatar])

    let embed = new MessageEmbed()
    .setAuthor({ name: "Osu Stats", iconURL: message.author.displayAvatarURL({dynamic: true})})
    .setThumbnail(`http://s.ppy.sh/a/${user.id}?396`)
    .setColor("RANDOM")
    .addField("Información general:", "<:483994076019163138:777257010433228811> **|** `Nombre:` "+user.name+"\n<a:680110639968288970:777257010638225499> **|** `PP:` "+Math.round(user.pp.raw)+"\n<a:735497401791545355:777257010659983360> **|** `Rank:` "+user.pp.rank.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+"\n<:653581079093051392:777257011019644968> **|** `Nivel:` "+Math.round(user.level)+"\n<:653581137439883264:777257011091603456> **|** `País:` "+`${user.country} :flag_${user.country.toLowerCase()}:`+"\n<:653581192850964482:777257011049005076> **|** `C Rank:` "+user.pp.countryRank)
    .addField("Stats de juego:", "<a:650891794887737374:777257010999328818> **|** `Partidas:` "+user.counts.plays.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+"\n<a:704314206517854209:777257010991071252> **|** `Puntería:` "+user.accuracyFormatted)
    .addField("Puntajes de mapas:", "<:rankingA:940257315402162307> **|** `A:` "+user.counts.A+"\n<:rankingS:940257315746115605> **|** `S:` "+user.counts.S+"\n<:rankingSH:940257315834183700> **|** `SH:` "+user.counts.SH+"\n<:rankingX:940257315628679179> **|** `SS:` "+user.counts.SS+"\n<:rankingXH:940257315754487928> **|** `SH:` "+user.counts.SSH)
    //userRecent ? embed.addField("Juego reciente:", "<a:meguminHacks:851516199481376798> **|** `Puntaje:` "+userRecent[0].score.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+"\n<:kaguyaBlush:851516198902693908> **|** `MaxCombo:` "+userRecent[0].maxCombo+"\n<a:rembaka:849505834320265236> **|** `Calificación:` "+userRecent[0].rank+"\n<a:raphtalia_pat:849506990051950623> **|** `Fecha:` "+userRecent[0].raw_date.split(" ")[0]+"\n<:ayayaya:851518877569384458> **|** `Cuentas:` "+`**50:** ${userRecent[0].counts["50"]} **100:** ${userRecent[0].counts["100"]} **300:** ${userRecent[0].counts["300"]}`) : undefined
    embed.setFooter({ text: `Cuenta creada el ${user.raw_joinDate.split(" ")[0]}`, iconURL: "https://cdn.discordapp.com/attachments/827777231803645972/849503007104434246/OsuLogo_2015.png"}) 
    
    let m = userRecent ? await message.channel.send({ embeds: [embed], components: [row] }) : await message.channel.send({ embeds: [embed] })  

    if(!userRecent) return;

    let x = await osu.getBeatmaps({ b: userRecent[0].beatmapId })
    const filter = (interaction) => interaction.customId === 'beatmap' && interaction.user.id === message.author.id;
    let collector = m.createMessageComponentCollector({ componentType: 'BUTTON', time: 60000 })

    collector.on("collect", async b => {
        if(b.customId === "beatmap"){
            let defer = await b.deferReply({ fetchReply: true })
            defer.delete()

            button.setDisabled(true)
            let jloq = new MessageActionRow()
            .addComponents([button, score, profile, avatar])
            m.edit({
                embeds: [embed],
                components: [jloq]
            })
            let combo = x[0].maxCombo ? x[0].maxCombo : "Indefinido"
            let time = ms(x[0].length.total * 1000)
            let modes = {
                "Standard": "osu",
                "Taiko": "taiko",
                "Mania": "mania",
                "Catch The Beat": "fruits"
            }
            let awa = new MessageEmbed()
            .setTitle(`__${x[0].creator}・${x[0].title}__`)
            .setURL(`https://osu.ppy.sh/beatmapsets/${x[0].beatmapSetId}#${modes[x[0].mode]}/${x[0].id}`)
            .setImage(`https://assets.ppy.sh/beatmaps/${x[0].beatmapSetId}/covers/cover.jpg`)
            .setColor("RANDOM")
            .setThumbnail("https://cdn.discordapp.com/attachments/827777231803645972/849503007104434246/OsuLogo_2015.png")
            .addField(`<a:rembaka:849505834320265236>・Información general del mapa:`, "> `Versión:` "+x[0].version+"\n> `Género:` "+x[0].genre+"\n> `Modo:` "+x[0].mode+"\n> `Estado:` "+x[0].approvalStatus)
            .addField(`<a:raphtalia_pat:849506990051950623>・Información en el juego:`, "> `Dificultad:` "+parseInt(x[0].difficulty.rating).toFixed()+"★\n > `Duración:` "+`${time.minutes}m ${time.seconds}`+"s\n> `MaxCombo:` "+combo+"\n > `Normal:` "+x[0].objects.normal+"\n > `Sliders:` "+x[0].objects.slider+"\n > `Ruletas:` "+x[0].objects.spinner)
            .setFooter(`Publicado el ${x[0].raw_submitDate.split(" ")[0]}`, message.author.displayAvatarURL({dynamic: true}))
            message.channel.send({ embeds: [awa] })
        } else if (b.customId === "score"){
            let defer = await b.deferReply({ fetchReply: true })
            defer.delete()

            score.setDisabled(true)

            let fullCombo = userRecent[0].perfect ? '<a:ElainaYesSuggest:766163036465397821>' : '<a:ElainaNoSuggest:766163261762437141>'
            let scores = {
                'F': "F",
                'D': "<:rankingD:940257315850960958>",
                'C': "<:rankingC:940257315725127750>",
                'B': "<:rankingB:940257315486056459>",
                'A': "<:rankingA:940257315402162307>",
                'S': "<:rankingS:940257315746115605>",
                'SH': "<:rankingSH:940257315834183700>",
                'X': "<:rankingX:940257315628679179>",
                'XH': "<:rankingXH:940257315754487928>"
            }
            let mods = {
                "NoFail": "<:nofail:940280967879340072>",
                "Easy": "<:easy:940280967539593326>",
                "HalfTime": "<:halftime:940280967686410252>",
                "Hidden": "<:hidden:940280967900332032>",
                "DoubleTime": "<:doubletime:940280967338262589>",
                "HardRock": "<:hardrock:940280967728336936>",
                "Nightcore": "<:nightcore:940280968210694154>",
                "SuddenDeath": "<:suddendeath:940280967933878322>",
                "Perfect": "<:perfect:940280967816421486>",
                "Relax": "<:relax:940280967866749048>",
                "AutoPilot": "<:autopilot:940280966461681685>",
                "Cinema": "<:cinema:940280967359254548>",
                "Autoplay": "<:autoplay:940280967397015572>",
                "SpunOut": "<:spunout:940280968164552774>",
                "Target": "<:target:940280967514431499>",
                "Flashlight": "<:flashlight:940280968047099954>"
            }

            let pp = userRecent[0].pp ? userRecent[0].pp : '0'
            let accuracy = userRecent[0].accuracy ? userRecent[0].accuracy : 'Indefinido'
            let allMods = userRecent[0].mods.length < 1 ? "" : '\n<:kaguyaBlush:851516198902693908> **|** `Mods:` '+userRecent[0].mods.filter(a => Object.keys(mods).includes(a)).map(a => `${a} ${mods[a]}`).join('**・**')

            let jloq = new MessageActionRow()
            .addComponents([button, score, profile, avatar])
            m.edit({
                embeds: [embed],
                components: [jloq]
            })

            let scoreEmbed = new MessageEmbed()
            .setAuthor({ name: `${x[0].creator}・${x[0].title}`, iconURL: `http://s.ppy.sh/a/${user.id}?638` })
            .setThumbnail(`https://assets.ppy.sh/beatmaps/${x[0].beatmapSetId}/covers/cover.jpg`)
            .setColor('RANDOM')
            .addField('Información General:', "<:PandaKing:741458575427239947> **|** `MaxCombo:` "+userRecent[0].maxCombo+"\n<:Zero_Sleep:741455980495372366>  **|** `Full Combo:` "+fullCombo+"\n<:KellyEatPopCorn:741458385693704242> **|** `Rank:` "+scores[userRecent[0].rank]+"\n<a:raphtalia_uwu:772909963860639745> **|** `Precisión:` "+accuracy+allMods)
            .addField('Puntajes:', "<:miss:940268843199238144> **|** `Miss:` "+userRecent[0].counts.miss+"<:50hit:940268843413168189> **|** `50:` "+userRecent[0].counts['50']+"<:100hit:940268843429949520> **|** `100:` "+userRecent[0].counts['100']+"\n\n<:300hit:940268843069227168> **|** `300:` "+userRecent[0].counts['300']+"<:katu:940268843195072573> **|** `Katu:` "+userRecent[0].counts.katu+"<:geki:940268843295727616> **|** `Geki:` "+userRecent[0].counts.geki)
            message.channel.send({ embeds: [scoreEmbed] })
        }
    })

    collector.on("end", () => {

        button.setDisabled(true)
        score.setDisabled(true)

        let uwu = new MessageActionRow()
        .addComponents([button, score, profile, avatar])

        m.edit({
            embeds: [embed],
            components: [uwu]
        })   
    })
}

exports.conf = {
    aliases: []
};
    exports.help = {
    name: "osu",
    description: "Obtén información de un jugador de osu del modo estandar.", 
    usage: "e!osu [Nick del Jugador]",
    cooldown: 5
}
