const { Schema } = require("mongoose")

const schema = new Schema({
    _id: Schema.Types.ObjectId,
    user: String,
    blacklist: []
})
module.exports = schema;
