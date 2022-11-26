const { MessageEmbed } = require("discord.js")

module.exports.run = async (bot, message, args) => {


    let resultado = bot.interaction.angry[Math.floor(bot.interaction.angry.length * Math.random())];
    let usuario = message.mentions.users.first();

    if(usuario) {
        if(usuario === message.author) return message.channel.send("No puedes molestarte contigo mismo.")
        if(!message.author === usuario) return message.channel.cend("No puedes molestarte contigo mismo.")
        let embed = new MessageEmbed()
        .setDescription(`${message.author} se ha enojado con ${usuario}.<:AngryPanda:741458686744068126>`)
        .setImage(resultado)
        .setColor("RANDOM")

        message.channel.send({ embeds: [embed] })
    } else {

        let embed2 = new MessageEmbed()
        .setDescription(`${message.author} se ha enojado.<:AngryPanda:741458686744068126>`)
        .setImage(resultado)
        .setColor(`RANDOM`)

        message.channel.send({ embeds: [embed2] })
    }

}

exports.conf = {
    aliases: []
};
    exports.help = {
    name: "angry",
    description: "Molestate simplemente o con alguien en especifico.", 
    usage: "e!angry [@user o Nada]",
    cooldown: 3
}
