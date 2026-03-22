import { createContext, useContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    async function checkUser() {
        try {
            const response = await fetch("http://localhost:3000/api/auth/me", {
                credentials: "include"
            });
            
            if(!response.ok) {
                setUser(null);

                return;
            }
            const data = await response.json();

            setUser(data);
        } catch {
            setUser(null);
        } finally {
            setLoading(false);
        }
    }

    async function login(email, password) {
        try {
            const response = await fetch("http://localhost:3000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                throw new Error("Erro ao logar");
            }
            
            await checkUser();

        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async function logout() {
        await fetch("http://localhost:3000/api/auth/logout", {
            credentials: "include"
        });

        setUser(null);
    }

    useEffect(() => {
        checkUser();
    }, []);

    return(
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    return context;
}