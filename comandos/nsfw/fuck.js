const { MessageEmbed } = require("discord.js")

module.exports.run = async (bot, message, args) => {

    let images = [
        "https://media.discordapp.net/attachments/775135422124785705/779474720247644197/zPYZJBpF.gif",
        "https://media.discordapp.net/attachments/775135422124785705/779474721305264138/yxDVP85j.gif",
        "https://media.discordapp.net/attachments/775135422124785705/779474723071197225/2O5iI76P.gif",
        "https://media.discordapp.net/attachments/775135422124785705/779474736152313856/4AzYvXWP.gif",
        "https://media.discordapp.net/attachments/775135422124785705/779474737512448010/aq3LCVJd.gif",
        "https://media.discordapp.net/attachments/775135422124785705/779474740980350986/BWvAQd58.gif",
        "https://media.discordapp.net/attachments/775135422124785705/779474746798374952/2WvCv5qn.gif",
        "https://media.discordapp.net/attachments/775135422124785705/779474753240694814/bxIdgNFU.gif",
        "https://media.discordapp.net/attachments/775135422124785705/779474777068797962/Dm4mU065.gif",
        "https://media.discordapp.net/attachments/775135422124785705/779474786374910002/F3zpC1YP.gif",
        "https://media.discordapp.net/attachments/775135422124785705/779474786232959046/k0pROZ3F.gif",
        "https://media.discordapp.net/attachments/775135422124785705/779474788950605824/HtUnEfNA.gif",
        "https://media.discordapp.net/attachments/775135422124785705/779474790242844712/-JAlNfbm.gif",
        "https://media.discordapp.net/attachments/775135422124785705/779474804809400330/Zi6RnUiW.gif",
        "https://media.discordapp.net/attachments/775135422124785705/779474812912926800/e34pfyOI.gif",
        "https://media.discordapp.net/attachments/775135422124785705/779474817128595456/KEic8EYK.gif",
        "https://media.discordapp.net/attachments/775135422124785705/779474819003449374/kI3E_6Yt.gif",
        "https://media.discordapp.net/attachments/775135422124785705/779474819250257930/vG9YuN0e.gif",
        "https://media.discordapp.net/attachments/775135422124785705/779474823889420308/OuLjNL1I.gif",
        "https://media.discordapp.net/attachments/775135422124785705/779474826502078464/rSb_h5_T.gif",
        "https://media.discordapp.net/attachments/775135422124785705/779474826615455794/OtOreOfH.gif",
        "https://media.discordapp.net/attachments/775135422124785705/779474828259754024/N3LD96jC.gif",
        "https://media.discordapp.net/attachments/775135422124785705/779474833103912980/SqpDT50O.gif",
        "https://media.discordapp.net/attachments/775135422124785705/779474834916245504/MiBrOxfN.gif",
        "https://media.discordapp.net/attachments/775135422124785705/779474834933153812/MnNV32fK.gif",
        "https://media.discordapp.net/attachments/775135422124785705/779474840142872617/v-D3Cey_.gif",
        "https://media.discordapp.net/attachments/775135422124785705/779474861541163038/cO_gdyJp.gif",
        "https://media.discordapp.net/attachments/775135422124785705/779474862254850048/BP6E4Fl5.gif",
        "https://media.discordapp.net/attachments/775135422124785705/779474868348911616/JB2o_gl4.gif",
        "https://media.discordapp.net/attachments/775135422124785705/779475415994859530/xvXV2dmf.gif"
    ]

    if(!message.channel.nsfw) return message.channel.cend("Debes utilizar este comando en un canal `NSFW`.")
    let resultado = images[Math.floor(images.length * Math.random())];
    let author = message.author

    let user = message.mentions.users.first();

    if(!user) return message.channel.cend(`Menciona a alguien 7w7.`)

    if(user === author) return message.channel.send(`No puedes follarte a ti mismo.`)

    let embed = new MessageEmbed()
    .setDescription(`${author} se follo a ${user} 7w7.`)
    .setImage(resultado)
    .setColor(`RANDOM`)

    message.channel.send({ embeds: [embed] })
}

exports.conf = {
    aliases: []
};
    exports.help = {
    name: "fuck",
    description: "Follate a alguien nwn.", 
    usage: "e!fuck @user",
    cooldown: 3
}