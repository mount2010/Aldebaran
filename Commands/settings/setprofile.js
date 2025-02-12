const { MessageEmbed } = require("discord.js");
const { Command } = require("../../structures/categories/SettingsCategory");

module.exports = class CommandSetprofile extends Command {
	constructor(client) {
		super(client, {
			name: "setprofile",
			description: "Changes your profile informations",
			usage: "Section Input",
			example: "aboutme My name is Xxx_FortnitePro_xxX!"
		});
	}

	// eslint-disable-next-line class-methods-use-this
	run(bot, message, args) {
		const availableSections = ["name", "country", "timezone", "birthday", "profilePictureLink", "favoriteGames", "profileColor", "favoriteMusic", "socialLinks", "zodiacName"];
		const embed = new MessageEmbed()
			.setAuthor(message.author.username, message.author.avatarURL())
			.setDescription("Please specify a section and value")
			.setColor("Red")
			.addField("**__Available Sections__**", `${availableSections.join(" | ")}`, false);
		if (args.length <= 0) return message.channel.send((embed));

		const profiletarget = args[0].toLowerCase();
		const inputdata = args.join(" ").slice(profiletarget.length);

		message.author.profile.changeProperty(profiletarget, inputdata).then(() => {
			message.channel.send(`Your ${profiletarget} has been updated to \`${inputdata}\`.`);
		}).catch(() => {
			const error = new MessageEmbed()
				.setAuthor(message.author.username, message.author.avatarURL())
				.setTitle("Unknown Profile Section")
				.setDescription("Please check to ensure this is a correct profile section. If you think the specified profile section was valid, please make sure the value is too.")
				.setColor("RED");
			message.channel.send({ embed: error });
		});
		return true;
	}
};
