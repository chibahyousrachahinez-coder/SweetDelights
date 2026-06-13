'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Heart, User, CheckCircle, XCircle } from 'lucide-react';
import { cn } from "@/lib/utils"
import { signInUser, signUpUser } from '@/app/actions/auth';
import { signIn } from 'next-auth/react';

function SignInInput({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-pink-300 selection:text-white border-pink-200 flex h-9 w-full min-w-0 rounded-xl border bg-white/80 px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-pink-400 focus-visible:ring-pink-200/50 focus-visible:ring-[3px]",
        className
      )}
      {...props}
    />
  )
}

export function SignInCard() {
  const router = useRouter();
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-300, 300], [8, -8]);
  const rotateY = useTransform(mouseX, [-300, 300], [-8, 8]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const formData = new FormData(event.currentTarget);
      
      if (mode === 'signup') {
        const result = await signUpUser(formData);
        if (result.error) {
          setError(result.error);
        } else {
          setSuccess('Account created! Redirecting...');
          setTimeout(() => router.push('/'), 1500);
        }
      } else {
        const result = await signInUser(formData);
        if (result.error) {
          setError(result.error);
        } else {
          setSuccess('Signed in! Redirecting...');
          setTimeout(() => router.push('/'), 1500);
        }
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsGoogleLoading(true);
      setError(null);
      await signIn('google', { 
        callbackUrl: '/',
        redirect: true 
      });
    } catch {
      setError('Failed to sign in with Google. Please try again.');
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-pink-50 via-rose-50 to-amber-50 relative overflow-hidden flex items-center justify-center py-12 px-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-pink-100/50 via-transparent to-rose-100/30" />
      
      {/* Floating decorative shapes */}
      <div className="absolute top-20 left-[10%] w-32 h-32 rounded-full bg-pink-200/30 blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-[10%] w-40 h-40 rounded-full bg-rose-200/30 blur-3xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-[5%] w-24 h-24 rounded-full bg-amber-200/30 blur-2xl animate-pulse delay-500" />
      
      {/* Floating emojis */}
      <motion.div 
        className="absolute top-[15%] right-[20%] text-4xl opacity-40"
        animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        🧁
      </motion.div>
      <motion.div 
        className="absolute bottom-[20%] left-[15%] text-3xl opacity-40"
        animate={{ y: [0, 15, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        🎂
      </motion.div>
      <motion.div 
        className="absolute top-[40%] right-[10%] text-2xl opacity-30"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        🍰
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md relative z-10"
        style={{ perspective: 1500 }}
      >
        <motion.div
          className="relative"
          style={{ rotateX, rotateY }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          whileHover={{ z: 10 }}
        >
          <div className="relative group">
            {/* Card glow effect */}
            <motion.div 
              className="absolute -inset-[1px] rounded-3xl opacity-0 group-hover:opacity-70 transition-opacity duration-700"
              animate={{
                boxShadow: [
                  "0 0 20px 5px rgba(244,114,182,0.1)",
                  "0 0 30px 10px rgba(244,114,182,0.15)",
                  "0 0 20px 5px rgba(244,114,182,0.1)"
                ],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Traveling light beam effect - pink theme */}
            <div className="absolute -inset-[1px] rounded-3xl overflow-hidden">
              <motion.div 
                className="absolute top-0 left-0 h-[2px] w-[40%] bg-gradient-to-r from-transparent via-pink-400 to-transparent opacity-60"
                animate={{ left: ["-40%", "100%"] }}
                transition={{ duration: 3, ease: "easeInOut", repeat: Infinity, repeatDelay: 1 }}
              />
              <motion.div 
                className="absolute top-0 right-0 h-[40%] w-[2px] bg-gradient-to-b from-transparent via-rose-400 to-transparent opacity-60"
                animate={{ top: ["-40%", "100%"] }}
                transition={{ duration: 3, ease: "easeInOut", repeat: Infinity, repeatDelay: 1, delay: 0.75 }}
              />
              <motion.div 
                className="absolute bottom-0 right-0 h-[2px] w-[40%] bg-gradient-to-r from-transparent via-pink-400 to-transparent opacity-60"
                animate={{ right: ["-40%", "100%"] }}
                transition={{ duration: 3, ease: "easeInOut", repeat: Infinity, repeatDelay: 1, delay: 1.5 }}
              />
              <motion.div 
                className="absolute bottom-0 left-0 h-[40%] w-[2px] bg-gradient-to-b from-transparent via-rose-400 to-transparent opacity-60"
                animate={{ bottom: ["-40%", "100%"] }}
                transition={{ duration: 3, ease: "easeInOut", repeat: Infinity, repeatDelay: 1, delay: 2.25 }}
              />
            </div>

            {/* Glass card background */}
            <div className="relative bg-white/70 backdrop-blur-xl rounded-3xl p-8 border border-pink-100 shadow-2xl shadow-pink-200/20 overflow-hidden">
              {/* Subtle pattern overlay */}
              <div className="absolute inset-0 opacity-[0.02]" 
                style={{
                  backgroundImage: `radial-gradient(circle, #ec4899 1px, transparent 1px)`,
                  backgroundSize: '20px 20px'
                }}
              />

              {/* Logo and header */}
              <div className="text-center space-y-2 mb-8">
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", duration: 0.8 }}
                  className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center relative overflow-hidden shadow-lg shadow-pink-300/50"
                >
                  <Heart className="w-8 h-8 text-white fill-white" />
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-2xl font-serif font-semibold text-foreground"
                >
                  {mode === 'signin' ? 'Welcome Back' : 'Create Account'}
                </motion.h1>
                
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-muted-foreground text-sm"
                >
                  {mode === 'signin' 
                    ? 'Sign in to order your sweet treats' 
                    : 'Join us for delicious desserts'}
                </motion.p>
              </div>

              {/* Login form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Error/Success Messages */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm"
                    >
                      <XCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{error}</span>
                    </motion.div>
                  )}
                  {success && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm"
                    >
                      <CheckCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{success}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.div className="space-y-4">
                  {/* Name input (only for signup) */}
                  {mode === 'signup' && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="relative"
                      whileHover={{ scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      <label className="text-sm font-medium text-foreground/80 mb-1.5 block">
                        Full Name
                      </label>
                      <div className="relative flex items-center">
                        <User className={cn(
                          "absolute left-3 w-4 h-4 transition-all duration-300",
                          focusedInput === "name" ? 'text-pink-500' : 'text-muted-foreground'
                        )} />
                        
                        <SignInInput
                          type="text"
                          name="name"
                          placeholder="Your sweet name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          onFocus={() => setFocusedInput("name")}
                          onBlur={() => setFocusedInput(null)}
                          className="pl-10 h-11"
                          required
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Email input */}
                  <motion.div 
                    className="relative"
                    whileHover={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <label className="text-sm font-medium text-foreground/80 mb-1.5 block">
                      Email
                    </label>
                    <div className="relative flex items-center">
                      <Mail className={cn(
                        "absolute left-3 w-4 h-4 transition-all duration-300",
                        focusedInput === "email" ? 'text-pink-500' : 'text-muted-foreground'
                      )} />
                      
                      <SignInInput
                        type="email"
                        name="email"
                        placeholder="hello@sweetdelights.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => setFocusedInput("email")}
                        onBlur={() => setFocusedInput(null)}
                        className="pl-10 h-11"
                        required
                      />
                    </div>
                  </motion.div>

                  {/* Password input */}
                  <motion.div 
                    className="relative"
                    whileHover={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <label className="text-sm font-medium text-foreground/80 mb-1.5 block">
                      Password
                    </label>
                    <div className="relative flex items-center">
                      <Lock className={cn(
                        "absolute left-3 w-4 h-4 transition-all duration-300",
                        focusedInput === "password" ? 'text-pink-500' : 'text-muted-foreground'
                      )} />
                      
                      <SignInInput
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => setFocusedInput("password")}
                        onBlur={() => setFocusedInput(null)}
                        className="pl-10 pr-10 h-11"
                        required
                      />
                      
                      <button 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)} 
                        className="absolute right-3 text-muted-foreground hover:text-pink-500 transition-colors"
                      >
                        {showPassword ? (
                          <Eye className="w-4 h-4" />
                        ) : (
                          <EyeOff className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Remember me & Forgot password (only for signin) */}
                {mode === 'signin' && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <input
                        id="remember-me"
                        type="checkbox"
                        checked={rememberMe}
                        onChange={() => setRememberMe(!rememberMe)}
                        className="appearance-none h-4 w-4 rounded border-2 border-pink-200 bg-white checked:bg-gradient-to-br checked:from-pink-400 checked:to-rose-500 checked:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-200 transition-all duration-200 cursor-pointer"
                      />
                      {rememberMe && (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="absolute inset-0 flex items-center justify-center text-white pointer-events-none"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </motion.div>
                      )}
                    </div>
                    <label htmlFor="remember-me" className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                      Remember me
                    </label>
                  </div>
                  
                  <Link href="/forgot-password" className="text-sm text-pink-500 hover:text-pink-600 transition-colors font-medium">
                    Forgot password?
                  </Link>
                </div>
                )}

                {/* Sign in button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading}
                  className="w-full relative group/button mt-2"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-rose-500 rounded-xl blur-lg opacity-50 group-hover/button:opacity-70 transition-opacity duration-300" />
                  
                  <div className="relative overflow-hidden bg-gradient-to-r from-pink-500 to-rose-500 text-white font-medium h-12 rounded-xl transition-all duration-300 flex items-center justify-center shadow-lg shadow-pink-300/30">
                    <AnimatePresence mode="wait">
                      {isLoading ? (
                        <motion.div
                          key="loading"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        </motion.div>
                      ) : (
                        <motion.span
                          key="button-text"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-2"
                        >
                          {mode === 'signin' ? 'Sign In' : 'Create Account'}
                          <ArrowRight className="w-4 h-4 group-hover/button:translate-x-1 transition-transform duration-300" />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.button>

                {/* Divider */}
                <div className="relative flex items-center py-2">
                  <div className="flex-grow border-t border-pink-100"></div>
                  <span className="mx-4 text-sm text-muted-foreground">or continue with</span>
                  <div className="flex-grow border-t border-pink-100"></div>
                </div>

                {/* Social Sign In */}
                <div className="grid grid-cols-2 gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={handleGoogleSignIn}
                    disabled={isGoogleLoading || isLoading}
                    className="flex items-center justify-center gap-2 h-11 rounded-xl border border-pink-100 bg-white hover:bg-pink-50 transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
                  >
                    {isGoogleLoading ? (
                      <div className="w-5 h-5 border-2 border-pink-300 border-t-pink-600 rounded-full animate-spin" />
                    ) : (
                      <>
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                        <span className="text-sm font-medium text-foreground/80">Google</span>
                      </>
                    )}
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    disabled
                    className="flex items-center justify-center gap-2 h-11 rounded-xl border border-pink-100 bg-white hover:bg-pink-50 transition-all duration-200 active:scale-95 opacity-50 cursor-not-allowed"
                    title="Coming soon"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"/>
                    </svg>
                    <span className="text-sm font-medium text-foreground/80">Apple</span>
                  </motion.button>
                </div>

                {/* Toggle Sign in/Sign up */}
                <motion.p 
                  className="text-center text-sm text-muted-foreground pt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {mode === 'signin' ? (
                    <>
                      Don&apos;t have an account?{' '}
                      <button 
                        type="button"
                        onClick={() => {
                          setMode('signup');
                          setError(null);
                          setSuccess(null);
                        }}
                        className="text-pink-500 hover:text-pink-600 font-medium transition-colors"
                      >
                        Sign up
                      </button>
                    </>
                  ) : (
                    <>
                      Already have an account?{' '}
                      <button 
                        type="button"
                        onClick={() => {
                          setMode('signin');
                          setError(null);
                          setSuccess(null);
                        }}
                        className="text-pink-500 hover:text-pink-600 font-medium transition-colors"
                      >
                        Sign in
                      </button>
                    </>
                  )}
                </motion.p>
              </form>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
