import validator from "validator";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
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

async function retrieveUserDataByID(req, res) {
    const { id } = req.userData;

    try {
        const returnedUserData = await Users.findById(id).select("-password");

        if(!returnedUserData) {
            res.status(400).json({
                message: "Dados do usuario não localizado",
                user: null
            });
        }

        return res.status(200).json({
            message: "Dados do usuario localizado com sucesso",
            user: returnedUserData
        });

    } catch (error) {
        console.log(`Erro interno ao buscar dados do usuario: ${error.message}`);

        return res.status(500).json({
            message: `Erro interno ao buscar dados do usuario: ${error.message}`
        });
    }
}

export default {
    registerUsers,
    retrieveUserDataByID
}