'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaEnvelope, FaLock } from 'react-icons/fa';

interface FormErrors {
    email?: string;
    password?: string;
}

export default function LoginPage() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errors, setErrors] = useState<FormErrors>({});
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();

    const validate = (): boolean => {
        const newErrors: FormErrors = {};

        if (!email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^\S+@\S+\.\S+$/.test(email)) {
            newErrors.email = 'Email is invalid';
        }

        // if (!password) {
        //     newErrors.password = 'Password is required';
        // } else if (password.length < 6) {
        //     newErrors.password = 'Password must be at least 6 characters';
        // }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setIsLoading(true);
        try {
            const result = await fetch("http://localhost:4000/users/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            })
            const resultJson = await result.json()
            if (resultJson.success){
                localStorage.setItem(
                    "accessToken",resultJson.access_token
                )
                router.push("/Dashboard")
            }
            else{
                setErrors({ ...errors, email: 'Invalid credentials' });
            }
        } catch (error) {
            console.error('Login error:', error);
            setErrors({ ...errors, email: 'Invalid credentials' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-amber-50 p-4">
            <div className="w-full max-w-md">
                {/* Circular Logo Placeholder */}
                <div className="flex justify-center mb-8">
                    <div className="bg-amber-200 border-2 border-amber-300 rounded-full w-24 h-24 flex items-center justify-center">
                        <span className="text-amber-800 font-bold text-xl">LOGO</span>
                    </div>
                </div>

                {/* Login Card */}
                <div className="bg-amber-100 rounded-2xl shadow-xl overflow-hidden border border-amber-200">
                    <div className="p-8">
                        <h1 className="text-3xl font-bold text-center text-amber-900 mb-2">Welcome Back</h1>
                        <p className="text-amber-700 text-center mb-8">Sign in to your account</p>

                        <form onSubmit={handleSubmit}>
                            {/* Email Field */}
                            <div className="mb-6">
                                <label htmlFor="email" className="block text-amber-800 font-medium mb-2">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaEnvelope className="text-amber-600" />
                                    </div>
                                    <input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className={`w-full pl-10 pr-4 py-3 rounded-lg border ${errors.email ? 'border-red-500' : 'border-amber-300'
                                            } bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent`}
                                        placeholder="you@example.com"
                                        aria-invalid={!!errors.email}
                                        aria-describedby={errors.email ? "email-error" : undefined}
                                    />
                                </div>
                                {errors.email && (
                                    <p id="email-error" className="mt-1 text-red-500 text-sm">{errors.email}</p>
                                )}
                            </div>

                            {/* Password Field */}
                            <div className="mb-6">
                                <label htmlFor="password" className="block text-amber-800 font-medium mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaLock className="text-amber-600" />
                                    </div>
                                    <input
                                        id="password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className={`w-full pl-10 pr-4 py-3 rounded-lg border ${errors.password ? 'border-red-500' : 'border-amber-300'
                                            } bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent`}
                                        placeholder="••••••••"
                                        aria-invalid={!!errors.password}
                                        aria-describedby={errors.password ? "password-error" : undefined}
                                    />
                                </div>
                                {errors.password && (
                                    <p id="password-error" className="mt-1 text-red-500 text-sm">{errors.password}</p>
                                )}
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full py-3 px-4 rounded-lg bg-amber-700 hover:bg-amber-800 text-white font-medium transition duration-300 flex justify-center items-center ${isLoading ? 'opacity-75 cursor-not-allowed' : ''
                                    }`}
                                aria-busy={isLoading}
                            >
                                {isLoading ? (
                                    <svg
                                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        />
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        />
                                    </svg>
                                ) : null}
                                {isLoading ? 'Signing in...' : 'Sign In'}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-8 text-center text-amber-700 text-sm">
                    <p>© {new Date().getFullYear()} Your Company. All rights reserved.</p>
                </div>
            </div>
        </div>
    );
}