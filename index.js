const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const token = '5966478403:AAEDNLtm7B1EGKSJZsZ8t6Mdm7AUGSUdF4c';
const bot = new TelegramBot(token, {polling: true});

const getData = async (url) => {
    let a =0;
      await axios.get(url)
            .then(res => a = res.data)
    
    return a;
   
}


bot.onText(/\/start/, (msg) => {

    bot.sendMessage(msg.chat.id, "Welcome");
        
    });


bot.onText(/\/bitcoin/, (msg) => {

        
        let fn = async () => {
            let data = await getData('https://data.gateio.co/api2/1/ticker/btc_usdt');
            
             bot.sendMessage(msg.chat.id, `${data.last}$`);
        }
        fn();
});