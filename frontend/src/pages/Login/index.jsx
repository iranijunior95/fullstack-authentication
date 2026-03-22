import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ alertError, setAlertError ] = useState(false);
    const [ alertMessage, setAlertMessage ] = useState("");

    async function captureSubmit(event) {
        event.preventDefault();

        if(email === "" || password === "") {
            setAlertError(true);
            setAlertMessage("Erro ao realizar login: Preencha todos os campos!");
            return;
        }

        try {
            await login(email, password);

            setAlertError(false);
            setAlertMessage("");
            navigate("/profile");
            
        } catch (error) {
            setAlertError(true);
            setAlertMessage("Erro ao realizar login: Usuario ou Senha invalidos!");
        }
    }

    return (
        <div className="container d-flex flex-column justify-content-center align-items-center gap-5 w-100 vh-100">
            <div className={alertError ? "alert alert-danger" : "alert alert-danger d-none"} role="alert">
                {alertMessage}
            </div>
            
            <h1 className="text-center">Login</h1>

            <div className="row w-100">
                <div className="col"></div>

                <div className="col">
                    <form onSubmit={captureSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email:</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="form-control"
                                onChange={(event) => setEmail(event.target.value)}
                                value={email}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password:</label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                className="form-control"
                                onChange={(event) => setPassword(event.target.value)}
                                value={password}
                            />
                        </div>

                        <button type="submit" className="btn btn-primary w-100">Login</button>
                        <Link to="/register">Register</Link>
                    </form>
                </div>

                <div className="col"></div>
            </div>
        </div>
    )
}