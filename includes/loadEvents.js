module.exports = {
	async loadEvents(bot){
        require("fs").readdir("./events", (err, files) => {
            files = files.filter(x => x.endsWith(".js"))
            for (var i of files){
                require(`../events/${i}`).run(bot)
            }
        })
	}
}