import { useState } from "react";
import type { FormEvent } from "react";
import { userList } from "../../types/user.type";
import { useUser } from "../../hooks/useUser";
import { useNavigate } from "react-router-dom";
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState({ email: "", password: "", form: "" });
    const { updateUser } = useUser();
    const navigate = useNavigate();

    const validate = () => {
        const nextError = {
            email: "",
            password: "",
            form: "",
        };

        if (!email.includes("@") || !email.includes(".") || email.length < 5) {
            nextError.email = "Invalid email format";
        }

        if (!password || password.length < 6) {
            nextError.password = "Password must be at least 6 characters long";
        }

        setError(nextError);

        return !nextError.email && !nextError.password;
    };

    const handleLogin = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!validate()) return;
        const user = userList.find((u) => u.email === email && u.password === password);
        if (user) {
            updateUser(user);
            navigate("/");
        } else {
            setError((prev) => ({
                ...prev,
                form: "Invalid email or password",
            }));
        }
    };

    return (
        <form onSubmit={handleLogin} className="w-full max-w-xl p-6 rounded-3xl border border-[var(--border)] shadow-lg mx-auto mt-20 pb-10 px-8 sm:px-15 bg-[var(--surface)]">
            <h1 className="text-2xl font-bold text-center mt-5">Login Page</h1>
            <p className="text-center text-[var(--text)]">Sign in to manage your cart.</p>
            <label className="flex justify-start" htmlFor="email">Email</label>
            <input
                id="email"
                type="text"
                className="border border-[var(--border)] bg-[var(--surface)] text-[var(--text-h)] p-2 w-full rounded-md mt-1 mb-4 outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-bg)]"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            {error.email && <p className="text-[var(--danger)] text-sm mb-4">{error.email}</p>}
            <label className="flex justify-start" htmlFor="password">Password</label>
            <input
                id="password"
                type="password"
                className="border border-[var(--border)] bg-[var(--surface)] text-[var(--text-h)] p-2 w-full rounded-md mt-1 mb-4 outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-bg)]"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            {error.password && <p className="text-[var(--danger)] text-sm mb-4">{error.password}</p>}
            {error.form && <p className="text-[var(--danger)] text-sm mb-4">{error.form}</p>}
            <button
                type="submit"
                className="bg-[var(--accent)] text-[var(--button-text)] transition hover:opacity-90 px-4 py-2 rounded-md w-full border border-[var(--accent)] cursor-pointer"
            >
                Login
            </button>
        </form>
    )
}

export default Login;
