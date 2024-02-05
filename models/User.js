import { Schema, model } from "mongoose";

const usuarioSchema = Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre es requerido."],
      trim: true,
    },
    apellido: {
      type: String,
      required: [true, "El apellido es requerido."],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "El email es requerido."],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "La contraseña es requerida."],
      trim: true,
    },
    tipoUsuario: {
      type: String,
      required: [true, "El tipo de usuario es requerido."],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

usuarioSchema.methods.toJSON = function () {
  const { __v, _id, password, createdAt, updatedAt, ...rest } = this.toObject();
  rest.uid = _id;
  return rest;
};

//Definimos el modelo, recibe el nombre del modelo y el Schema
const User = model("User", usuarioSchema);

export default User;
