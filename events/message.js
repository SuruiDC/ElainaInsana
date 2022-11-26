const ally = require("./messageEvents/ally")
const automod = require("./messageEvents/automod")
const osu = require("./messageEvents/osu")
const prefix = require("./messageEvents/prefix")
const commands = require("./messageEvents/commands")
const { Types } = require("mongoose")
module.exports.run = async (bot) => {
    bot.on("messageCreate", async (message) => {
        if(message.author.bot || message.channel.type ===  "DM") return;
        var data = await bot.guildsData.findOne({guild: message.guild.id})
        if(!data){
            let x = await bot.guildsData.create({
                _id: Types.ObjectId(),
                guild: message.guild.id,
                osu: {
                    standar: false,
                    taiko: false,
                    catch: false,
                    mania: false
                },
                automod: {
                    anti1: null,
                    anti2: null
                },
                config: {
                    prefix: null,
                    logs: null,
                    suggest: null,
                    poll: null
                },
                allysets: {
                    roleStaffAlly: null,
                    channelAllyID: null,
                    roleMentionAlly: null,
                    roleMentionActive: null,
                    embedActive: null
                },
                allyembed: {
                    title: null,
                    color: null,
                    description: null,
                    image: null
                },
                welcomeConfig : {
                    channel: null,
                    mention: false,
                    author: null,
                    authorImage: null,
                    title: null,
                    thumbnail: null,
                    color: null,
                    description: null,
                    image: null,
                    timestamp: false,
                    footer: null,
                    footerImage: null
                },
                goodbyeConfig : {
                    channel: null,
                    author: null,
                    authorImage: null,
                    title: null,
                    thumbnail: null,
                    color: null,
                    description: null,
                    image: null,
                    timestamp: false,
                    footer: null,
                    footerImage: null
                } 
            })
                data = x
        }
        message.channel.cend = async (content) => {
            let x = await message.channel.send({ content: content })
            return x
        }
        commands.run(bot, message)
        ally.run(bot, message)
        osu.run(bot,message)
        prefix.run(bot, message)
        automod.run(bot,message)        
    })
}