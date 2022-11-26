const { MessageEmbed } = require("discord.js")

module.exports.run = async (bot, message, args) => {


    let images = [
        "https://media.discordapp.net/attachments/775135395213869057/779481510856228914/OlggWNVE.png",
        "https://media.discordapp.net/attachments/775135395213869057/779481552085188618/ztHZIEV1.gif",
        "https://media.discordapp.net/attachments/775135395213869057/779481589041987594/DRX7rt1N.gif",
        "https://media.discordapp.net/attachments/775135395213869057/779481592812929044/9BX3UAJP.gif",
        "https://media.discordapp.net/attachments/775135395213869057/779481620238958592/RVlJ1_CD.gif",
        "https://media.discordapp.net/attachments/775135395213869057/779481638429786122/NRfosW-W.gif",
        "https://media.discordapp.net/attachments/775135395213869057/779481640500985876/mr_57KhJ.gif",
        "https://media.discordapp.net/attachments/775135395213869057/779481642002546718/-ueCH_pq.gif",
        "https://media.discordapp.net/attachments/775135395213869057/779481651415089193/ceh2zPsK.gif",
        "https://media.discordapp.net/attachments/775135395213869057/779481651667402842/L6T1hV1p.gif",
        "https://media.discordapp.net/attachments/775135395213869057/779481655597465600/rrSFujHJ.gif",
        "https://media.discordapp.net/attachments/775135395213869057/779481668293492786/sFQ0Gj_j.gif",
        "https://media.discordapp.net/attachments/775135395213869057/779481667558965248/SWVUWxx_.gif",
        "https://media.discordapp.net/attachments/775135395213869057/779481669832540170/bE7Kicx7.gif",
        "https://media.discordapp.net/attachments/775135395213869057/779481674026057748/b9PH6WNJ.gif",
        "https://media.discordapp.net/attachments/775135395213869057/779481683480412180/h0C8OfI8.gif",
        "https://media.discordapp.net/attachments/775135395213869057/779489660744892457/GcylFygO.gif",
        "https://media.discordapp.net/attachments/775135395213869057/779489661974347796/GqXveid2.gif"
    ]

    if(!message.channel.nsfw) return message.channel.cend("Debes utilizar este comando en un canal `NSFW`.")

    let resultado = images[Math.floor(images.length * Math.random())];

    let usuario = message.mentions.users.first();

    if(usuario) {

        if(!message.author === usuario) return message.channel.cend("No puedes venirte en ti mismo.")
        let embed = new MessageEmbed()
        .setDescription(`${message.author} se ha venido en ${usuario} 7u7.`)
        .setImage(`${resultado}`)
        .setColor("RANDOM")

        message.channel.send({ embeds: [embed] })
    } else {

        let embed2 = new MessageEmbed()
        .setDescription(`${message.author} se ha venido 7u7.`)
        .setImage(`${resultado}`)
        .setColor(`RANDOM`)

        message.channel.send({ embeds: [embed2] })
    }

}

exports.conf = {
    aliases: []
};
    exports.help = {
    name: "cum",
    description: "Eyacula sin más o en alguien.", 
    usage: "e!cum [@user o Nada]",
    cooldown: 3
}