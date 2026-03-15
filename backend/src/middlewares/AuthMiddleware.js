import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/environmentVariables.js";

function validateUserData(req, res, next) {
    const { email, password } = req.body;

    const errorMessages = [];

    if(!email) errorMessages.push({ field: "email", message: "Campo email é obrigatório" });
    if(!password) errorMessages.push({ field: "password", message: "Campo password é obrigatório" });

    if(errorMessages.length > 0) {
        return res.status(422).json({
            message: "Erros de validação",
            error: errorMessages
        });
    }

    next();
}

function validateAccessAuthentication(req, res, next) {
    const token = req.cookies.token;

    if(!token) {
        return res.status(401).json({ message: "Token não localizado" });
    }

    try {
        const decodedToken = jwt.verify(token, JWT_SECRET);
        req.userData = decodedToken;
        next();

    } catch (error) {
        console.log(`Erro na validação do token: ${error.message}`);

        return res.status(401).json({ message: "Token inválido ou expirado. Faça login novamente." });
    }    
}

export default { 
    validateUserData,
    validateAccessAuthentication 
}