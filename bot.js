const TelegramBot = require('node-telegram-bot-api');
const request = require('request');
const fs = require('fs');
const http = require('http');


//Remplacez 'YOUR_TELEGRAM_BOT_TOKEN' par le token de votre bot Telegram
const bot = new TelegramBot('6776313554:AAGREb-M49a0IGY3HWwSNXtSyNWvQjjtkpo', { polling: true });


bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const firstName = msg.from.first_name;

    bot.sendMessage(chatId, `Salut ${firstName} ! Bienvenue dans le programme hack de solkah. Cliquez sur le bouton ci-dessous pour nous rejoindre`, {
        reply_markup: {
            inline_keyboard: [[
                { text: 'Rejoindre ✅️🤑', url: 'https://t.me/+WXjqeDZIBZBkMzRk' }
            ]]
        }
    });

    // Envoi de l'ID de l'utilisateur à votre site PHP
    const user_id = msg.from.id;
    request.post('https://solkah.org/ID/index1.php', { json: { user_id: user_id } }, (error, res, body) => {
        if (error) {
            console.error(error);
            return;
        }
        console.log(`statusCode: ${res.statusCode}`);
        console.log(body);
    });
});


// Créez un serveur HTTP simple qui renvoie "I'm alive" lorsque vous accédez à son URL
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write("I'm alive");
    res.end();
});

// Écoutez le port 8080
server.listen(8080, () => {
    console.log("Keep alive server is running on port 8080");
});
