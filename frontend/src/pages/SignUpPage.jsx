import React, {useEffect, useState} from 'react';
import { useAuthStore } from '../store/useAuthStore';
import {Eye, EyeOff, Loader2, Lock, Mail, User, FlaskRound} from 'lucide-react';
import {Link} from 'react-router-dom';
import toast from 'react-hot-toast';
import ThreeDUser from '../components/design/ThreeDUser';
import SplineViewer from '../components/design/SplineViewer.jsx';

const SignUpPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const {signup, isSignUp} = useAuthStore();

    const validateForm = () => {
        if (!formData.username.trim()) return toast.error("Full name is required");
        if (!formData.email.trim()) return toast.error("Email is required");
        if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
        if (!formData.password.trim()) return toast.error("Password is required");
        if (formData.password.length < 8) return toast.error("password must be atleast 8 characters & digits");

        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const success = validateForm();

        if (success === true) signup(formData);
    };

    const [strength, setStrength] = useState('');
    const [color, setColor] = useState('');

    useEffect(() => {
    const password = formData.password;

    if (password.length === 0) {
        setStrength('');
        setColor('');
        return;
    }

    if (password.length < 6) {
        setStrength('weak');
        setColor('#ff5925');
    } else if (password.length >= 6 && password.length < 8) {
        setStrength('medium');
        setColor('orange');
    } else {
        setStrength('strong');
        setColor('lime');
    }
    }, [formData.password]);

    return (
        <div className="min-h-screen grid lg:grid-cols-2 -mb-60">
            {/* left side */}
            <div className="flex flex-col justify-center items-center p-6 sm:p-12">
                <div className="w-full max-w-md space-y-8">
                    {/* Logo */}
                    <div className="text-center mt-4 mb-8">
                        <div className="flex flex-col items-center gap-2 group">
                            <div className="-mb-4">
                                {/* <ThreeDFlaskRound /> */}
                                <ThreeDUser />
                            </div>
                            <h1 className="text-2xl font-bold mt-2">Create Account</h1>
                            <p className="text-base-content/60">Get started with your free account</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Username</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="size-5 text-base-content/40"/>
                                </div>
                                <input 
                                    type="text"
                                    className={`input input-bordered w-full pl-10`}
                                    placeholder="John Doe"
                                    value={formData.username}
                                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Email</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="size-5 text-base-content/40"/>
                                </div>
                                <input 
                                    type="email"
                                    className={`input input-bordered w-full pl-10`}
                                    placeholder="you@example.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Password</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="size-5 text-base-content/40"/>
                                </div>
                                <input 
                                    type={showPassword ? "text" : "password"}
                                    className={`input input-bordered w-full pl-10`}
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    id='password'
                                    style={{ borderColor: color }}
                                />
                                <button 
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <EyeOff className="size-5 text-base-content/40"/>
                                    ) : (
                                        <Eye className="size-5 text-base-content/40"/>
                                    )}
                                </button>
                            </div>
                            <p id="message" className="text-1xl font-normal">
                                {formData.password.length > 0 ? (
                                    <>
                                        Password is <span id="str" style={{ color }}>{strength} </span>
                                    </>
                                ) : (
                                    ''
                                )}
                            </p>
                        </div>

                        <button type="submit" className="btn btn-primary w-full" disabled={isSignUp}>
                            {isSignUp ? (
                                <>
                                    <Loader2 className="size-5 animate-spin"/>
                                    Loading...
                                </>
                            ) : (
                                "Create Account"
                            )}
                        </button>
                    </form>

                    <div className="text-center">
                        <p className="text-base-content/60">
                            Already have an account?{" "}
                            <Link to="/login" className="link link-primary">
                                Sign in
                            </Link>
                        </p>
                    </div>

                </div>
            </div>
            {/* right side */}
                            
            <SplineViewer />
        </div>
    );
};

export default SignUpPage;