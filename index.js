const TelegramBot = require('node-telegram-bot-api');
const { gameOption, againOption} = require("./option")

const token = "6875436247:AAFGG9QjpryIxlOxaM7FXWFFP6CF-eygJFo";

const bot = new TelegramBot(token, {polling: true});

const obj = {};



const startGame = async chatId => {
  await bot.sendMessage(
    chatId,
    "Bot 0dan 9gacha son o'ylaydi, siz uni tpishga  harakat qiling"
  );
  const randomNumber = Math.floor(Math.random() * 10);
  obj[chatId] = randomNumber;
  await bot.sendMessage(chatId, "To'g'ri sonni toping", gameOption)
}  



const bootstrap = () => {
  bot.setMyCommands([
    {
      command: "/start",
      description: "Botni qaytadan ishga tushirish",
    },
    {
      command: "/info",
      description: "O'zingiz haqingizda haqida ma'lumot",
    },
    {
      command: "/game",
      description: "O'yin o'ynash",
    },
    {
      command: "/phone",
      description: "telefon raqam berish",
    }
  ])
  
  bot.on('message', async (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;
    if(text === "/start"){
      return bot.sendMessage(chatId, `Assalomu alaykum xurmatli ${msg.chat.first_name} sizni Makon Ta'lim botimizda ko'rib turganimizdan juda xursandmiz`)
    }
    if(text === "/info"){
      await bot.sendSticker(chatId, "https://tlgrm.eu/_/stickers/4dd/300/4dd300fd-0a89-3f3d-ac53-8ec93976495e/1.webp")
      return bot.sendMessage(chatId, `Sizning UserName ${msg.from.username} sizning ismingiz esa ${msg.from.first_name}`);
    }

    if(text === "/game"){
      return startGame(chatId)
    }
    if(text === "/phone"){
      // await bot.sendMessage(chatId, "Nomer Ulashish", getContact);
      const chatId = msg.chat.id;
      bot.sendMessage(chatId, 'Assalomu alaykum! Telefon raqamingizni yuboring:', {
          reply_markup: {
              keyboard: [[{ text: "Telefon raqamini jo'natish", request_contact: true }]],
              resize_keyboard: true
          }
      });
    }
  
  });
  bot.on("contact", msg => {
    const chatId = msg.chat.id;
    const phoneNumber = msg.contact.phone_number;
    bot.sendMessage(chatId, `Sizning telefon raqamingiz: ${phoneNumber}`);
  })

  bot.on("callback_query", msg => {
    const data = msg.data;
    const chatId = msg.message.chat.id;

    if(data === "/again"){
      return startGame(chatId);
    }

    if(data == obj[chatId]) {
      return bot.sendMessage(
        chatId,
        `Tabriklaymiz siz to'g'ri javob berdingiz, Bot ${obj[chatId]} sonini tanlagan edi`
      )
    }else{
      bot.sendMessage(chatId, `Siz noto'g'ri son tanladingiz tanlagan soningiz ${data},Bot ${obj[chatId]} sonini tanlagan edi`, againOption)
    }  

  })
}

bootstrap();

