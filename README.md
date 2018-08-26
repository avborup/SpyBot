# SpyBot
SpyBot is a Discord bot built with [Eris](https://github.com/abalabahaha/eris).
The purpose of the bot is nothing more than collect all messages ever
sent in the user-specified channels and save the data in a `csv` file.

# Usage
The bot is activated by one specific user and a keyword, which can be
defined in the configuration file. This is also where you will specify
which channels to collect messages from.

The configuration file is in `JSON` format and looks like this:
```json
{
  "master": "<user id>",
  "keyword": "<activation keyword>",
  "token": "<bot token>",
  "channelsToCollectFrom": [
    "<channel name>",
    "<channel name 2>",
    "..."
  ]
}
```
Note that the filename for `config.example.json` needs to to be changed
to `config.json` for the bot to work.

To start the bot, go to the SpyBot root directory and install the
dependencies with `npm i`.
Then run the bot script with `node src/index.js`.

To activate the message collection, go to your server and type in the
keyword in a channel where SpyBot is also located. The data will be
saved in `SpyBot/src/data_files/msgs.csv`.
