import mongodb from 'mongoose'

const UsuarioSchema = new mongodb.Schema({
  username: { type: String, unique: true },
  password: { type: String }
}, { timestamps: true, versionKey: false })

export const UserModel = mongodb.model('User', UsuarioSchema)
