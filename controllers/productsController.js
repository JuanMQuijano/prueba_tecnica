import { request, response } from "express";
import { Product } from "../models/Product.js";

export const registrarProducto = async (req = request, res = response) => {
  const { nombre, precio, cantidad } = req.body;
  const { _id: user } = req.user;

  try {
    const data = {
      nombre,
      precio,
      cantidad,
      user,
    };

    const product = new Product(data);

    await product.save();

    res.status(201).json({ ok: true, msg: "Producto Agregado Correctamente" });
  } catch (error) {
    console.log(error);
  }
};

export const obtenerProductos = async (req = request, res = response) => {
  try {
    const products = await Product.find();

    res.status(200).json(products);
  } catch (error) {
    console.log(error);
  }
};

export const eliminarProducto = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    const producto = await Product.findById(id);

    if (producto.user.toString() !== req.user.id) {
      return res.status(401).json({
        ok: false,
        msg: "No tiene permisos para eliminar este producto",
      });
    }

    await producto.deleteOne();

    return res.status(200).json({
      ok: true,
      msg: "Producto Eliminado",
    });
  } catch (error) {
    console.log(error);
  }
};

export const obtenerProducto = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id).populate(
      "user",
      "nombre apellido"
    );
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
  }
};

export const actualizarProducto = async (req = request, res = response) => {
  const { id } = req.params;
  const { nombre, precio, cantidad } = req.body;

  try {
    const product = await Product.findById(id);

    if (product.user.toString() !== req.user.id) {
      return res.status(401).json({
        ok: false,
        msg: "No tiene permisos para actualizar este producto",
      });
    }

    product.nombre = nombre || product.nombre;
    product.precio = precio || product.precio;
    product.cantidad = cantidad || product.cantidad;

    await product.save();

    res
      .status(201)
      .json({ ok: true, msg: "Producto Actualizado Correctamente" });
  } catch (error) {
    console.log(error);
  }
};

export const obtenerProductsByUser = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    const productos = await Product.find({
      user: id,
    });

    res.status(200).json(productos);
  } catch (error) {
    console.log(error);
  }
};
