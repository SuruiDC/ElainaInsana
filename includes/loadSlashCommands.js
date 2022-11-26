const commands = []
async function loadSlashCommands(bot){
	let a = ["music"]//"ally","automod","config","fun","info","interaction","moderation","nsfw","traductor","entries"
    const Read = require("util").promisify(require("fs").readdir)
    for (var i of a){
    	let x = await Read(`./slashs/${i}`)
        x.forEach(a => {
        	let directory = `../slashs/${i}/${a}`
        	let cmd = require(directory)
        	bot.slashs.set(cmd.data.name, cmd)
        	commands.push(cmd.data.toJSON())
        })
   	}
   	console.log("Se cargaron todos los SlashCommands.")
}

const createCommands = async guild => {

	guild.commands.set(commands)
	.catch(e => {
		return console.log(`El servidor ${guild.name} no otorgo los permisos necesarios para crear slash commands.`)
	})
	
	
}

const deleteCommands = async guild => {

	guild.commands.set([])
	.catch(e => {
		return console.log(`El servidor ${guild.name} no otorgo los permisos necesarios para eliminar slash commands.`)
	})
	
}

module.exports = {
	loadSlashCommands,
	createCommands,
	deleteCommands
}