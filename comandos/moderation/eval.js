const Util = require("util")
const { splitMessage }  = require("discord.js").Util
module.exports.run = async (bot, message, args) => {
	if(message.author.id !== "618634689204322314") return message.channel.cend("Solo Surui puede usar esto.")
	if (!args[0]) return message.channel.cend(`Debes ingresar algo para evaluar.`);
    try {
      let output = await eval(args.join(" "));
      let type = typeof output;
      if (typeof output !== "string") output = Util.inspect(output, { depth: 0 });

      const splitDescription = splitMessage(output, {
        maxLength: 1999,
        char: "\n",
        prepend: "",
        append: ""
      });

      splitDescription.forEach(x => {
        message.channel.send({
            content: "```js\n"+x+"```"
        })
      })
      
	} catch (e){
		message.channel.send({
            content: "```js\n"+e.name+" : "+e.message+"```",
        	split: { char: "", maxLength: 1999 },
      	});
	}
}
exports.conf = {
    aliases: ["e","ev"]
};
    exports.help = {
    name: "eval",
    description: "Sapo eres.", 
    usage: "e!eval [code]",
    cooldown: 1
}