module.exports.run = async (bot, message, args) => {
    
    let mensaje = args.join(" ");
    if(!mensaje) return message.channel.send("Especifica el mensaje que quieres que diga.")

        const invites = [
            "discord.gg",
            "discord.me",
            "discord.io/",
            "discordapp.com/invite",
            "discord.gg/",
            "invite.gg",
            "invite.gg/"
        ]
        if(invites.some(sexo => message.content.toLowerCase().includes(sexo))) return message.channel.send("El mensaje no puede contener invitaciones de discord.").then(a => a.delete({timeout: 3000}))

        const links = [
            "https://",
            "https:/"
        ]
        if(links.some(sexo => message.content.toLowerCase().includes(sexo))) return message.channel.send("El mensaje no puede contener links.").then(a => a.delete({timeout: 3000}))

        function cleanRestrictedMentions(text) {
            return text.replace( /@(here|everyone)/g, '@\u200b$1' ).replace( /<@&(\d+)>/g, (mention, id) => {
              if (message.channel.type === 'dm') return mention;
              var role = message.guild.roles.cache.get(id);
              return ( role && !role.mentionable ? `@${role.name}` : mention );
            } );
          }
          message.delete();
        message.channel.send({ content: cleanRestrictedMentions(mensaje), allowedMentions: { parse: [ ] } })
    }


exports.conf = {
    aliases: []
};
    exports.help = {
    name: "say",
    description: "Elaina repite lo que desees.", 
    usage: "e!say [Texto]"
}