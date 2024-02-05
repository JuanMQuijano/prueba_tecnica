import { Schema, model } from "mongoose";

const productSchema = Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre es requerido"],
      trim: true,
    },
    precio: {
      type: String,
      required: [true, "El precio es requerido"],
      trim: true,
    },
    cantidad: {
      type: Number,
      required: [true, "La cantidad es requerida"],
      trim: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "El id del usuario es requerido"],
    },
  },
  {
    timestamps: true,
  }
);

productSchema.methods.toJSON = function () {
  const { __v, _id, createdAt, updatedAt, ...product } = this.toObject();
  product.uid = _id;
  return product;
};

export const Product = model("Product", productSchema);
