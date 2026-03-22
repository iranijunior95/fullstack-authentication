import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Users } from "../models/Users.js";
import { JWT_SECRET } from "../config/environmentVariables.js";

async function login(req, res) {
    const { email, password } = req.body;

    try {
        const locatedUser = await Users.findOne({ email, status: true });

        if(!locatedUser) {
            return res.status(401).json({
                message: "Email ou senha incorretos"
            });
        }

        const passwordValidated = await bcrypt.compare(password, locatedUser.password);

        if(!passwordValidated) {
            return res.status(401).json({
                message: "Email ou senha incorretos"
            });
        }

        const payload = {
            id: locatedUser._id,
            name: locatedUser.name,
            email: locatedUser.email
        };

        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "5m" });

        res.cookie("token", token, {
            httpOnly: true,
            secure: false, // 👈 MUITO IMPORTANTE no dev
            sameSite: "lax", // 👈 funciona entre portas diferentes
            maxAge: 60 * 60 * 1000
        });

        return res.status(200).json({
            message: "Login realizado com sucesso"
        });

    } catch (error) {
        console.log(`Erro interno ao realizar login: ${error.message}`);

        return res.status(500).json({
            message: `Erro interno ao realzar login: ${error.message}`
        });
    }
}

function logout(req, res) {
    res.clearCookie("token", {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    });

    return res.status(200).json({
        message: "Logout realizado com sucesso"
    });
}

export default {
    login,
    logout
}