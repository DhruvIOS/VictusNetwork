const { Message, Client, ApplicationCommandType , EmbedBuilder, PermissionsBitField} = require("discord.js");

module.exports = {
    name: "inrole",
    aliases: ['inrole'],
    description: "It would give a list of everyone who has a certain role",
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
   

        let membersWithRole = message.guild.roles.cache.get(roleID).members
        .map(m=> `${m.user.tag} - ${m.user}`).join("\n");


        if(membersWithRole.length == 0) membersWithRole = 'No one has that role'


        const embed =  new EmbedBuilder()
        .setTitle("Members with that role")
        .setDescription(membersWithRole)
        .setColor(message.guild.members.me.displayHexColor)
      


        message.channel.send({ embeds: [embed]})


  
        

    },
};
