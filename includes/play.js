const { getBasicInfo } = require("ytdl-core")
const { demuxProbe, createAudioPlayer, createAudioResource,  AudioPlayerStatus, entersState, VoiceConnectionDisconnectReason, VoiceConnectionStatus } = require("@discordjs/voice")
const { MessageEmbed, Client } = require("discord.js")
const ytdl = require("../ytdl-core-as/lib/index")
const ms = require("parse-ms")

/**
 * 
 * @param {{ title: String, url: String, author: String, thumbnail: String }} song 
 * @param {Object[]} queue 
 * @param {Client} bot 
 * @returns 
 */

module.exports = async (song , queue, bot) => {

    try {
        queue.player = createAudioPlayer()

        if(!song && queue.songs.length === 0 && !queue.playing){
            let timeEmbed = new MessageEmbed()
            .setAuthor({ name: "En espera de una canción", iconURL: bot.user.displayAvatarURL()})
            .setColor('#fafafa')
            .setThumbnail(bot.user.displayAvatarURL({ size: 4096, dynamic: true, format: "png" }))
            .setDescription("> `Tiempo de espera:` 3 minutos\n> `Aviso:` Una vez pase el tiempo se desconectara el bot\n> `Canal:` "+queue.channel.toString())
            queue.message = await queue.text.send({ embeds: [timeEmbed] })
      
            return queue.timeout = setTimeout(() => {
              queue.voice.destroy()
              queue.message.delete().catch(e => {})
              queue.text.send("<a:DancingCat:766349589086339133> **|** Se terminaron de reproducir todas las canciones **|** <a:DancingCat:766349589086339133>")    
              bot.queue.delete(queue.text.guild.id)
            }, 60000 * 3)
        }

        queue.player.on('error', async (x) => {
            queue.text.send(`Hubo un error al reproducir **${song.title}**, se volvera a agregar a la cola.`).then(x => setTimeout(() => x.delete(), 5000))
            console.log(x)
            queue.player.stop()
            queue.songs = [song].concat(queue.songs)
            return await processQueue(queue, bot)
        })

        queue.player.once('playing', async () => {

            queue.player.on("idle", async (a, b) => {
                if(a.status === AudioPlayerStatus.Playing && b.status === AudioPlayerStatus.Idle) return await processQueue(queue, bot) 
            })
            
            if(queue.timeout){
                clearTimeout(queue.timeout)
                queue.message ? queue.message.delete() : undefined
            }
            queue.playing = true
            queue.message = await queue.text.send({ embeds: [
                new MessageEmbed()
                .setAuthor({ name: "Reproduciendo", iconURL: song.author.displayAvatarURL({ dynamic: true })})
                .setColor('#fafafa')
                .setThumbnail(song.thumbnail)
                .setDescription("**Información general:**\n> `Titulo:` "+`[${info.videoDetails.title}](${info.videoDetails.video_url})`+"\n> `Duración:` "+`${time.minutes}:${time.seconds}`+"\n> `Vistas:` "+info.videoDetails.viewCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+"\n> `Agregado por:` "+song.author.toString()+"\n> `Canal:` "+`[${info.videoDetails.ownerChannelName}](${info.videoDetails.ownerProfileUrl})`)
            ]})
        })
    
        const [stream, info] = await Promise.all([getTrack(song), getBasicInfo(song.url, { requestOptions: { headers: { 'Cookie': process.env.COOKIE } } })])

        let probe = await demuxProbe(stream)

        let resource = createAudioResource(probe.stream , { inputType: probe.type })
        
        queue.resource = resource
    
        queue.player.play(resource)
    
        queue.player.subscribe(queue.voice)
        let time = ms(parseInt(info.videoDetails.lengthSeconds) * 1000)
        
        queue.voice.on('stateChange', async (_, newState) => {
            if (newState.status === VoiceConnectionStatus.Disconnected) {
                if (newState.reason === VoiceConnectionDisconnectReason.WebSocketClose && newState.closeCode === 4014) {
                    try {
                        await entersState(queue.voice, VoiceConnectionStatus.Connecting, 1000);
                    } catch {
                        queue.timeout ? clearTimeout(queue.timeout) : undefined
                        queue.message ? queue.message.delete().catch(e => {}) : undefined
                        queue.songs = []
                        queue.player.stop()
                        bot.queue.delete(queue.text.guild.id)
                        return;
                    }
                } else {
                    queue.timeout ? clearTimeout(queue.timeout) : undefined
                    queue.message ? queue.message.delete().catch(e => {}) : undefined
                    queue.songs = []
                    queue.player.stop()
                    bot.queue.delete(queue.text.guild.id)
                }
            } else if (newState.status === VoiceConnectionStatus.Destroyed) {
                queue.timeout ? clearTimeout(queue.timeout) : undefined
                queue.message ? queue.message.delete().catch(e => {}) : undefined
                queue.songs = []
                queue.player.stop()
                bot.queue.delete(queue.text.guild.id)
            } 
        });
    } catch (e) {
        queue.text.send(`Hubo un error a descargar el video, vuelve a agregar el video a la cola de reproducción.`)
        console.log(e)
        await processQueue(queue, bot)
        return;
    }
}

async function processQueue(queue, bot){
    
    queue.playing = false
    queue.message ? queue.message.delete().catch(e => {}) : undefined
    delete queue.resource
    if(queue.loop){
        queue.songs.push(queue.songs.shift())
        await module.exports(queue.songs[0], queue, bot)
    }else{
        queue.songs.shift()
        await module.exports(queue.songs[0], queue, bot)
    }
}

function getTrack(song){
    return new Promise(async (resolve, reject) => {
        const track = await ytdl(song.url, { filter: "audioonly", quality: 'highest', highWaterMark: 1 << 25, format: "mp3" , opusEncoded: true, requestOptions: { headers: { 'Cookie': process.env.COOKIE, 'x-youtube-identity-token': process.env.YT  } } })
        resolve(track)
    })
}