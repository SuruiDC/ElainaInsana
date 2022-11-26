const { Schema } = require("mongoose")
const user = new Schema({
	_id: Schema.Types.ObjectId,
	user: String,
	guild: String,
	warns: Number,
	AllyPoints: Number,
    AllyTotal: Number,
    serverPoints: Number,
    serverAllys: Number
})

module.exports = user;