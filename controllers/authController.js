import { request, response } from "express";
import bcryptjs from "bcryptjs";

import User from "../models/User.js";
import { generarJWT } from "../helpers/generarJWT.js";

export const login = async (req = request, res = response) => {
  const { email, password } = req.body;

  try {
    const usuario = await User.findOne({ email });

    if (!usuario) {
      return res
        .status(400)
        .json({ ok: false, msg: "El email no se encuentra registrado" });
    }

    if (!bcryptjs.compareSync(password, usuario.password)) {
      return res.status(400).json({ ok: false, msg: "Contraseña Incorrecta" });
    }

    res.json({
      usuario,
      token: await generarJWT(usuario.id),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};
