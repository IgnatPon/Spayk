const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');

const txtomp3 = require("text-to-mp3");
const  binaryStream = 'test';
const axios = require('axios');
const token = '5966478403:AAEDNLtm7B1EGKSJZsZ8t6Mdm7AUGSUdF4c';
const bot = new TelegramBot(token, {polling: true});
const allCoins = ['btc','eth','bnb','xrp','doge','matic','sol','dot','ltc','trx','avax','ton','near','ape','algo','mana','sand','apt','ht','twt','cake','ada','gmt','sushi','ksm','luna','kda','glmr','sfp','shib']
const getData = async (symbol) => {
    symbol = symbol.toUpperCase();
    if (symbol == 'WAXP') return
   
    let url;
    url = `https://openapi-v2.kucoin.com/api/v1/market/orderbook/level2_20?symbol=${symbol}-USDT`;
    try {
        const { data } = await axios.get(url)
        const price = data.price || data.last || data.data.bids[0][0];
        return price;
    } catch (error) {
        console.error(error);
    }
    
    return a;
   
}


bot.setMyCommands(
    [
      { command: '/start', description: 'Начало работы' },
      { command: '/all', description: 'Получить множество монет с биржи Kucoin' },
      { command: '/danik', description: 'Отправь Данику данные о крипте)' }
    ]
  )
  
  
  
  
  //1898914221
  bot.onText(/\/start/, (msg) => {
  
    bot.sendMessage(msg.chat.id, "Welcome");
    
  
  });
  
  
  
  
  
  bot.onText(/\/all/, async (msg) => {
  
  
  
    let send = () => {
      bot.sendSticker(msg.chat.id, "https://tlgrm.ru/_/stickers/4e0/60a/4e060a5e-5bbe-3863-a9c7-62a5483692d4/2.webp")
      bot.sendMessage(msg.chat.id, s.join(''));
    }
    let s = [];
    let fn = async () => {
  
      await allCoins.forEach(async (el, i) => {
        let price = await getData(el);
        if (price != undefined) {
          s.push(`${el.toUpperCase()}: ${price}$\n`);
  
  
        }
  
  
  
      })
  
  
  
    }
    fn();
    let readyCheaker = setInterval(() => {
      if (s.length == allCoins.length) {
  
        send()
        clearInterval(readyCheaker)
      }
    }, 1000);
  
  
  });
  
  
  
  bot.onText(/\/danik/, async (msg) => {
  
  
  
    let send = () => {
      bot.sendSticker(1898914221, "https://tlgrm.ru/_/stickers/4e0/60a/4e060a5e-5bbe-3863-a9c7-62a5483692d4/2.webp")
      bot.sendMessage(1898914221, s.join(''));
    }
    let s = [];
    let fn = async () => {
  
      await allCoins.forEach(async (el, i) => {
        let price = await getData(el);
        if (price != undefined) {
          s.push(`${el.toUpperCase()}: ${price}$\n`);
  
  
        }
  
  
  
      })
  
  
  
    }
    fn();
    let readyCheaker = setInterval(() => {
      if (s.length == allCoins.length) {
  
        send()
        clearInterval(readyCheaker)
      }
    }, 1000);
  
  
  });







  bot.onText(/\/voice/,async (msg) => {
    let send = async (voic) => {
    
      await txtomp3.getMp3(voic, function(err, binaryStream){
        if(err){
          console.log(err);
          return;
        }
        let file = fs.createWriteStream(`${msg.chat.id}.mp3`); // write it down the file
        file.write(binaryStream);
        file.end();
        
      });

      
      
    }


    let text = msg.text.slice(7, msg.text.length);
    
    
    
    await send(text)

    let interval = setInterval( () => {

      const path = `${msg.chat.id}.mp3`

      fs.access(path, fs.F_OK, async (err) => {
        if (!err) {
          await bot.sendVoice(msg.chat.id,`${msg.chat.id}.mp3`)
            fs.unlink(`${msg.chat.id}.mp3`, () => {});
            clearInterval(interval); 
          return
        }
      })
      
       
         
        
      
       
      
    },500)
    
    
     
  
  });
   

 