import { useAuth } from "../../context/AuthProvider"

export default function Profile() {
    const { user, logout } = useAuth();
    
    return (
        <div className="container d-flex flex-column justify-content-center align-items-center gap-5 w-100 vh-100">
            <h1 className="text-center">Profile</h1>

            <div className="row w-100">
                <div className="col"></div>
                <div className="col">
                    <span><strong>Nome: </strong>{user.name}</span>
                    <br />
                    <span><strong>Email: </strong>{user.email}</span>

                    <hr />

                    <button 
                        type="submit" 
                        className="btn btn-primary w-100"
                        onClick={logout}
                    >
                        Logout
                    </button>
                </div>
                <div className="col"></div>
            </div>
        </div>
    )
}