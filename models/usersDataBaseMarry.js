const { Schema } = require("mongoose")

const dataBaseSchema = new Schema({
    _id: Schema.Types.ObjectId,
    userID: String,
    marry: String
})

module.exports = dataBaseSchema;