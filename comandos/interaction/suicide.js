const { MessageEmbed } = require("discord.js")

module.exports.run = async (bot, message, args) => {

    let images = [
        "https://media.discordapp.net/attachments/775783903071305758/775784102459867146/7b5860639cc997025ff5dedcd56efcb31ebf8baf_hq.gif",
        "https://media.discordapp.net/attachments/775783903071305758/775784140996870194/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f.gif",
        "https://media.discordapp.net/attachments/775783903071305758/775784158949015572/d477b268985b5cabb15544be3fdaa8de829b38ae_hq.gif",
        "https://media.discordapp.net/attachments/775783903071305758/775784160769212466/tenor.gif",
        "https://media.discordapp.net/attachments/775783903071305758/775784223616532501/158636fca19b2cbb3e3f72043789750a.gif",
        "https://media.discordapp.net/attachments/775783903071305758/775784565109293056/24252787f13d93aa72b97f1706924e25.gif",
        "https://media.discordapp.net/attachments/775783903071305758/775784909733232660/e3876d_95e8aaf635e04294a15f5d940c650a46.gif",
        "https://media.discordapp.net/attachments/775783903071305758/775784978730319932/tumblr_o2xiuwAcJM1tvf17eo1_500.gif",
        "https://media.discordapp.net/attachments/775783903071305758/775785437150314546/tenor_1.gif",
        "https://media.discordapp.net/attachments/775783903071305758/775786108830351380/4865b73633025e52f178ec8921a593f5.gif",
        "https://media.discordapp.net/attachments/775783903071305758/775786806099574784/069b6fe199e8369733e97f920cd55b4f.gif",
        "https://media.discordapp.net/attachments/775783903071305758/775788380197617684/e3b7f5311ad4894c9bdb1850392de9a9bb5e4860_hq.gif",
        "https://media.discordapp.net/attachments/775783903071305758/775788682837098506/49ce27c3045496be1ed6b785c610353517a2c3a8_hq.gif",
        "https://media.discordapp.net/attachments/775783903071305758/775790503538589766/tumblr_n162c75CNl1tr6879o1_500.gif",
        "https://media.discordapp.net/attachments/775783903071305758/775800554731339807/tumblr_lxfqnyYrAX1qio1obo1_500.gif",
        "https://media.discordapp.net/attachments/775783903071305758/775800730195722271/d6569d453ad83ee8-suicide-anime-pinterest-kagerou-project-and-anime.gif",
        "https://media.discordapp.net/attachments/775783903071305758/775800797379690526/tenor_2.gif",
        "https://media.discordapp.net/attachments/775783903071305758/775801265241849856/tumblr_67eee85f1e8ca83906c3db4a1eb2c943_5a85d325_400.gif",
        "https://media.discordapp.net/attachments/775783903071305758/775801715823214652/182542841000202.gif"
    ]
    let resultado = images[Math.floor(images.length * Math.random())];

    let embed = new MessageEmbed()
    .setDescription(`${message.author} se ha suicidado.`)
    .setImage(resultado)
    .setColor(`RANDOM`)

    message.channel.send({ embeds: [embed] })
}

exports.conf = {
    aliases: []
};
exports.help = {
    name: "suicide",
    description: "Suicidate sin más.", 
    usage: "e!suicide",
    cooldown: 3
}