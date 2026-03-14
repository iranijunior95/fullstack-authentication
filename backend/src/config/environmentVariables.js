import dotenv from "dotenv";

dotenv.config();

const PORT = Number(process.env.PORT || 3001);
const CONNECTION_STRING = process.env.CONNECTION_STRING;
const SALTS_ROUNDS = Number(process.env.SALTS_ROUNDS);
const JWT_SECRET = process.env.JWT_SECRET;

export {
    PORT,
    CONNECTION_STRING,
    SALTS_ROUNDS,
    JWT_SECRET
}