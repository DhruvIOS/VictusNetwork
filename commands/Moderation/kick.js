const { Message, Client, EmbedBuilder, PermissionsBitField } = require("discord.js");
const { QuickDB } = require("quick.db");
const db = new QuickDB();
module.exports = {
  name: "kick",
  aliases: ["kick"],
  description: "Allows moderator to kick members",
  usage: "kick <@user> [reason]",
  category: "Moderation",
  permissions: [PermissionsBitField.Flags.KickMembers],
  perms: "Kick Members",

  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args, prefix) => {
    const Target =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);

    let reason = args[1];

    if (!reason) reason = "Not given";

    const mentionUser = new EmbedBuilder()
      .setColor("0xFF0000")
      .setDescription(`Please mention an user`);

    if (!args[0])
      return message.reply({ embeds: [mentionUser] }).then((sent) => {
        setTimeout(() => {
          sent.delete();
        }, 10000);
      });

    if (Target.permissions.has(PermissionsBitField.Flags.Administrator)) {
      const perms = new EmbedBuilder()
        .setColor("0xFF0000")
        .setDescription(`You can't kick other administrator`);

      message.reply({ embeds: [perms] }).then((sent) => {
        setTimeout(() => {
          sent.delete();
        }, 10000);
      });
    } else {


      try {
  const iconURL = Target.displayAvatarURL();

        const kickEmbed = new EmbedBuilder()
        .setAuthor({ name: `${Target.user.tag}`, iconURL: `${iconURL}` })
        .setTitle(`You were kicked from ${message.guild.name}`)
        .setDescription(`Reason: ${reason}`)
        .setColor("#5708ab")
        .setTimestamp()
        .setFooter({
          text: `${client.user.tag}, ${client.user.displayAvatarURL()}`,
        });

        await Target.send(kickEmbed)
      } catch (err) {
        console.log(`I was unable to message the member`);
      }

      Target.kick(reason);

      const memberKicked = new EmbedBuilder()
        .setColor("0x23FF00")
        .setDescription(`✅ *${Target.user.tag}* was kicked`);

      message.channel.send({ embeds: [memberKicked] });



   



    }
  },
};
