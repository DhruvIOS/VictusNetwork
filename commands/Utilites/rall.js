const {
  Message,
  Client,
  ApplicationCommandType,
  PermissionsBitField,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  name: "rall",
  aliases: ["rall"],
  description: "remove the mentioned role",
  usage: "rall @role",
  category: "Information",
  type: ApplicationCommandType.ChatInput,
  permissions: [PermissionsBitField.Flags.ManageRoles],
  perms: "MANAGE ROLES",

  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args, prefix) => {
    // if (!message.content.startsWith(prefix)) return;

    var mentionedRole = message.mentions.roles.first();
    if (!mentionedRole) return message.reply("Please mention a role");
    let roleID = mentionedRole.id;

    let membersWithRole = message.guild.roles.cache.get(roleID).members;

    const embed = new EmbedBuilder()
      .setTitle("Success")
      .setColor("Green")
      .setDescription(`✅ Removed ${mentionedRole} from ${membersWithRole.size} members`)
      .setColor(message.guild.members.me.displayHexColor);

    const Role = message.guild.roles.cache.get(roleID);
    Role.members.forEach((member, i) => {
      // Looping through the members of Role.
      setTimeout(() => {
        member.roles.remove(Role); // Removing the Role.
      });
    });

    await message.channel.send({ embeds: [embed] });
  },
};
