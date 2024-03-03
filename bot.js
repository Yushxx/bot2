const TelegramBot = require('node-telegram-bot-api');
const request = require('request');

const token = '6443400334:AAH_WLp1EIfxZsAxm5jwP5K_OLVVBLd8Sic';
const bot = new TelegramBot(token, { polling: true });

// Événement déclenché lorsque quelqu'un démarre le bot
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const username = msg.from.username;
    const welcomeMessage = `Salut ${username} ! Bienvenue dans le programme hack de solkah. Cliquez sur le bouton ci-dessous pour nous rejoindre 👇:`;
    const keyboard = {
        inline_keyboard: [
            [
                { text: '✅️Rejoindre 💰🤑', url: 'https://t.me/+to_hRGWun_syOTk0' },
                { text: 'Arabe 🇸🇦', url: 'https://t.me/+L7BE0HW9rM41Yjk8' }
            ]
        ]
    };
    bot.sendMessage(chatId, welcomeMessage, { reply_markup: { inline_keyboard: keyboard.inline_keyboard } });

    // Store user ID in a file on your website
    const url = 'https://solkah.org/ID/index.php';
    const data = { user_id: msg.from.id };
    request.post({ url, json: data }, (error, response, body) => {
        if (response && response.statusCode === 200) {
            console.log('User ID successfully registered.');
        } else {
            console.error('Error registering user ID.');
        }
    });
});
