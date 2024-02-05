import { request, response } from "express";
import bcryptjs from "bcryptjs";

import User from "../models/User.js";

export const registrarUsuarios = async (req = request, res = response) => {
  const { nombre, apellido, email, password, password_confirm, tipoUsuario } =
    req.body;

  if (password !== password_confirm) {
    res.json({ ok: false, msg: "Las contraseñas no coinciden" });
    return;
  }

  try {
    const usuario = new User({
      nombre,
      apellido,
      email,
      password,
      tipoUsuario,
    });

    usuario.password = bcryptjs.hashSync(password, bcryptjs.genSaltSync(10));

    await usuario.save();

    res.status(201).json({
      ok: true,
      msg: "Usuario Registrado Correctamente",
    });
  } catch (error) {
    console.log(error);
  }
};

export const eliminarUsuario = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    const usuario = await User.findById(id);

    if (usuario._id.toString() !== req.user.id) {
      return res.status(401).json({
        ok: false,
        msg: "No tiene permisos para eliminar esta cuenta",
      });
    }

    await usuario.deleteOne();

    return res.status(200).json({
      ok: true,
      msg: "Cuenta Eliminada",
    });
  } catch (error) {
    console.log(error);
  }
};

export const actualizarUsuario = async (req = request, res = response) => {
  const { id } = req.params;
  const { nombre, apellido, email } = req.body;

  try {
    const usuario = await User.findById(id);

    if (usuario._id.toString() !== req.user.id) {
      return res.status(401).json({
        ok: false,
        msg: "No tiene permisos para actualizar la información esta cuenta",
      });
    }

    usuario.nombre = nombre || usuario.nombre;
    usuario.apellido = apellido || usuario.apellido;
    usuario.email = email || usuario.email;

    await usuario.save();

    return res.status(200).json({
      ok: true,
      msg: "Cuenta Actualizada",
    });
  } catch (error) {
    console.log(error);
  }
};
