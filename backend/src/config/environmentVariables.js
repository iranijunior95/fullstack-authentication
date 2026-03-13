import dotenv from "dotenv";

dotenv.config();

const PORT = Number(process.env.PORT || 3001);
const CONNECTION_STRING = process.env.CONNECTION_STRING;

export {
    PORT,
    CONNECTION_STRING
}