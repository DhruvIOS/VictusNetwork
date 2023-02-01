const client = require("../index");

const {
  EmbedBuilder,
  Permissions,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  PermissionsBitField,
} = require("discord.js");
const prefix = require("./messageCreate");
const { Collection } = require("mongoose");
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isModalSubmit()) return;

  if (interaction.customId === "StaffModal") {
    const channel = client.channels.cache.get("1066281860163977301");

    // Get the data entered by the user

    let name = interaction.member;
    const region = interaction.fields.getTextInputValue("regionInput");
    const why = interaction.fields.getTextInputValue("WhyApplyInput");
    const what = interaction.fields.getTextInputValue("WhatDiffInput");
    const element = interaction.fields.getTextInputValue("ElementInput");
    const qual = interaction.fields.getTextInputValue("QualInput");

    interaction.reply({
      content: "Your staff application has been submitted",
      ephemeral: true,
    });

    const embed = new EmbedBuilder()
      .setColor("0x0099FF")
      .setTitle("Staff Application")
      .setAuthor({
        name: `${interaction.user.tag} Applicant`,
        iconURL: `${interaction.member.displayAvatarURL()}`,
      })

      .setDescription(
        `${interaction.user.tag} submitted a staff application please click on *Accept* or *REJECT* for the application `
      )

      .addFields({
        name: "\u2000",
        value: "\u2000",
      })
      .addFields({
        name: "→ **Applicant**",
        value: `• ${interaction.member.displayName}`,
      })

      .addFields({
        name: "→ **Applicant Region**",
        value: `• ${region}`,
      })

      .addFields({
        name: "→ **Why are you applying to be staff at Invictus Network?**",
        value: `• ${why}`,
      })

      .addFields({
        name: "→ **What is one thing that differentiates you from other applicants?**",
        value: `• ${what}`,
      })

      .addFields({
        name: "→ **What elements of Invictus Network do you want to work on?**",
        value: `• ${element}`,
      })

      .addFields({
        name: "→ **What qualifications/experience do you have?**",
        value: `• ${qual}`,
      })

      .setThumbnail(interaction.member.displayAvatarURL())
      .setTimestamp();

    const AcceptButton = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId("AcceptButton")
          .setLabel("Accept")
          .setStyle(ButtonStyle.Success)
      )

      .addComponents(
        new ButtonBuilder()
          .setCustomId("RejectButton")
          .setLabel("Reject")
          .setStyle(ButtonStyle.Danger)
      );



    channel.send({ embeds: [embed], components: [AcceptButton] });

    const collector = channel.createMessageComponentCollector();

    let myRole = interaction.guild.roles.cache.get("1069104750638936144");

    const logsChannel = client.channels.cache.get("1070058865137303682");

    collector.on("collect", async (i) => {

           if (i.member.id == interaction.user.id) {
          return i.reply({
            content: `Can't accept your own application`,
            ephemeral: true,
          });
        }
      if (i.customId == "AcceptButton") {
        // defer the interaction

        const embed = new EmbedBuilder()
          .setTitle("Application Accepted")
          .setColor("Green");

        const logsEmbed = new EmbedBuilder()
          .setColor("Green")
          .setTitle(`${interaction.user.tag} application was accepted`)
          .setTimestamp();

        await name.roles.add(myRole);
        await channel.send({ embeds: [embed] });
        await logsChannel.send({ embeds: [logsEmbed] });
        AcceptButton.components[0].setDisabled(true)
      }else if(i.customId == 'RejectButton'){

        const embed = new EmbedBuilder()
          .setTitle("Application Rejected")
          .setColor("Red");

        const logsEmbed = new EmbedBuilder()
          .setColor('Red')
          .setTitle(`${interaction.user.tag} application was rejected`)
          .setTimestamp();

        await channel.send({ embeds: [embed] });
        await logsChannel.send({ embeds: [logsEmbed] });

      }
    });
  }
});
