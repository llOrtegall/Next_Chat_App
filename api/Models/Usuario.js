import mongodb from 'mongoose'

const UsuarioSchema = new mongodb.Schema({
  nombres: { type: String },
  usuario: { type: String, unique: true },
  documento: { type: Number, unique: true },
  contrasena: String
}, { timestamps: true })

export const UserModel = mongodb.model('Usuario', UsuarioSchema)
