const poolQuery = require(`${process.cwd()}/functions/database/poolQuery`);
const config = require(`${process.cwd()}/config.json`);
const Discord = require("discord.js");
const mysql = require("mysql");
exports.run = function(bot, message, args) {
    if (args.length < 4)return message.reply(`You must enter all correct info to upload, <link>,<linkname><tag><nsfw?>`)
    const connect = function() {
        poolQuery(`INSERT INTO photogallery (userid,links,linkname,tags,nsfw) VALUES ("${message.author.id}","${args[0]}","${args[1]}","${args[2]}","${args[3]}")`).then(result => {
            message.channel.send(`Your Image has been uploaded.`)
        }).catch(() => {
            const embed = new Discord.RichEmbed()
                .setAuthor(message.author.username, message.author.avatarURL)
                .setTitle(`An Error Occured`)
                .setDescription(`An error occured and we could not upload photos you specifed. Please retry later.`)
                .setColor(`RED`);
            message.channel.send({embed});
        })
    }
    connect()
}
exports.infos = {
    category: "General",
    description: "Uploads photo to photo album.",
    usage: "\`&uploadphoto\`",
    example: "\`&uploadphoto <link> <nickname> <tags> <Nsfw?>\`",
}