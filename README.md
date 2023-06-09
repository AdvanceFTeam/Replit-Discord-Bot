# Info
This project provides a fully functional Discord bot with useful commands for your server. We designed it to be easily customizable and modifiable to meet your specific requirements for REPLIT.

The **important** files in this project are `index.js` and `config.js`. If you don't require the bot server to stay active constantly, you can safely delete the `keep_alive.js` file. Ensure that you remove any references to `keep_alive` from the `index.js` file. 

- The commands folder contains the command files used by the bot.

# Installation on Replit
1. To get started with the Discord bot and install the necessary packages for your Replit project, follow these simple steps:

2. Open your project in Replit.

3. In the left sidebar, click on the "Shell" tab to open the command-line interface (CLI).

4. Run the following commands one by one to install the required packages:
```
npm install @discordjs/builders@1.6.3
npm install @discordjs/rest@1.7.1
npm install @types/node@18.0.6
npm install axios@1.4.0
npm install discord-api-types@0.37.42
npm install discord.js@13.2.0
npm install dotenv@16.0.3
npm install express@4.18.2
npm install node-fetch@3.3.0
```

These commands will download and install the necessary packages for your Replit project.

5. In the left sidebar of your Replit project, click on the "Lock" icon to open the Secrets panel.

6. Add the following secrets:
```
Name: DISCORD_TOKEN 
Value: Your Discord bot Token
```
then you have to save the secrets. Also, you have the option to modify the name of the `DISCORD_TOKEN` variable in the `config.js` file.

7. and finally run the code, and that's all! If desired, feel free to customize the source code according to your preferences.


# Note
- We plan to include more additional commands in the future. Please note that the current code and file may appear a bit messy, but our intention is to ease the use, especially for beginners who are interested in creating their own Discord bot.
