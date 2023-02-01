const { Message, Client, EmbedBuilder, PermissionsBitField } = require("discord.js");
const { QuickDB } = require("quick.db");
const db = new QuickDB(); 
module.exports = {
  name: "aboutus",
  aliases: ["about"],
  description: "Allows the owner to send a about us information",
  usage: "about",
  category: "Utilites",
  permissions: [PermissionsBitField.Flags.Administrator],
  perms: "ADMINISTRATOR",


  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args, prefix) => {
    const embed = new EmbedBuilder()
        .setColor("0x6100FF")
        .setTitle("**Welcome to Invictus Network**")
        .setAuthor({ name: 'Invictue Network', iconURL: 'https://i.imgur.com/vkBXlMq.png' })
        .setDescription("*We are a CODM Esports Organization that is uniting leagues and tournaments to deliver quality events for the semi-professional side of the Call of Duty community. Invictus Network strives to provide tournaments and leagues, accurate information about Call of Duty mobile, the top teams, and to be involved within the community to make your experience in the community even better!* \n\n")

        // \n\n [<:Discord:1069828157147983923> Discord ](https://discord.gg/GqNtGybZYx)
        .addFields({
            name: "\u2000",
            value: "\u2000"
        })


        .addFields({
            name: "\u2000" ,
            value: "<:Discord:1069828157147983923> https://discord.gg/GqNtGybZYx \u2000 \u2000 \u2000"
          })
  
        
        .setImage("https://i.imgur.com/vkBXlMq.png")

        .setTimestamp()

        .setFooter({ text: 'Invistus Management', iconURL: 'https://i.imgur.com/vkBXlMq.png' });







    message.channel.send({ embeds: [embed]})


  },
};
