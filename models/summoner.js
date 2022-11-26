const { Schema } = require("mongoose")

const summoner = new Schema({
    _id: Schema.Types.ObjectId,
    bot: String,
    key: String,
    version: String
})

module.exports = summoner;