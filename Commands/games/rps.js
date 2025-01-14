const { MessageEmbed } = require("discord.js");
const { Command } = require("../../structures/categories/GamesCategory");

module.exports = class RpsCommand extends Command {
	constructor(client) {
		super(client, {
			name: "rps",
			description: "Rock. Paper. Scissors!"
		});
	}

	// eslint-disable-next-line class-methods-use-this
	run(bot, message, args) {
		if (args[0] !== undefined) {
			if (message.mentions.users.size > 0) {
				const target = message.mentions.users.first();
				if (target.id === bot.user.id) {
					message.channel.send("Sorry, but I don't want to play right now...");
				} else if (!message.author.bot) {
					const introEmbed = new MessageEmbed()
						.setAuthor("Rock. Paper. Scissors.", bot.user.avatarURL())
						.setDescription("**The person you want to play with has to accept your invitation by clicking the emoji on this message.**\nHere is how this game is going to work with you: once the other have accepted the invitation, **you will both receive a message** in your private messages from Aldebaran. You will have to **type either \"rock\", either \"paper\", either \"scissors\"** within 15 seconds (you can also type the first letter of each if you are too lazy to type the full word). **The results will be sent to the channel where the game has begun.**")
						.setColor(this.color);
					message.channel.send({ embed: introEmbed }).then(msg => {
						msg.react("✅");
						const reactionsFilter = (reaction, user) => reaction.emoji.name === "✅" && user.id === target.id;
						const messagesFilter = msgTest => ["r", "p", "s", "rock", "paper", "scissors"].includes(
							msgTest.content
						);
						msg.awaitReactions(reactionsFilter, { time: 60000, max: 1 })
							.then(async collected => {
								if (collected.size !== 0) {
									message.channel.send("The game will begin shortly.");
									message.author.send(
										"Please type your choice here. \"rock\" or \"r\", \"paper\" or \"p\", or \"scissors\" or \"s\"."
									);
									target.send(
										"Please type your choice here. \"rock\" or \"r\", \"paper\" or \"p\", or \"scissors\" or \"s\"."
									);
									const scope = { time: 15000, max: 1 };
									const authorDM = await message.author.createDM();
									const targetDM = await target.createDM();
									Promise.all([
										authorDM.awaitMessages(messagesFilter, scope),
										targetDM.awaitMessages(messagesFilter, scope)
									]).then(([authorResponse, targetResponse]) => {
										if (authorResponse.size && targetResponse.size) {
											[authorResponse] = authorResponse.first().content;
											[targetResponse] = targetResponse.first().content;
											const win = {
												r: "s",
												p: "r",
												s: "p"
											};
											const words = {
												r: "rock",
												p: "paper",
												s: "scissors"
											};
											if (authorResponse !== targetResponse) {
												if (win[authorResponse] === targetResponse) {
													const embed = new MessageEmbed()
														.setAuthor(`${message.author.username} won!`, message.author.avatarURL())
														.setDescription(`They played ${words[authorResponse]}, while **${target.username}** played ${words[targetResponse]}.`)
														.setColor(this.color);
													message.channel.send({ embed });
												} else if (win[targetResponse] === authorResponse) {
													const embed = new MessageEmbed()
														.setAuthor(`${target.username} won!`, target.avatarURL())
														.setDescription(`They played ${words[targetResponse]}, while ${message.author.username} played ${words[authorResponse]}.`)
														.setColor(this.color);
													message.channel.send({ embed });
												}
											} else {
												message.channel.send(`Both users played ${targetResponse}, retry!`);
											}
										}
									});
								} else {
									message.reply("the person you want to play with has not accepted your invitation.");
								}
							}).catch(caca => {
								message.channel.send("An error occured with this RPS game.");
								throw caca; // coded bie a frende
							});
					});
				} else {
					message.channel.send("You cannot play against a bot that is not Aldebaran.");
				}
			} else {
				message.channel.send("You have to ping a valid user in order to play this game.");
			}
		} else {
			message.channel.send("You can choose to play against a bot or against someone else by pinging him. But you need to choose if you want to play!");
		}
	}
};
