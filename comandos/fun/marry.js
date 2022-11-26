const { MessageEmbed } = require("discord.js")
const { Types } = require("mongoose")
module.exports.run = async (bot, message, args) => {

    let images = [
        "https://media.discordapp.net/attachments/775133368600887316/775146548698939392/qWwviEJR.gif",
        "https://media.discordapp.net/attachments/775133368600887316/775146558739185674/RitF1wOp.gif",
        "https://media.discordapp.net/attachments/775133368600887316/775146659013328926/lvWjru41.gif",
        "https://media.discordapp.net/attachments/775133368600887316/775146661860999208/G1LLlahE.gif",
        "https://media.discordapp.net/attachments/775133368600887316/775146670173192192/zE90yOU5.gif",
        "https://media.discordapp.net/attachments/775133368600887316/775146713614254111/oUiAFsDZ.gif",
        "https://media.discordapp.net/attachments/775133368600887316/775146723160490014/ZqpnybPX.gif",
        "https://media.discordapp.net/attachments/775133368600887316/775146733034274867/TTOrubJJ.gif",
        "https://media.discordapp.net/attachments/775133368600887316/775146734799421520/fqi4thXC.gif",
        "https://media.discordapp.net/attachments/775133368600887316/775146748221587476/DuxJnpyB.gif",
        "https://media.discordapp.net/attachments/775133368600887316/775146753418330143/AQL8dPyM.gif",
        "https://media.discordapp.net/attachments/775133368600887316/775146756535091200/WIaoLIzg.gif",
        "https://media.discordapp.net/attachments/775133368600887316/775146762616045568/-gh3cgyN.gif",
        "https://media.discordapp.net/attachments/775133368600887316/775146762980556810/HZ6zMxBw.gif",
        "https://media.discordapp.net/attachments/775133368600887316/775146768173105172/rk_lItYm.gif",
        "https://media.discordapp.net/attachments/775133368600887316/775146773374042132/iKvlZdyw.gif",
        "https://media.discordapp.net/attachments/775133368600887316/775146792232812594/77TT-530.gif",
        "https://media.discordapp.net/attachments/775133368600887316/775146796828983296/WbQFU4qV.gif",
        "https://media.discordapp.net/attachments/775133368600887316/775146799345827861/VsbgMg0S.gif",
        "https://media.discordapp.net/attachments/775133368600887316/775146804912193566/bdrUge6N.gif",
        "https://media.discordapp.net/attachments/775133368600887316/775146805683552316/4Sb07sLJ.gif",
        "https://media.discordapp.net/attachments/775133368600887316/775146815955009586/46bdde13306d8fdde6f5bbc5ec2d83d0.gif",
        "https://media.discordapp.net/attachments/775133368600887316/775146823383777320/FS2OFASQ.gif",
        "https://media.discordapp.net/attachments/775133368600887316/775146833746984960/lXX1D6XE.gif",
        "https://media.discordapp.net/attachments/775133368600887316/775146840425234452/z5Vd7BKB.gif",
        "https://media.discordapp.net/attachments/775133368600887316/775146842827784212/WWNiBtR9.gif",
        "https://media.discordapp.net/attachments/775133368600887316/775146874377338910/2vHncA0r.gif"
    ]
    
    let resultado = images[Math.floor(images.length * Math.random())];
    
    let usuario = message.mentions.users.first();
    if(!usuario) return message.channel.cend("Debes mencionar a quien quieres pedir matrimonio.")
    if(message.author.id === usuario.id) return message.channel.send("No puedes casarte contigo mismo.")
    if(usuario.bot) return message.channel.cend("No puedes casarte con un bot.")

    var data = await bot.dataMarry.findOne({userID: usuario.id})
    if(!data){
        let a = await bot.dataMarry.create({
            _id: Types.ObjectId(),
            userID: usuario.id,
            marry: null
        })
        data = a
    }
    var dataAuthor = await bot.dataMarry.findOne({userID: message.author.id})
    if(!dataAuthor){
        let x = await bot.dataMarry.create({
            _id: Types.ObjectId(),
            userID: message.author.id,
            marry: null
        })
        dataAuthor = x
    }

    if(dataAuthor.marry === null && data.marry === null){
       message.channel.cend("<@"+usuario+"> escribe `accept` para aceptar o `deny` para rechazar la propuesta, tienes 10 segundos.")
       const collector = message.channel.createMessageCollector(m => m.author.id === usuario.id && m.channel.id === message.channel.id, {time : 10000})
       collector.on("collect", async collected => {
        if (collected.content.toLowerCase() === "accept"){
            await data.updateOne({marry: message.author.id})
            await dataAuthor.updateOne({marry: usuario.id})
            let embed = new MessageEmbed()
            .setTitle("__Matrimonio__")
            .setColor("RANDOM")
            .setDescription(`${message.author} se ha casado con ${usuario}, felicidades.`)
            .setImage(resultado)

            message.channel.cend({ embeds: [embed] })
        } else if(collected.content.toLowerCase() === "deny"){
            message.channel.cend(`Lo lamento ${message.author}, ${usuario} no quiere casarse contigo.`)
        }
       });
       collector.on("end", collected => {
           if(collected.size === 0) return message.channel.cend("Lo lamento la persona nunca llego.")
       })
    }else{
        message.channel.cend("Ya estas casado o esta persona ya esta casada.")
    }
}
exports.conf = {
    aliases: []
};
    exports.help = {
    name: "marry",
    description: "Casate con alguien.", 
    usage: "e!marry @user",
    cooldown: 5
}