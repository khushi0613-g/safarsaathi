import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import heroImg from '../../assets/hero.jpg.png';
import { registerUser } from '../../api';
import { auth } from "../../firebase/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast.error('Please fill in all fields!');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters!');
      return;
    }

    setLoading(true);
    try {
      const data = await registerUser(name, email, password);

      if (data.success) {
        // Save token and user to localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        toast.success('Account created successfully! 🎉');
        setTimeout(() => navigate('/'), 1500);
      } else {
        toast.error(data.message || 'Registration failed');
      }
    } catch (error) {
      toast.error('Server error. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };
  const handleGoogleSignup = async () => {
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

    toast.success("Google Sign Up Successful 🎉");

    navigate("/");
  } catch (error) {
    console.log(error);
    toast.error("Google Sign Up Failed");
  }
};

  return (
    
    <div className="flex h-screen w-full">

      <div
        className="w-[45%] bg-cover bg-center relative hidden md:block"
        style={{ backgroundImage: `url(${heroImg})` }}
      >
        <div className="absolute bottom-10 left-8 right-8 text-white">
          <h2 className="text-3xl font-extrabold mb-3">Join Safar Saathi</h2>
          <p className="text-sm text-gray-300 leading-relaxed">
            Create your account and start tracking buses across the City of Lakes in real-time.
          </p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center bg-white px-10">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-extrabold text-[#1a1a2e] mb-2">Create Account</h2>
          <p className="text-sm text-gray-400 mb-8">Sign up to start your journey with us.</p>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#1a1a2e] transition-colors"
            />
          </div>

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
            <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
            <input
              type="tel"
              placeholder="+91 00000 00000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#1a1a2e] transition-colors"
            />
          </div>
         

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
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
           <button
  onClick={handleGoogleSignup}
  type="button"
  className="w-full py-3 mt-4 border border-gray-300 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-50 transition"
>
  <img
    src="https://www.svgrepo.com/show/475656/google-color.svg"
    alt="Google"
    className="w-5 h-5"
  />
  Continue with Google
</button>
        <p className="text-center text-sm text-gray-400 mt-5">
            Already have an account?{' '}
            <span
              onClick={() => navigate('/login')}
              className="text-[#1a1a2e] font-bold cursor-pointer hover:text-[#f5a623]"
            >
              Sign In
            </span>
          </p>
        </div>
      </div>
    </div>
    
  );
};

export default SignUp;