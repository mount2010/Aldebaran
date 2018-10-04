const { MessageEmbed } = require('discord.js');
const userCheck = require('./../../functions/action/userCheck')
exports.run = (bot, message, args) => {
    userCheck(bot, message, args).then(async (userId) => {
        bot.guilds.get(message.guild.id).members.fetch({user: userId}).then(user => {
            var /*allRoles = [],*/ allPermissions = [];
            const mjd = new Date(user.joinedTimestamp);
            if (user.permissions.has('ADMINISTRATOR')) allPermissions.push('Administrator');
            else for (let [name, value] of Object.entries(user.permissions.serialize())) if (value) {
                name = name.toLowerCase().split('_');
                var words = [];
                for (let word of name) words.push(word[0].toUpperCase() + word.slice(1));
                allPermissions.push(words.join(' '));
            };
            //for (let [id, data] of user.roles) if (id !== user.highestRole.id && data.name !== '@everyone') allRoles.push(`<@&${id}>`);
    
            const embed = new MessageEmbed()
                .setAuthor(user.user.tag, user.user.avatarURL())
                .setTitle(`User Details of ${user.user.username} in the ${message.guild.name} server`)
                .setDescription(`**User ID** ${user.user.id}\n**Nickname** ${user.displayName}\n**Server Join Date** ${mjd.getUTCMonth()+1}/${mjd.getUTCDate()}/${mjd.getUTCFullYear()} ${mjd.getUTCHours()}:${mjd.getUTCMinutes()} UTC`)
                //.addField(`Roles`, `**Highest Role** <@&${user.highestRole.id}>\n**Others** ${allRoles.join(', ')}`)
                .addField(`Permissions`, allPermissions.join(', '))
                .setThumbnail(user.user.avatarURL())
                .setColor(user.displayColor)
                .setFooter(`User Account Created on`)
                .setTimestamp(new Date(user.user.createdTimestamp));
            message.channel.send({embed});
        }).catch(() => {
            message.channel.send('Oops, looks like we got an error when fetching the requested data...');
        });
    }).catch(err =>{
        throw err;
    })
}   

exports.infos = {
    category: "General",
    description: "Shows detailed user info",
    usage: "&user <userId> or <userMention>",
    example: "&user @Aldebaran or &user 320933389513523220"
}