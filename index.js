// serverless
import ServerlessHttp from 'serverless-http';

// express related
import cors from 'cors';
// import 'dotenv/config.js';
import express from 'express';
import cookieParser from 'cookie-parser';
import authRouter from './routers/auth.js';
import productsRouter from './routers/products.js';

// database related
import connectToDb from './db/db.js';

const app = express();

// common middlewares
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true }));

// routers
app.use('/auth', authRouter);
app.use('/products', productsRouter);

// once db is connected, start the server
connectToDb()
  .then(() => {
    app.listen(process.env.SERVER_PORT, () => {
      console.log('Server initialized on port: ' + process.env.SERVER_PORT);
    });
  })
  .catch((error) => console.log('Failed to start the server', error));

export const handler = ServerlessHttp(app);
