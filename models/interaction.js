const { Schema } = require("mongoose")
const interaction = new Schema({
    _id: Schema.Types.ObjectId,
    elaina: String,
    angry: [],
    bored: [],
    claps: [],
    cry: [],
    fbi: [],
    happy: [],
    hi: [],
    hug: [],
    kill: [],
    kiss: [],
    laugh: [],
    lick: [],
    pat: [],
    punch: [],
    run: [],
    scared: [], 
    slap: [], 
    sleep: []
})
module.exports = interaction;