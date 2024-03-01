const TelegramBot = require('node-telegram-bot-api');
const http = require('http');

const token = '6776313554:AAGREb-M49a0IGY3HWwSNXtSyNWvQjjtkpo';

// Créer un nouveau bot en utilisant le token
const bot = new TelegramBot(token, { polling: true });

let users = {};

// Événement déclenché lorsque quelqu'un démarre le bot
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const username = msg.from.username;
    const welcomeMessage = `Salut ${username} ! Bienvenue dans le programme *hack de solkah*. Cliquez sur le bouton ci-dessous pour nous rejoindre   👇👇:`;
    const keyboard = {
        inline_keyboard: [
            [{ text: 'Rejoindre 💰🤑', url: 'https://t.me/+toA5QPKK5Nc4MTc0' }]
        ]
    };

    // Envoyer le message de bienvenue avec le bouton pour rejoindre
    bot.sendMessage(chatId, welcomeMessage, { reply_markup: keyboard });

    // Envoyer un message dans le canal
    const channelId = '@retraitfree221'; // ID du canal
    const message = `Nouvel utilisateur a démarré le bot. ID: ${msg.from.id}, Nom d'utilisateur: @${msg.from.username}`;
    bot.sendMessage(channelId, message);

    // Ajouter l'utilisateur à la liste des utilisateurs
    users[msg.from.id] = msg.from.username;
});

// Événement déclenché lorsque vous envoyez /tool
bot.onText(/\/tool/, (msg) => {
  const chatId = msg.chat.id;

  const opts = {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Envoyer un message aux utilisateurs du bot', callback_data: 'send_message' }]
      ]
    }
  };

  bot.sendMessage(chatId, 'Choisissez une option:', opts);
});

// Gestion des clics sur les boutons inline keyboard
bot.on('callback_query', (callbackQuery) => {
  const chatId = callbackQuery.message.chat.id;
  const userId = callbackQuery.from.id;
  
  if (callbackQuery.data === 'send_message') {
    bot.sendMessage(chatId, 'Veuillez envoyer le message que vous souhaitez envoyer aux utilisateurs:');
    
    // Mettre en attente la réponse de l'utilisateur pour le message à envoyer
    bot.once('message', (msg) => {
      const messageToSend = msg.text;
      if (!messageToSend) {
        bot.sendMessage(chatId, 'Message invalide. Veuillez réessayer.');
        return;
      }

      bot.sendMessage(chatId, 'Veuillez envoyer les médias (photo, vidéo, fichier) à envoyer aux utilisateurs. Envoyez "/done" lorsque vous avez terminé.');

      let media = [];

      // Mettre en attente des médias de l'utilisateur
      bot.on('message', (msg) => {
        if (msg.photo || msg.video || msg.document) {
          media.push({ type: 'photo', media: msg.photo ? msg.photo[msg.photo.length - 1].file_id : null });
          media.push({ type: 'video', media: msg.video ? msg.video.file_id : null });
          media.push({ type: 'document', media: msg.document ? msg.document.file_id : null });
        } else if (msg.text === '/done') {
          // Envoyer les médias aux utilisateurs
          Object.keys(users).forEach((userId) => {
            bot.sendMediaGroup(userId, media);
            bot.sendMessage(userId, messageToSend);
          });

          bot.sendMessage(chatId, 'Message et médias envoyés avec succès à tous les utilisateurs.');
          media = [];
        }
      });
    });
  }
});// Créez un serveur HTTP simple qui renvoie "I'm alive" lorsque vous accédez à son URL
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write("I'm alive");
    res.end();
});

// Écoutez le port 8080
server.listen(8080, () => {
    console.log("Keep alive server is running on port 8080");
});

