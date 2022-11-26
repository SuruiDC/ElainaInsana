module.exports = {
    async run(bot, message){
            var data = await bot.guildsData.findOne({guild: message.guild.id})
            let elPreFix = data.config.prefix ? data.config.prefix : "e!"
            let RegMention = new RegExp(`^<@!?${bot.user.id}>( |)$`);
    
            if(message.content.match(RegMention)) return message.channel.send(`Mi prefix es **${elPreFix}**`).catch(e => {})        
    }
}