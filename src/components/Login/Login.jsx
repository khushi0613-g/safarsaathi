import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import heroImg from '../../assets/hero.jpg.png';
import { loginUser } from '../../api';
import { auth } from "../../firebase/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Please fill in all fields!');
      return;
    }

    setLoading(true);
    try {
      const data = await loginUser(email, password);


      if (data.success) {
        // Save token and user info to localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        toast.success(`Welcome back, ${data.user.name}! 🎉`);
        setTimeout(() => navigate('/'), 1500);
      } else {
        toast.error(data.message || 'Login failed');
      }
    } catch (error) {
      toast.error('Server error. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };
  const handleGoogleLogin = async () => {
  try {
    const provider = new GoogleAuthProvider();

    const result = await signInWithPopup(auth, provider);

    const user = result.user;

    localStorage.setItem(
      "user",
      JSON.stringify({
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      })
    );

    toast.success(`Welcome ${user.displayName}!`);

    navigate("/");
  } catch (error) {
    console.log(error);
    toast.error("Google Sign-In Failed");
  }
};


  return (
    <div className="flex h-screen w-full">

      <div
        className="w-[45%] bg-cover bg-center relative hidden md:block"
        style={{ backgroundImage: `url(${heroImg})` }}
      >
        <div className="absolute bottom-10 left-8 right-8 text-white">
          <h2 className="text-3xl font-extrabold mb-3">The Mewar Journey</h2>
          <p className="text-sm text-gray-300 leading-relaxed">
            Experience seamless transit across the City of Lakes with Udaipur's most trusted tracking system.
          </p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center bg-white px-10">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-extrabold text-[#1a1a2e] mb-2">Welcome Back</h2>
          <p className="text-sm text-gray-400 mb-8">Sign in to your account to track your ride.</p>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
            <input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#1a1a2e] transition-colors"
            />
          </div>

          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-semibold text-gray-700">Password</label>
              <span className="text-xs text-gray-400 cursor-pointer hover:text-[#f5a623]">Forgot Password?</span>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#1a1a2e] transition-colors pr-10"
              />
              <span
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-base"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '🙈' : '👁'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-6 text-sm text-gray-500">
            <input type="checkbox" id="remember" className="cursor-pointer" />
            <label htmlFor="remember" className="cursor-pointer">Remember Me</label>
          </div>

          <button
  onClick={handleLogin}
>
  Sign In
</button>

<button
  onClick={handleGoogleLogin}
  className="w-full py-3 mt-4 border border-gray-300 rounded-lg flex items-center justify-center gap-3"
>
  <img
    src="https://www.svgrepo.com/show/475656/google-color.svg"
    alt="Google"
    className="w-5 h-5"
  />
  Continue with Google
</button>

          <p className="text-center text-sm text-gray-400 mt-5">
            Don't have an account?{' '}
            <span
              onClick={() => navigate('/signup')}
              className="text-[#1a1a2e] font-bold cursor-pointer hover:text-[#f5a623]"
            >
              Sign Up
            </span>
            <button
  onClick={handleLogin}
>
</button>




          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;