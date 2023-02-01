const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ApplicationCommandType,
  ApplicationCommandOptionType,
} = require("discord.js");

module.exports = {
  name: "apply",
  description: "user can apply for avaiable application",
  usage: "/apply [application name]",
  category: "application",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: "application_name",
      description: "Name of the application",
      type: ApplicationCommandOptionType.String,
      require: false,
    },
  ],
  

  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (client, interaction, args) => {
    const app = interaction.options.getString("application_name");

    if (app == null) {
      const embed = new EmbedBuilder()
        .setColor("0xF02A00")
        .setTitle("Invictus Application")
        // .setDescription("• **__Staff__**");
        .setDescription(`Please type \`/apply\` then the name of the application **ALL LOWERCASE**`)

        .addFields({
          name: ` \`Aviable Application\``,
          value: "• **staff**"
        })
        .setImage('https://i.imgur.com/Fcvao3N.jpg')
        interaction.reply({ embeds: [embed] });
    } else if (app == "staff") {
      const modal = new ModalBuilder()
        .setCustomId("StaffModal")
        .setTitle("Staff Application");

      // Add components to modal

      // Create the text input components
    

      const regionInput = new TextInputBuilder()
        .setCustomId("regionInput")
        .setLabel("What region you are in?")
        .setStyle(TextInputStyle.Short)
        .setRequired(true)
        .setPlaceholder('Enter your response');



    const WhyApplyInput = new TextInputBuilder()
        .setCustomId("WhyApplyInput")
        .setLabel("Why are you applying at Invictus Network?")
        .setStyle(TextInputStyle.Short)
        .setRequired(true)
        .setPlaceholder('Enter your response');



    
    const WhatDiffInput = new TextInputBuilder()
        .setCustomId("WhatDiffInput")
        .setLabel("What makes you stand out from others?")
        .setStyle(TextInputStyle.Short)
        .setRequired(true)
        .setPlaceholder('Enter your response')






    const ElementInput = new TextInputBuilder()
        .setCustomId("ElementInput")
        .setLabel("What would you like to work on with Invictus")
        .setStyle(TextInputStyle.Short)
        .setRequired(true)
        .setPlaceholder('Enter your response');




    
        const QualInput = new TextInputBuilder()
        .setCustomId("QualInput")
        .setLabel("What qualifications/experience do you have?")
        .setStyle(TextInputStyle.Short)
        .setRequired(true)
        .setPlaceholder('Enter your response');




        
        const MoreInput = new TextInputBuilder()
        .setCustomId("MoreInput")
        .setLabel("If you want to tell us something let us know")
        .setStyle(TextInputStyle.Paragraph)
        .setRequired(true)
        .setPlaceholder('Enter your response');






      // An action row only holds one text input,
      // so you need one action row per text input.
      
      const RegionActionRow = new ActionRowBuilder().addComponents(regionInput);
      const WhyActionRow = new ActionRowBuilder().addComponents(WhyApplyInput);
      const WhatActionRow = new ActionRowBuilder().addComponents(WhatDiffInput);
      const ElementActionRow = new ActionRowBuilder().addComponents(ElementInput);
      const QualActionRow = new ActionRowBuilder().addComponents(QualInput);
;







      // Add inputs to the modal
      modal.addComponents(RegionActionRow,WhyActionRow, WhatActionRow, ElementActionRow , QualActionRow);
   

      // Show the modal to the user
      await interaction.showModal(modal);
    }
  },
};
