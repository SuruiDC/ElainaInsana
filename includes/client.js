const { Client , Collection, Options } = require("discord.js"); 
const { createConnection } = require('mongoose');

module.exports = class Elaina extends Client{
    constructor(){
        super({ intents: 46751, makeCache: Options.cacheWithLimits({
                UserManager: 0,
                MessageManager: 0,
                ReactionManager: 0,
                ReactionUserManager: 0,
                ThreadManager: 0,
                ThreadMemberManager: 0,
                GuildInviteManager: 0,
                GuildStickerManager: 0,
                GuildBanManager: 0 
            })
        })

        this.color = '#fafafa'
        this.queue = new Collection()
        this.commands = new Collection()
        this.slashs = new Collection()
        this.cooldown = new Set()

        const database = createConnection(process.env.MONGODB, { useNewUrlParser: true, useUnifiedTopology: true });
            
        this.db = database
        this.guildsData = database.model("globalSchema", require("../models/globalSchema"))
        this.usersData = database.model("usersGlobalSchema", require("../models/userGuildStats"))
        this.dataMarry = database.model("usermarrydata", require("../models/usersDataBaseMarry"))
        database.model("interaction", require("../models/interaction")).findOne({elaina: "720509373020897331"}).then(x => this.interaction = x)
        this.summoner = database.model("apiAndVersion", require("../models/summoner"))
        this.blacklist = database.model("blacklist", require("../models/blackListModel"))

        
    }
}