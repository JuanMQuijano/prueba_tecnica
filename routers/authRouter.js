import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../helpers/validarCampos.js";
import { login } from "../controllers/authController.js";

export const router = Router();

router.post(
  "/",
  [
    check("email", "El email es obligatorio").isEmail(),
    check("password", "La contraseña es obligatoria").not().isEmpty(),
    validarCampos,
  ],
  login
);
