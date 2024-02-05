import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../helpers/validarCampos.js";
import { existeEmail } from "../helpers/db-validators.js";
import {
  actualizarUsuario,
  eliminarUsuario,
  registrarUsuarios,
} from "../controllers/usersController.js";
import { validarJWT } from "../helpers/validarJWT.js";

export const router = Router();

router.post(
  "/",
  [
    check("nombre", "El nombre es requerido").not().isEmpty(),
    check("apellido", "El apellido es requerido").not().isEmpty(),
    check("email", "El email es requerido").not().isEmpty(),
    check(
      "password",
      "La contraseña debe tener mínimo de 6 caracteres"
    ).isLength({
      min: 6,
    }),
    check("tipoUsuario", "El tipo de usuario es requerido").not().isEmpty(),    
    check("email").custom(existeEmail),
    validarCampos,
  ],
  registrarUsuarios
);

router.delete(
  "/:id",
  [validarJWT, check("id", "Identificador de usuario inválido").isMongoId()],
  eliminarUsuario
);

router.put(
  "/:id",
  [validarJWT, check("id", "Identificador de usuario inválido").isMongoId()],
  actualizarUsuario
);
