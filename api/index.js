const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const Telegraf = require("telegraf");
const utils = require("../lib/telegram.js");

app.use(helmet());

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN, {
  telegram: {
    username: "AhKongBot",
    channelMode: false
  }
});
app.use(bot.webhookCallback(`/${process.env.WEBHOOK_SLUG}`));
// bot.telegram.setWebhook(`https://ahkong.now.sh/${process.env.WEBHOOK_SLUG}`)

bot.start(ctx => {
  console.log(ctx.message);
  ctx.reply("Hello World");
});
bot.on(["message", "edited_message"], async ctx => {
  const message = ctx.message || ctx.edited_message;
  console.log("Received: ", JSON.stringify(message));
  await utils.handleMessage(ctx)(message);
});

app.get("*", (req, res) => {
  res.status(200).send("hello world");
});

app.post(`*`, cors(), (req, res) => {
  res.sendStatus(200);
});

app.options("*", cors());

app.listen();

module.exports = app;