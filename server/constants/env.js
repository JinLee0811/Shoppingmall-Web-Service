import dotenv from 'dotenv';
dotenv.config();

export const SERVER_PORT = process.env.SERVER_PORT;
export const DB_ADDRESS = process.env.DB_ADDRESS;
export const JWT_SECRET = process.env.JWT_SECRET;
export const CLIENT_ADDRESS = process.env.CLIENT_ADDRESS;
