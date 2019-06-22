
const service = {
  validMessageType: (ctx) => (message) => message &&
    (message.text || message.photo || message.sticker)),
  handleMessage: (ctx) => (message) => {
    if (service.validMessageType(ctx)(message)) {
      console.log('Ignoring: ', message.message_id)
      return true
    } else {
      try {
        console.log('Deleting: ', message.message_id)
        // await ctx.deleteMessage()
        return true
      } catch (error) {
        console.log(error)
        return false
      }
    }
  }
}

module.exports = service
