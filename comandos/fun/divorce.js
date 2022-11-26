const { Types } = require("mongoose")
module.exports.run = async (bot, message, args) => {

    var data = await bot.dataMarry.findOne({userID: message.author.id})
    if(!data){
        let a = await bot.dataMarry.create({
            _id: Types.ObjectId(),
            userID: message.author.id,
            marry: null
        })
        data = a
    }
    const pareja = data.marry
    if(!pareja) return message.channel.cend(`${message.author} no puedes divorciarte debido a que no estas casado con nadie.`)
    let search = bot.users.cache.find(u => u.id === pareja)
    const dataPareja = await bot.dataMarry.findOne({userID: search.id})
    message.channel.cend("¿<@"+message.author.id+"> estas seguro que quieres divorciarte de **"+search.tag+"**?, si es así escribe `yes` pero si te arrepientes escribe `no`, tienes 10 segundos.")
    const collector = message.channel.createMessageCollector(m => m.author.id === message.author.id && m.channel.id === message.channel.id, {time : 10000})
    collector.on("collect", async collected =>{
        if (collected.content.toLowerCase() === "yes"){

            message.channel.cend(message.author.tag + " y " + search.tag + " se han divorciado. <:CryingPanda:741458687713083515>")
            await data.updateOne({marry: null})
            await dataPareja.updateOne({marry: null})
        }else if(collected.content.toLowerCase() === "no"){
            message.channel.cend("Menos mal no ha sido así, no me gusta ver corazones rotos.")
        }
    });
    collector.on("end", collected => {
        if(collected.size === 0) return message.channel.cend("Ya paso tu tiempo, vuelve a intentarlo.")
    })
}
exports.conf = {
    aliases: []
};
    exports.help = {
    name: "divorce",
    description: "Divorciate de tu pareja actual.", 
    usage: "e!divorce",
    cooldown: 5
}