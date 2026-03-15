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

export default { validateUserData }