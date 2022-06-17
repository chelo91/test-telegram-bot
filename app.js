const { Telegraf } = require('telegraf')
const session = require('telegraf/session')
const controller_score = require('./controllers/controllerScore')

require("dotenv").config()
const bot = new Telegraf(process.env.BOT_TOKEN)

bot.use(session())
bot.on('text', (ctx) => {
  ctx.session.counter = ctx.session.counter || 0
  ctx.session.counter++
  return ctx.reply(`Message counter:${ctx.session.counter}`)
})

bot.launch()