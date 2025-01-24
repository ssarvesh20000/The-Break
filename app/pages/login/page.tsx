'use client'
import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import '@styles/login.css'; 

const Login: React.FC = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");    
    const [password, setPassword] = useState("");   

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();
        const res = await fetch("/api/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        });
        if (res.status === 200){
            router.push("/pages/dashboard"); 
        } else{
            alert("Login was unsuccessful");
        }
    }

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    return (
        <div className="login-container">
            {/*<h1>Login</h1>*/}
            <form className="login-form" action="submit" onSubmit={handleLogin}>
                <label className="label" htmlFor="email">Email:</label>
                <input 
                    className="input-field"
                    type="email" 
                    id="email" 
                    value={email} 
                    onChange={handleEmailChange} 
                    placeholder="Enter your email" 
                    required
                />
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
                <button className="login-button" type="submit">Login</button>
            </form>    
        </div>
    );
    
};

export default Login;
