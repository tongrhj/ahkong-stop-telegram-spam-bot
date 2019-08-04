const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
  apiKey: '### FIREBASE API KEY ###',
  authDomain: '### FIREBASE AUTH DOMAIN ###',
  projectId: '### CLOUD FIRESTORE PROJECT ID ###'
});

var db = firebase.firestore();


const service = {
  // Telegram Message Types: https://core.telegram.org/bots/api#message
  validMessageType: (message) => message &&
    (message.text || message.photo || message.sticker || message.video || message.animation || message.video_note || message.venue || message.poll || message.pinned_message || message.new_chat_members || message.new_chat_title || message.new_chat_photo)),
  messageTypePermittedByMember: async (ctx) => async (message) => {
    if (!message) { return false }
    if (!message.from || !message.from.id) { return true }
    // Sample data: "from":{"id":420295883,"is_bot":false,"first_name":"123","username":"qwerty"}
    // const member = await ctx.getMember(message.from.id)
    // const logEntry = aws.dynamodb.get(member.id)
    // if (logEntry.channelJoinDate < luxon(30.minutes.ago)) {
    //   if (message.text) {
    //      // https://core.telegram.org/bots/api#messageentity
    //      return !message.entities.find(entity => ['url', 'text_link'].includes(entity.type)))
    //   }
    //   return false // only allow new members to post text messages
    // }
  },
  log: async (ctx) => async (message) => {

  },
  handleMessage: async (ctx) => async (message) => {
    if (service.validMessageType(message)) {
      return true
    } else {
      try {
        console.log(`Deleting: chat id ${message.chat.id}, message id ${message.message_id}`)
        const result = await ctx.deleteMessage(message.chat.id, message.message_id)
        console.log(`Deleted ${message.message_id}: `, JSON.stringify(result))
        return true
      } catch (error) {
        console.log(error)
        return false
      }
    }
  }
}

module.exports = service
