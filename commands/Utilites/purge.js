const { Message, Client, ApplicationCommandType, PermissionsBitField , EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle} = require("discord.js");

module.exports = {
    name: "purge",
    aliases: ['clear', 'earse'],
    description: "returns websocket ping",
    usage: 'purge [amount]',
    category: 'Information',
    type: ApplicationCommandType.ChatInput,
    permissions: [PermissionsBitField.Flags.ManageMessages],
    perms: "MANAGE MESSAGES",




    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args, prefix) => {
        // if (!message.content.startsWith(prefix)) return;

        let amount = args[0]

        if(!amount) return message.reply("Please provide the amount you want to clear");

        const embed = new EmbedBuilder()
            .setColor("Blue")
            .setTitle("Success")
            .setDescription(`✅ Deleted ${amount} messages`)

        await message.channel.bulkDelete(amount)

        const button = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('purge')
                    .setEmoji('🗑')
                    .setStyle(ButtonStyle.Success)
            )

        await message.channel.send({ embeds: [embed]}).then(msg => {
            setTimeout(() => msg.delete(), 20000)
          })



        // collector.on("collect", async i =>{
        //     if(!i.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) return;


        //     message.delete();
        // })
        
    
    },
};
