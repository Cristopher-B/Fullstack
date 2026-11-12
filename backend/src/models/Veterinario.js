import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import { randomBytes } from 'node:crypto'

const { Schema, model } = mongoose

const veterinarioSchema = new Schema(
    {
        nombre: {
            type: String,
            required: true,
            trim: true // Borrar espacios al comienzo y al final
        },
        apellido: {
            type: String,
            required: true,
            trim: true
        },
        direccion: {
            type: String,
            required: true,
            trim: true
        },
        celular: {
            type: String,
            required: true,
            trim: true,
            default: null
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        status: {
            type: Boolean,
            default: null
        },
        token: {
            type: String,
            default: null
        },
        confirmarEmail: {
            type: Boolean,
            default: true
        },
        rol: {
            type: String,
            default: 'veterinario'
        }
    },
    {
        timestamps: true
    }
)

// Metodo para cifrar la contraseña
veterinarioSchema.methods.encryptPassword = async function (passwordUser) {
    const salt = await bcrypt.genSalt(10)
    const passwordEncrypt = await bcrypt.hash(passwordUser, salt)
    return passwordEncrypt
}

// Metodo para verificar si el password es el mismo que la BD
veterinarioSchema.methods.matchPassword = async function (passwordUser) {
    const response = await bcrypt.compare(passwordUser, this.password)
    return response
}

// Metodo para crear un token (OTP) para el correo no JWT
veterinarioSchema.methods.createToken = function () {
    const token = randomBytes(20).toString('hex')
    this.token = token
    return token
}

export default model('Veterinario', veterinarioSchema)