import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();

    async function captureSubmit(event) {
        event.preventDefault();

        if(name === "" || email === "" || password === "" || confirmPassword === "") {
            alert("Todos os campos são obrigatorios");

            return;
        }

        if(password !== confirmPassword) {
            alert("Validação de password: Senhas não são iguais");

            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/api/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            });

            const dados = await response.json();

            if(!response.ok) {
                alert(`Erro ao registrar usuario: ${dados.error.message}`);

                return;
            }

            navigate("/login");

        } catch (error) {
            console.log(`Erro ao registrar usuario: ${error.messsage}`);

            alert("Erro ao registrar usuario");

            return;
        }
    }

    return (
        <div className="container d-flex flex-column justify-content-center align-items-center gap-5 w-100 vh-100">
            <h1 className="text-center">Register</h1>

            <div className="row w-100">
                <div className="col"></div>

                <div className="col">
                    <form onSubmit={captureSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name:</label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                className="form-control"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email:</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="form-control"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password:</label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                className="form-control"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="confirmPassword" className="form-label">Confirm Password:</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                id="confirmPassword"
                                className="form-control"
                                value={confirmPassword}
                                onChange={(event) => setConfirmPassword(event.target.value)}
                            />
                        </div>

                        <button type="submit" className="btn btn-primary w-100">Register</button>
                        <Link to="/login">Login</Link>
                    </form>
                </div>

                <div className="col"></div>
            </div>
        </div>
    )
}