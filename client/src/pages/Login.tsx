import React, { useState } from "react";
import loginHeroBgImage from "../assets/login_hero_bg.png";
import { Link } from "react-router-dom";
import { BikeIcon, Loader2Icon, LockIcon, MailIcon, UserIcon } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const Login = () => {
    const [isLoginState, setIsLoginState] = useState(true);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const { login, register } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (isLoginState) {
                await login(email, password);
            } else {
                await register(name, email, password);
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || error?.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Side */}
            <div className="hidden lg:flex lg:w-1/2 bg-app-green relative flex-col items-center justify-between p-12 overflow-hidden">
                <img src={loginHeroBgImage} alt="Premium groceries background" className="absolute inset-0 object-cover w-full h-full" />
                {/* Subtle gradient overlay to enhance text legibility while keeping the vibrant image crisp */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-app-green/95" />
                
                {/* Top elegant badge */}
                <div className="w-full relative text-center z-10 pt-2">
                    <span className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-md text-white text-xs font-semibold tracking-widest uppercase rounded-full border border-white/30 shadow-sm">
                        100% Fresh & Organic
                    </span>
                </div>

                {/* Bottom welcome message overlaying the deep gradient */}
                <div className="relative text-center max-w-md z-10 mt-auto pt-8">
                    <h2 className="text-4xl lg:text-5xl font-serif text-white mb-4 tracking-wide drop-shadow-md">Welcome back to Instacart</h2>
                    <p className="text-white/95 text-lg font-light leading-relaxed drop-shadow">Fresh groceries and organic produce, delivered straight to your doorstep.</p>
                </div>
            </div>

            {/* Right Side */}
            <div className="flex-1 flex-center px-4 py-12 bg-app-cream">
                <div className="w-full max-w-md">
                    {/* form header message */}
                    <div className="text-center mb-8">
                        <Link to="/" className="inline-flex items-center gap-2 mb-6">
                            <BikeIcon className="size-8 text-app-green" />
                            <span className="text-2xl font-semibold text-app-green">Instacart</span>
                        </Link>
                        <h1 className="text-2xl font-semibold text-app-green mb-2">{isLoginState ? "Sign in to your account" : "Sign up for an account"}</h1>

                        <p className="text-sm text-app-text-light">
                            {isLoginState ? "Don't have an account?" : "Already have an account?"}
                            <button onClick={() => setIsLoginState(!isLoginState)} className="text-orange-500 ml-1 font-semibold hover:text-orange-600 transition-colors">
                                {isLoginState ? "Create one" : "Sign in"}
                            </button>
                        </p>
                    </div>

                    {/* Login / Register Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {!isLoginState && (
                            <label className="text-sm flex flex-col gap-1">
                                Name
                                <div className="relative">
                                    <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-app-text-light" />
                                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Your name" className="w-full pl-11 pr-4 py-3 text-sm bg-white rounded-xl border not-focus:border-app-border transition-all" />
                                </div>
                            </label>
                        )}
                        <label className="text-sm flex flex-col gap-1">
                            Email Address
                            <div className="relative">
                                <MailIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-app-text-light" />
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@example.com" className="w-full pl-11 pr-4 py-3 text-sm bg-white rounded-xl border not-focus:border-app-border transition-all" />
                            </div>
                        </label>
                        <label className="text-sm flex flex-col gap-1">
                            Password
                            <div className="relative">
                                <LockIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-app-text-light" />
                                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="••••••••" className="w-full pl-11 pr-4 py-3 text-sm bg-white rounded-xl border not-focus:border-app-border transition-all" />
                            </div>
                        </label>
                        <button type="submit" disabled={loading} className="flex-center w-full py-3 bg-green-950 text-white font-semibold rounded-xl hover:bg-green-900 transition-colors disabled:opacity-50">
                            {loading ? <Loader2Icon className="animate-spin" /> : isLoginState ? "Sign In" : "Sign Up"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
