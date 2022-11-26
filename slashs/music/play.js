const { SlashCommandBuilder } = require('@discordjs/builders')
const ytpl = require("ytpl")
const ytsr = require("ytsr")
const ytdl = require("ytdl-core")
const { MessageEmbed } = require("discord.js")
const { joinVoiceChannel } = require("@discordjs/voice")
const play = require("../../includes/play")

let command = new SlashCommandBuilder()
.setName("play")
.setDescription("Reproduce videos y playlist de youtube.")
.addStringOption(option => option.setName("url-name")
	.setDescription("Especifica la url del video o playlist o simplemente escribe el nombre del video.")
	.setRequired(true)
)

module.exports.run = async (interaction, bot) => {

	let queue = bot.queue.get(interaction.guild.id)
	let args = interaction.options.get("url-name").value
	let channel = interaction.member.voice.channel
	if(!channel) return interaction.reply("Necesitas estar en un canal de voz para reproducir música.")
	if(channel.userLimit !== 0 && channel.userLimit < 2) return interaction.reply("No puedo unirme por limite de miembros.")
	if(queue){
	  if(queue.songs.length >= 50) return interaction.reply("No se puede agregar más videos a la reproducción(`Limite 50`)")
	}
	let permisos =  channel.permissionsFor(bot.user).toArray()
	if(!permisos.includes("SPEAK") || !permisos.includes("CONNECT")) return interaction.reply("No tengo permisos para unirme a ese canal.")
	let regexPL = /^.*(list=)([^#\&\?]*).*/gi.test(args)
	const pQueue = {
	  channel,
	  text: interaction.channel,
	  songs: [],
	  player: null,
	  voice: null,
	  playing: true,
	  resource: null,
	  timeout: null
	}
  
	if(regexPL){
	  let playlistSize = 50
	  if(queue){
		if(queue.songs.length < 50) playlistSize = 50 - queue.songs.length
	  }
	  if(!ytpl.validateID(args)) return interaction.reply("La playlist proporcionada es invalida o no es accesible.")
	  
	  let list = await ytpl(args, { limit: playlistSize, requestOptions: { headers: { 'Cookie': process.env.COOKIE } } })
	  interaction.reply({ embeds: [
		new MessageEmbed()
		.setAuthor("Playlist detectada", interaction.user.displayAvatarURL({dynamic: true}))
		.setColor("BLACK")
		.setThumbnail(list.thumbnails[0].url)
		.setDescription("**Información general:**\n> `Titulo:` "+`[${list.title}](${list.url})`+"\n> `Videos:` "+list.estimatedItemCount+"\n> `Visibilidad:` "+list.visibility+"\n> `Creador:` "+`[${list.author.name}](${list.author.url})`)
		.setFooter(`Agregada por ${interaction.user.username}`, interaction.user.displayAvatarURL({dynamic: true}))
		.setTimestamp()
	  ]})
	  
	  for (var i of list.items){
		let song = {
		  title: i.title,
		  url: i.url,
		  author: interaction.user,
		  thumbnail: i.thumbnails.length > 1 ? i.thumbnails[1].url : i.thumbnails[0].url
		}
  
		if(queue){
		  queue.songs.push(song)
		  if(queue.timeout){
			clearTimeout(queue.timeout)
			queue.timeout = null
			queue.message.delete().catch(e => {})
			play(queue.songs[0], queue)
		  }
		}else {
		  pQueue.songs.push(song)
		}
	  }
	}else{
	  let song;
	  if(ytdl.validateURL(args)){
		try {
		  let info = await ytdl.getBasicInfo(args, { requestOptions: { headers: { 'Cookie': process.env.COOKIE } } })
		  song = {
			title: info.videoDetails.title,
			url: info.videoDetails.video_url,
			author: interaction.user,
			thumbnail: info.videoDetails.thumbnails[4] ? info.videoDetails.thumbnails[4].url : info.videoDetails.thumbnails[3].url
		  }

		  queue ? queue.songs.push(song) : pQueue.songs.push(song)

		} catch (e) {
		  return interaction.reply("La url proporcionada es invalida.")
		}
	  }else{
		let info = await ytsr(args, { safeSearch: true, limit: 1, requestOptions: { headers: { cookie: process.env.COOKIE } } })
		if(info.items.length < 1) return interaction.reply("No se encontro un video con ese titulo.")
  
		song = {
		  title: info.items[0].title,
		  url: info.items[0].url,
		  author: interaction.user,
		  thumbnail: info.items[0].thumbnails.length > 1 ? info.items[0].thumbnails[1].url : info.items[0].thumbnails[0].url
		}
		
		queue ? queue.songs.push(song) : pQueue.songs.push(song)
	  }
  
	  if(queue){
		let embed = new MessageEmbed()
		.setAuthor("Agregado a la cola", interaction.user.displayAvatarURL({ dynamic: true }))
		.setDescription(`> \`Titulo:\` [${song.title}](${song.url})\n> \`Posición:\` ${queue.songs.length}`)
		.setFooter(`Agregado por ${interaction.user.username}`, interaction.user.displayAvatarURL({ dynamic: true }))
		.setTimestamp()
		.setThumbnail(song.thumbnail)
  
		if(queue.timeout){
		  clearTimeout(queue.timeout)
		  queue.timeout = null
		  queue.message.delete().catch(e => {})
		  play(queue.songs[0], queue, bot)
		}
		return interaction.reply({ embeds: [embed] }).then(async x => {
			let replied = await interaction.fetchReply()
			setTimeout(() => replied.delete(), 60000)
		})
	  }
	}
	
	if(queue) return;
	bot.queue.set(interaction.guild.id, pQueue)
	try {

		let defer = await interaction.deferReply({ fetchReply: true })
		defer.delete()

	  	pQueue.voice = joinVoiceChannel({
			channelId: channel.id,
			guildId: interaction.guild.id,
			adapterCreator: interaction.guild.voiceAdapterCreator,
			selfDeaf: false
	  	})
		pQueue.voice.setMaxListeners(40)
	  	await play(pQueue.songs[0], bot.queue.get(interaction.guild.id), bot)
	} catch (e) {
	  bot.queue.delete(interaction.guild.id)
	  console.log(e)
	  return interaction.followUp("Ocurrio un error al entrar al canal de voz se finalizara el comando.")
	}
  
}

exports.data = command