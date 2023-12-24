// express related
import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./routers/auth.js";
import productsRouter from "./routers/products.js";

// mongoose related
import mongooseClient from "./db/db.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRouter);
app.use("/products", productsRouter);

app.listen(3000, () => {
  console.log("Express server initialized");

  // const collection = mongooseClient.connection.db.collection("data");

  // collection
  //   .find({})
  //   .toArray()
  //   .then((data) => {});
});
