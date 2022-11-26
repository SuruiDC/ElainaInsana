module.exports.run = async (bot, message, args) => {
    
    if(message.member.id !== "618634689204322314") return message.channel.cend(`Solo mi creador puede usar este comando.`)

    message.channel.cend("<a:xd:766349092133142549>Reinicio en progreso...").then(async a => {
        a.edit(`<a:DancingCat:766349589086339133>Estoy en ello...`)
        bot.destroy();
        await bot.login(process.env.TOKEN)
        await bot.user.setActivity("convirtiendome en bruja | @Elaina para ver mi prefix", {type: "LISTENING"});
        a.edit(`<a:White:766148148904067082> Reinicio completado.`)
        console.log(`Reinicio de Elaina completado`)
    })
}

exports.conf = {
    aliases: []
};
    exports.help = {
    name: "reload",
    description: "Recarga el bot.", 
    usage: "e!reload",
    cooldown: 5
}