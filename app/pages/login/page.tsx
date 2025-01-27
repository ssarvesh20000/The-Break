'use client'
import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import '@styles/login.css'; 

const Login: React.FC = () => {
    const router = useRouter();    
    const [password, setPassword] = useState("");   

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch("/api/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({password})
            });
            if (res.status === 200){
                router.push("/pages/admin"); 
            } else {
                alert("Password Incorrect. Try Again.");
            }
        } catch (error) {
            console.error("Error logging in: ", error);
        }
    }

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    return (
        <div className="login-container">
            <h3>Attempting to Access Restricted Content. Enter Admin Password.</h3>
            <form className="login-form" action="submit" onSubmit={handleLogin}>
                <label className="label" htmlFor="password">Password:</label>
                <input 
                    className="input-field"
                    type="password" 
                    id="password" 
                    value={password} 
                    onChange={handlePasswordChange} 
                    placeholder="Enter your password" 
                    required
                />
                <button className="login-button" type="submit">Enter</button>
            </form>    
        </div>
    );
    
};

export default Login;
