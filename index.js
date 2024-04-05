const TelegramBot = require('node-telegram-bot-api');


const token = "6875436247:AAFGG9QjpryIxlOxaM7FXWFFP6CF-eygJFo";

const bot = new TelegramBot(token, {polling: true});

const obj = {};

const gameOption = {
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "1",
          callback_data: '1',
        },
        {
          text: "2",
          callback_data: '2',
        },
        {
          text: "3",
          callback_data: '3',
        },
      ],
      [
        {
          text: "4",
          callback_data: '4',
        },
        {
          text: "5",
          callback_data: '5',
        },
        {
          text: "6",
          callback_data: '6',
        },
      ],
      [
        {
          text: "7",
          callback_data: '7',
        },
        {
          text: "8",
          callback_data: '8',
        },
        {
          text: "9",
          callback_data: '9',
        },
      ],
      [
        {
          text: "0",
          callback_data: "0"
        }
      ]
    ]
  }
};

const againOption = {
  reply_markup: {
    inline_keyboard: [
      {
        text: "Qaytadan boshlash",
        callback_data: "/again"
      }
    ]
  }
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
      await bot.sendMessage(
        chatId,
        "Bot 0dan 9gacha son o'ylaydi, siz uni tpishga  harakat qiling"
      );
      const randomNumber = Math.floor(Math.random() * 10);
      obj[chatId] = randomNumber;
      return bot.sendMessage(chatId, "To'g'ri sonni toping", gameOption)
    }
  
  });

  bot.on("callback_query", msg => {
    const data = msg.data;
    const chatId = msg.message.chat.id;

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

