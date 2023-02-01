const { Message, Client, EmbedBuilder, PermissionsBitField } = require("discord.js");
const parseTime = require("parse-duration").default;
const { QuickDB } = require("quick.db");
const db = new QuickDB();

// const prettyMs = require('pretty-ms');

const ms = require("ms");
module.exports = {
  name: "timeout",
  aliases: ["mute"],
  description: "Allows moderator to put a user on timeout ",
  usage: "timeout <@user> [duration] [reason]",
  category: "Moderator",
  permissions: [PermissionsBitField.Flags.ModerateMembers],
  perms: 'Moderate Members',
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

    let duration = args[1];
    let reason = args[2];

    if (!reason) reason = "Not given";
    const mentionUser = new EmbedBuilder()
      .setColor("0xFF0000")
      .setDescription(`Please mention an user`);

    const timeEmbed = new EmbedBuilder()
      .setColor("0xFF0000")
      .setDescription(`Please provide a proper time`);

    if (!args[0])
      return message.reply({ embeds: [mentionUser] }).then((sent) => {
        setTimeout(() => {
          sent.delete();
        }, 10000);
      });

    if (!isNaN(duration))
      return message.reply({ embeds: [timeEmbed] }).then((sent) => {
        setTimeout(() => {
          sent.delete();
        }, 10000);
      });

    const timeEmbed2 = new EmbedBuilder()
      .setColor("0xFF0000")
      .setDescription(`The input time is off limit`);

    let parsedTime = parseTime(duration);

    if (Target.permissions.has(PermissionsBitField.Flags.Administrator)) {
      const perms = new EmbedBuilder()
        .setColor("0xFF0000")
        .setDescription(`You can't kick other administrator`);

      message.reply({ embeds: [perms] }).then((sent) => {
        setTimeout(() => {
          sent.delete();
        }, 10000);
      });
    } 

    if (parsedTime < ms("1m") ||parsedTime > ms("28d")) {
      message.reply({ embeds: [timeEmbed2] }).then((sent) => {
        setTimeout(() => {
          sent.delete();
        }, 10000);
      });
    }else{

      
      Target.timeout(parsedTime, reason);

      const memberTimeout = new EmbedBuilder()
        .setColor("0x23FF00")
        .setDescription(
          `✅ *${Target.user.tag}* is on timeout for ${duration}`
        );

      message.channel.send({ embeds: [memberTimeout] });



 


    }


    
  },
};
