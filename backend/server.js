import express from "express";
import router from "./src/routes/router.js";
import { connectDatabase } from "./src/config/databaseConnection.js";
import { PORT } from "./src/config/environmentVariables.js";

const app = express();

app.use(express.json());
app.use("/api", router);

connectDatabase()
.then(() => {
    console.log(`🟢 Banco de Dados conectado com sucesso!`);

    app.listen(PORT, () => console.log(`🚀 Servidor Rodando na porta ${PORT}!`));
})
.catch((error) => {
    console.log(`🔴 Erro ao conectar ao Banco de Dados: ${error.message}`);

    process.exit(1);
});