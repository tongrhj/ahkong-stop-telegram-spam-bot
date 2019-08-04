const service = {
  _validMessageType: message => {
    return (
      message &&
      (message.text ||
        message.photo ||
        message.video ||
        message.sticker ||
        message.animation ||
        message.venue ||
        message.poll ||
        message.pinned_message ||
        message.new_chat_title ||
        message.new_chat_photo)
    );
  },
  handleMessage: ctx => async message => {
    if (service._validMessageType(message)) {
      return true;
    } else {
      try {
        console.log(
          `Deleting: chat id ${message.chat.id}, message id ${message.message_id}`
        );
        const result = await ctx.telegram.deleteMessage(
          message.chat.id,
          message.message_id
        );
        console.log(
          `Deleted chat id ${message.chat.id}, message id ${message.message_id}: `,
          message
        );
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    }
  }
};

module.exports = service;
