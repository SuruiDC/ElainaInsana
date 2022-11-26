const { MessageEmbed } = require('discord.js');
const { Api } = require('node-osu');
const osu = new Api(process.env.OSU , {
    notFoundAsError: true,
    completeScores: false 
})

module.exports.run = async (bot, message, args) => {
    
    const user = args.join(" ")

    if(!user) return message.channel.send({ embeds: [ 
        new MessageEmbed()
        .setColor(bot.color)
        .setDescription('<a:raphtalia_pat:849506990051950623> **|** Debes especificar el nombre de usuario de osu.')
    ]})
    try {
        var info = await osu.getUserBest({ u: user })
        var infoUser = await osu.getUser({ u: user })
    } catch (e) {
        message.channel.send({ embeds: [
            new MessageEmbed()
            .setDescription('No se pudieron obtener los mejores puntajes o el usuario no existe.')
            .setColor(bot.color)
        ]})
        return;
    }

    const msg = await message.channel.send({ embeds: [
        new MessageEmbed()
        .setDescription('Cargando los puntajes del jugador.')
        .setColor(bot.color)
    ]})

    const scores = []
    
    for (var i of info){
        scores.push(await osu.getBeatmaps({ b: i.beatmapId }))
    }
    
    
    msg.delete().catch(e => {})

    let modes = {
        "Standard": "osu",
        "Taiko": "taiko",
        "Mania": "mania",
        "Catch The Beat": "fruits"
    }

    const description = []
    let index = 1
    
    for(var x of scores){
        description.push(`**[${index}・${x[0].title}:](https://osu.ppy.sh/beatmapsets/${x[0].beatmapSetId}#${modes[x[0].mode]}/${x[0].id})**`)
        description.push(`> <a:rembaka:849505834320265236> | \`Puntaje:\` ${info[index - 1].score.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} **-** <:kaguyaBlush:851516198902693908> | \`MaxCombo:\` ${info[index - 1].maxCombo}\n> <a:meguminHacks:851516199481376798> | \`Estadísticas:\` **50:** ${info[index - 1].counts["50"]}, **100:** ${info[index - 1].counts["100"]}, **300:** ${info[index - 1].counts["300"]}`)
        index = index + 1
    }

    let embed = new MessageEmbed()
    .setAuthor(`Mejores puntajes en osu de ${infoUser.name}`, message.author.displayAvatarURL({ dynamc: true }))
    .setThumbnail(`http://s.ppy.sh/a/${infoUser.id}`)
    .setColor('RANDOM')
    .setDescription(description.join('\n'))

    message.channel.send({ embeds: [embed] })
}
exports.conf = {
    aliases: []
};
    exports.help = {
    name: "maps",
    description: "Obtén los mejores puntajes de un jugador de osu.", 
    usage: "e!maps [Nick del Jugador]",
    cooldown: 5
}