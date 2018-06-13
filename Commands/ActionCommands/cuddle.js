exports.run = (bot, message, args) => {
    const cuddles = require("./../../Data/imageurls.json");
    var sendcuddles = (`${cuddles.cuddles[~~(Math.random() * cuddles.cuddles.length)]}`);
    if(message.mentions.users.first()) { //Check if the message has a mention in it.
        let target = message.mentions.users.first();
        message.channel.send({embed:{
        author:{
        name: message.author.username,
        icon_url: message.author.avatarURL
        },
        description: (message.author +` Is Cuddling `+ target),
        image: {
            url : (sendcuddles),
      },
        timestamp: new Date()
    
    }});
}   else {
    message.reply("Please mention someone :thinking:"); //Reply with a mention saying "Invalid user."
};
};