import validator from "validator";
import bcrypt from "bcrypt";
import { Users } from "../models/Users.js";
import { SALTS_ROUNDS, JWT_SECRET } from "../config/environmentVariables.js";

async function registerUsers(req, res) {
    const { name, email, password } = req.body;

    try {
        //validar se o email é valido
        const validatedEmail = validator.isEmail(email);

        if(!validatedEmail) {
            return res.status(422).json({
                message: "Erros de validação",
                error: {
                    field: "email",
                    message: "Esse não é um email valido"
                }
            });
        }

        //validar se o email já esta cadastrado
        const emailAlreadyRegistered = await Users.findOne({ email });

        if(emailAlreadyRegistered) {
            return res.status(409).json({
                message: "Erros de validação",
                error: {
                    field: "email",
                    message: "Este email já está cadastrado. Utilize outro email ou faça login."
                }
            });
        }

        //encriptografar senha
        const encryptedPassword = await bcrypt.hash(password, SALTS_ROUNDS);

        const newUser = await Users.create({
            name,
            email, 
            password: encryptedPassword,
            status: true
        });

        return res.status(201).json({
            message: "Usuário cadastrado com sucesso",
            user: newUser._id
        });

    } catch (error) {
        console.log(`Erro interno ao cadastrar um novo usuario: ${error.message}`);

        return res.status(500).json({ message: `Erro interno ao cadastrar um novo usuario: ${error.message}` });
    }
}

export default {
    registerUsers
}