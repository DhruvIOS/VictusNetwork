const { Message, Client, ApplicationCommandType , EmbedBuilder, PermissionsBitField} = require("discord.js");

module.exports = {
    name: "inmember",
    aliases: ['inmen'],
    description: "It would give how many member has that role",
    usage: 'inrole @role',
    category: 'utilities',
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
        if(!mentionedRole) return message.reply("Please mention a role")
        let roleID = mentionedRole.id
        let membersWithRole = message.guild.roles.cache.get(roleID).members;



        const embed = new EmbedBuilder()
            .setColor('Green')
            .setTitle(`${membersWithRole.size} members with that role.`)

        message.channel.send({embeds: [embed]})

    },
};
