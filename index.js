const {Telegraf} = require('telegraf');
const {v4: uuidv4} = require('uuid');
let factGenerator = require('./factGenerator');
require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
    let message = "Hello, I am a bot that generates random facts. To get a fact, type /fact";
    ctx.reply(message);
})

bot.command("fact",async(ctx)=>{
    try {
        ctx.reply("Generating image,Please Wait...")
        let imagePath = `./temp/${uuidv4()}.jpg`;
        await factGenerator.generateFactImage(imagePath);
        await ctx.replyWithPhoto({source: imagePath});
        factGenerator.deleteImage(imagePath);
    } catch (error) {
        console.log(error);
        ctx.reply('Error generating fact')
    }
    
})

bot.launch();