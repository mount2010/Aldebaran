const request = require("request");

module.exports = (bot, message) => {
	const command = message.content.slice(message.guild.prefix.length).split(" ")[0];
	return new Promise((resolve, reject) => {
		request({ uri: `http://nightorn.com:3000/api/v1/images/random/${command}` }, (err, response, body) => {
			if (err) {
				reject(new RangeError(`There seems to be a problem with ${command} image request.`));
			} else {
				const data = JSON.parse(body);
				const image = data.fileURL;
				resolve(image);
			}
		});
	});
};
