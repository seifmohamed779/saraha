const { Schema, Types, model } = require("mongoose");

const messageSchema = new Schema(
  {
    content: {
      type: String,
      required: function () {
        return !this.attachments.length;
      },
    },
    attachments: [String],
    receiverId: {
      type: Types.ObjectId,
      ref: "Users",
      required: true,
    },
    senderId: { type: Types.ObjectId, ref: "Users" },
  },
  {
    timestamps: true,
    optimisticConcurrency: true,
    toJSON: {
      virtuals: true,
    },
  }
);

const messageModel = model("Messages", messageSchema);
export default messageModel;