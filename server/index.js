import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import usersRouter from './router/users';
import productRouter from './router/products';
import authRouter from './router/auth';
import categoryRouter from './router/categories';
import orderRouter from './router/orders';
import { SERVER_PORT, DB_ADDRESS, CLIENT_ADDRESS } from './constants/env';

const app = express();

app.use(cors({ origin: CLIENT_ADDRESS }));

//mongodb 연결
mongoose.set('strictQuery', false);
mongoose
  .connect(`mongodb+srv://${DB_ADDRESS}/?retryWrites=true&w=majority`)
  .then(() => console.log('db연결 성공'))
  .catch((err) => console.log(err));

//req.body로 데이터 받아오려면 써야하는 것
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//라우터
app.use('/api/users', usersRouter);
app.use('/api/products', productRouter);
app.use('/api/auth', authRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/orders', orderRouter);

app.use((err, req, res, next) => {
  console.log(err);
  res.send(err.message);
});

//서버열기 'localhost:3001'
app.listen(SERVER_PORT, (req, res) => {
  console.log('시작');
});
