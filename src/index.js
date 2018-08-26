"use strict";

const Eris = require("eris");
const messageCollector = require("./messageCollector.js");
const config = require("./config.json");

const bot = new Eris(config.token);

bot.on("ready", () => {
  console.log("Ready to collect data!");
});

bot.on("messageCreate", async msg => {
  if (msg.content !== config.keyword || msg.author.id !== config.master) {
    return;
  }

  const startTime = Date.now();

  const guildChannels = msg.channel.guild.channels;
  const channels = guildChannels.filter(c => config.channelsToCollectFrom.includes(c.name))

  if (channels.length === 0) {
    return bot.createMessage(msg.channel.id, "None of the specified channels were found.");
  }

  const result = await messageCollector.getAllMessagesInChannels(channels);

  const endTime = Date.now();
  const elapsedTime = endTime - startTime;

  bot.createMessage(msg.channel.id, {
    embed: {
        title: "Finished collecting messages",
        description: `Messages were collected in ${elapsedTime / 1000} seconds`,
        color: 0xDE1527,
        fields: [{
          name: 'Total',
          value:  `${result.reduce((a, b) => a + b.numOfMsgs, 0)} messages`,
          inline: true
        }].concat(result.map(channel => ({
            name: `#${channel.name}`,
            value: `${channel.numOfMsgs} messages`,
            inline: true
          })))
      }
    });
});

bot.connect();