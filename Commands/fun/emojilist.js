const { Command } = require("../../structures/categories/FunCategory");

module.exports = class EmojilistCommand extends Command {
	constructor(client) {
		super(client, {
			name: "emojilist",
			description: "Displays all emojis for a the server"
		});
	}

	// eslint-disable-next-line class-methods-use-this
	run(bot, message) {
		const emojilist = message.guild.emojis.map(e => e.toString()).join("");
		message.delete();
		message.channel.send(emojilist);
	}
};
