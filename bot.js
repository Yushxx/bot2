const http = require('http');
const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');

const token = '6776313554:AAGREb-M49a0IGY3HWwSNXtSyNWvQjjtkpo';
const bot = new TelegramBot(token, {polling: true});

let users = [];

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    if (msg.new_chat_members) {
        msg.new_chat_members.forEach(member => {
            if (!users.includes(member.id)) {
                users.push(member.id);
                fs.writeFileSync('users.json', JSON.stringify(users));
            }
        });
    }
});

bot.onText(/\/sendall (.+)/, (msg, match) => {
    const message = match[1];
    users.forEach(userId => {
        bot.sendMessage(userId, message);
    });
});

bot.onText(/\/sendphoto/, (msg) => {
    const photoPath = 'path_to_your_photo.jpg'; // Chemin vers votre photo
    users.forEach(userId => {
        bot.sendPhoto(userId, photoPath);
    });
});

bot.onText(/\/sendfile/, (msg) => {
    const filePath = 'path_to_your_file'; // Chemin vers votre fichier
    users.forEach(userId => {
        bot.sendDocument(userId, filePath);
    });
});

bot.onText(/\/sendvideo/, (msg) => {
    const videoPath = 'path_to_your_video.mp4'; // Chemin vers votre vidéo
    users.forEach(userId => {
        bot.sendVideo(userId, videoPath);
    });
});

bot.onText(/\/usercount/, (msg) => {
    bot.sendMessage(msg.chat.id, `Nombre d'utilisateurs : ${users.length}`);
});

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const username = msg.from.username;
    const welcomeMessage = `Salut ${username} ! Bienvenue dans le programme hack de solkah. Choisissez une option dans le menu en cliquant sur le bouton ci-dessous:`;
    const keyboard = {
        inline_keyboard: [
            [{ text: 'Rejoindre 💰🤑', url: 'https://t.me/+toA5QPKK5Nc4MTc0' }]
        ]
    };
    bot.sendMessage(chatId, welcomeMessage, {reply_markup: JSON.stringify(keyboard)});
});

// Code keep_alive pour éviter que le bot ne s'endorme
http.createServer(function (req, res) {
    res.write("I'm alive");
    res.end();
}).listen(8080);
