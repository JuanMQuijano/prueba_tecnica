import mongoose from "mongoose";

const conectarDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Conectado a BD");
  } catch (error) {
    console.log(`Error: ${error.message}`);
    //Forzamos el cierre de los otros procesos en caso de error
    process.exit(1);
  }
};

export default conectarDB;
