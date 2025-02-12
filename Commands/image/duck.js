const request = require("request");
const { Command, Embed } = require("../../structures/categories/ImageCategory");

module.exports = class DuckCommand extends Command {
	constructor(client) {
		super(client, {
			name: "duck",
			description: "Quack Quack"
		});
	}

	run(bot, message) {
		const ducknumber = Math.floor((Math.random() * 162) + 1);
		request({
			uri: `https://api.pexels.com/v1/search?query=duck+query&per_page=1&page=${ducknumber}`,
			headers: { Authorization: bot.config.pexels_apikey }
		}, (err, response, body) => {
			const parsed = JSON.parse(body);
			if (err) return message.channel.send("The seems to be a ducking problem");
			if (parsed.error) return message.channel.send("Someone has requested too many ducks recently, the only thing you can do is waiting for your turn!");
			const data = parsed.photos[0];
			const embed = new Embed(this)
				.setTitle("**__Quack Quack__**")
				.setImage(data.src.large)
				.setFooter(`Duck Powered By: ${data.photographer} on Pexels.com`);
			return message.channel.send({ embed });
		});
	}

	registerCheck() {
		return this.client.config.pexels_apikey !== undefined
			&& this.client.config.pexels_apikey !== null;
	}
};
