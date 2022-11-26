    const ytpl = require("ytpl")
const ytsr = require("ytsr")
const ytdl = require("ytdl-core")
const { MessageEmbed } = require("discord.js")
const { joinVoiceChannel } = require("@discordjs/voice")
const play = require("../../includes/play")

module.exports.run = async (bot, message, args) => {

  let queue = bot.queue.get(message.guild.id)
  let channel = message.member.voice.channel
  if(!channel) return message.channel.send("Necesitas estar en un canal de voz para reproducir música.")
  if(channel.userLimit !== 0 && channel.userLimit < 2) return message.channel.cend("No puedo unirme por limite de miembros.")
  if(queue){
    if(queue.songs.length >= 50) return message.channel.send("No se puede agregar más videos a la reproducción(`Limite 50`)")
  }
  if(args.length < 1) return message.channel.send("Especifica la url o nombre del video a reproducir.")
  let permisos =  channel.permissionsFor(message.guild.me).toArray()
  if(!permisos.includes("SPEAK") || !permisos.includes("CONNECT")) return message.channel.send("No tengo permisos para unirme a ese canal.")
  let regexPL = /^.*(list=)([^#\&\?]*).*/gi.test(args[0])
  const pQueue = {
    channel,
    text: message.channel,
    songs: [],
    player: null,
    voice: null,
    playing: false,
    resource: null,
    timeout: null
  }

  if(regexPL){
    let playlistSize = 50
    if(queue){
      if(queue.songs.length < 50) playlistSize = 50 - queue.songs.length
    }
    if(!ytpl.validateID(args[0])) return message.channel.send("La playlist proporcionada es invalida o no es accesible.")
    
    let list = await ytpl(args[0], { limit: playlistSize, requestOptions: { headers: { 'Cookie': process.env.COOKIE } } })
    message.channel.send({ embeds: [
      new MessageEmbed()
      .setAuthor("Playlist detectada", message.author.displayAvatarURL({dynamic: true}))
      .setColor(bot.color)
      .setThumbnail(list.thumbnails[0].url)
      .setDescription("**Información general:**\n> `Titulo:` "+`[${list.title}](${list.url})`+"\n> `Videos:` "+list.estimatedItemCount+"\n> `Visibilidad:` "+list.visibility+"\n> `Creador:` "+`[${list.author.name}](${list.author.url})`)
      .setFooter(`Agregada por ${message.author.username}`, message.author.displayAvatarURL({dynamic: true}))
      .setTimestamp()
    ]})
    
    for (var i of list.items){
      let song = {
        title: i.title,
        url: i.url,
        author: message.author,
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
    if(ytdl.validateURL(args[0])){
      try {
        let info = await ytdl.getBasicInfo(args[0], { requestOptions: { headers: { 'Cookie': process.env.COOKIE } } })
        song = {
          title: info.videoDetails.title,
          url: info.videoDetails.video_url,
          author: message.author,
          thumbnail: info.videoDetails.thumbnails[4] ? info.videoDetails.thumbnails[4].url : info.videoDetails.thumbnails[3].url
        }
        queue ? queue.songs.push(song) : pQueue.songs.push(song)
      } catch (e) {
        return message.channel.send("La url proporcionada es invalida.")
      }
    }else{
      let info = await ytsr(args.join(" "), { safeSearch: true, limit: 1, requestOptions: { headers: { cookie: process.env.COOKIE } } })
      if(info.items.length < 1) return message.channel.send("No se encontro un video con ese titulo.")

      song = {
        title: info.items[0].title,
        url: info.items[0].url,
        author: message.author,
        thumbnail: info.items[0].thumbnails.length > 1 ? info.items[0].thumbnails[1].url : info.items[0].thumbnails[0].url
      }

      queue ? queue.songs.push(song) : pQueue.songs.push(song)
    }

    if(queue){
      let embed = new MessageEmbed()
      .setAuthor({ name: "Agregado a la cola", iconURL: message.author.displayAvatarURL({ dynamic: true })})
      .setDescription(`> \`Posición:\` ${queue.songs.length}\n> \`Titulo:\` [${song.title}](${song.url})`)
      .setFooter({ text: `Agregado por ${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true })})
      .setColor(bot.color)
      .setTimestamp()
      .setThumbnail(song.thumbnail)
      
      if(queue.timeout){
        clearTimeout(queue.timeout)
        queue.timeout = null
        queue.message.delete().catch(e => {})
        play(queue.songs[0], queue, bot)
      }
      return message.channel.send({ embeds: [embed] }).then(x => setTimeout(() => x.delete(), 60000))
    }
  }
  
  if(queue) return;
  bot.queue.set(message.guild.id, pQueue)
  try {
    pQueue.voice = joinVoiceChannel({
      channelId: channel.id,
      guildId: message.guild.id,
      adapterCreator: message.guild.voiceAdapterCreator,
      selfDeaf: false
    })
    pQueue.voice.setMaxListeners(40)
    await play(pQueue.songs[0], bot.queue.get(message.guild.id), bot)
  } catch (e) {
    let queue = bot.queue.get(message.guild.id)
    queue.voice.destroy()
    bot.queue.delete(message.guild.id)
    return message.channel.send("Ocurrio un error al entrar al canal de voz se finalizara el comando.")
  }

} 
exports.conf = {
    aliases: ['p', "pl", "join"]
};
    exports.help = {
    name: "play",
    description: "Reproduce una video de youtube.", 
    usage: "e!play [`Url` o `Nombre del video` o `Url Playlist`]",
    cooldown: 3
}