import mongoose from "mongoose";
import { CONNECTION_STRING } from "./environmentVariables.js";

export function connectDatabase() {
    return mongoose.connect(CONNECTION_STRING, {
        serverSelectionTimeoutMS: 5000 //limita um tempo para o app não travar esperando conectar
    });
}