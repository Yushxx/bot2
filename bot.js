const TelegramBot = require('node-telegram-bot-api');
const token = '6776313554:AAGREb-M49a0IGY3HWwSNXtSyNWvQjjtkpo';
const bot = new TelegramBot(token, {polling: true});

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
