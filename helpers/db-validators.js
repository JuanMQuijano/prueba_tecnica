import { Product } from "../models/Product.js";
import User from "../models/User.js";

export const existeEmail = async (email = "") => {
  const existe = await User.findOne({ email });

  if (existe) {
    throw new Error(`El email ya está registrado`);
  }
};

export const existeProducto = async (id) => {
  const existe = await Product.findById(id);

  if (!existe) {
    throw new Error(`El id no existe`);
  }
};
