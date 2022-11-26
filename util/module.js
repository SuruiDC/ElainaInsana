module.exports = {
    canModifyQueue(member, message) {
      const { channel } = member.voice;
      const botChannel = member.guild.me.voice.channel;
  
      if (channel !== botChannel) {
        message.reply(`${member.user.toString()} debes estar en el mismo canal que <@720509373020897331>.`)
        return false;
      }
  
      return true;
    }
  };
  