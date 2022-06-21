const { Telegraf } = require('telegraf')
const { MongoClient } = require('mongodb');
const { session } = require('telegraf-session-mongodb');

const controller_score = require('./controllers/controllerScore')

require("dotenv").config()
const bot = new Telegraf(process.env.BOT_TOKEN)

MongoClient.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(client => {

    const db = client.db();
    bot.use(session(db, { collectionName: 'sessions' }));

    bot.start((ctx) => ctx.reply('https://giphy.com/gifs/cat-hello-hey-VOPK1BqsMEJRS'))

    bot.help((ctx) => ctx.reply('win - Add 3 points \n' +
      'draw - Add 1 point \n' +
      'points - Show the score for a person \n' +
      'table - Show all scores \n' +
      'restart - Restart scores'));

    bot.command('/win', (ctx) => controller_score.win(ctx));

    bot.command('/draw', (ctx) => controller_score.draw(ctx));

    bot.command('/points', (ctx) => controller_score.points(ctx));

    bot.command('/restart', (ctx) => controller_score.restart(ctx));

    bot.command('/table', (ctx) => controller_score.table(ctx));

    bot.command('/set', (ctx) => controller_score.set(ctx));

  });

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
