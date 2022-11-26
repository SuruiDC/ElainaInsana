const { Schema } = require("mongoose")
const globalSchema = new Schema({
	_id: Schema.Types.ObjectId,
	guild: String,
	osu: {
		standar: Boolean,
		taiko: Boolean,
		catch: Boolean,
		mania: Boolean
	},
	automod: {
		anti1: String,
    	anti2: String
	},
	config: {
		prefix: String,
    	logs: String,
    	suggest: String,
    	poll: String
	},
	allysets: {
		roleStaffAlly: String,
    	channelAllyID: String,
    	roleMentionAlly: String,
    	roleMentionActive: String,
    	embedActive: String
	},
	allyembed: {
		title: String,
    	color: String,
    	description: String,
    	image: String
	},
	welcomeConfig : {
		channel: String,
		mention: Boolean,
		author: String,
		authorImage: String,
		title: String,
		thumbnail: String,
		color: String,
		description: String,
		image: String,
		timestamp: Boolean,
		footer: String,
		footerImage: String
	},
	goodbyeConfig : {
		channel: String,
		author: String,
		authorImage: String,
		title: String,
		thumbnail: String,
		color: String,
		description: String,
		image: String,
		timestamp: Boolean,
		footer: String,
		footerImage: String
	}
})
module.exports = globalSchema;