    import axios from "axios";
    import  { useContext, useState } from "react";
    import { toast } from "react-toastify";
    import { Context } from "../main";
    import { Link, useNavigate, Navigate } from "react-router-dom";
    import "../Register.css"; // Import the CSS file

    const Login = () => {
    const { isAuthenticated, setIsAuthenticated } = useContext(Context);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigateTo = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
        await axios
            .post(
            "http://localhost:3000/api/v1/user/login",
            { email, password, confirmPassword, role: "Patient" },
            {
                withCredentials: true,
                headers: { "Content-Type": "application/json" },
            }
            )
            .then((res) => {
            toast.success(res.data.message);
            setIsAuthenticated(true);
            navigateTo("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            });
        } catch (error) {
        toast.error(error.response.data.message);
        }
    };

    if (isAuthenticated) {
        return <Navigate to={"/"} />;
    }

    return (
        <section className="login-page">
        <section className="container login-form">
            <h2>Sign In</h2>
            <p className="form-title">Please Login To Continue</p>
            <form onSubmit={handleLogin}>
            <div className="form-group">
                <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
                <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
                <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </div>
            <div className="login-links">
                <Link to="/register">Register Now</Link>
                <Link to='http://localhost:5173/'>Admin Login</Link>
            </div>
            <div className="form-group">
                <button type="submit">Login</button>
            </div>
            </form>
        </section>
        </section>
    );
    };

    export default Login;
