require("dotenv").config();
const Elaina = require('./includes/client')
const bot = new Elaina()
require("./includes/loadSlashCommands").loadSlashCommands(bot)
require("./includes/handler").handler(bot)
require("./includes/loadEvents").loadEvents(bot)
bot.login(process.env.TOKEN)//XD