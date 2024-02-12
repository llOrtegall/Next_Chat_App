import { Schema, model } from 'mongoose'

const MessageSchema = new Schema({
  sender: { type: Schema.Types.ObjectId, ref: 'User' },
  recipient: { type: Schema.Types.ObjectId, ref: 'User' },
  text: String
}, { timestamps: true, versionKey: false })

export const MessageModel = model('Message', MessageSchema)
