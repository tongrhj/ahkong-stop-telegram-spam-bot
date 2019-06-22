require('dotenv').config()

const express = require('express');
const app = express();
const cors = require('cors');
const Telegraf = require('telegraf')

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN)
app.use(bot.webhookCallback('/secret-path-4815162342/'))
bot.telegram.setWebhook('https://historical-art.glitch.me:8443/secret-path-4815162342/')

bot.start((ctx) => ctx.reply('Welcome'))
bot.on('message', (ctx) => ctx.reply('hello world'))

app.get('/', function (req, res) {
  res.send('hello world')
})

app.post(`/${process.env.WEBHOOK_SLUG}`, cors(), (req, res) => {
  res.sendStatus(200)
})

app.options('*', cors())

// listen for requests :)
const listener = app.listen(8443, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
