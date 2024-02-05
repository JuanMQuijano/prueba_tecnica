import Express from "express";
import dotenv from "dotenv";
import cors from "cors";
import conectarDB from "./config/conectarDB.js";
import { router as usersRouter } from "./routers/usersRouter.js";
import { router as authRouter } from "./routers/authRouter.js";
import { router as productsRouter } from "./routers/productsRouter.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = Express();
conectarDB();

app.use(cors());
app.use(Express.json());

app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);
app.use("/api/products", productsRouter);

app.listen(PORT, () => {
  console.log(`Funcionando en http://localhost:${PORT}`);
});
