import React, { useState } from 'react';
import axios from '../api/axios';
import { useNavigate, Link } from 'react-router-dom';

const SignUp = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({}); // { username, email, password, non_field }
  const [toast, setToast] = useState({ message: '', type: '' });
  const navigate = useNavigate();

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: '', type: '' }), 3000);
  };

  const validateClientSide = () => {
    const e = {};
    // Password: minimum length 6
    if (!form.password || form.password.length < 6) {
      e.password = 'Password must be at least 6 characters.';
    }
    // Optional: simple email format check
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = 'Please enter a valid email address.';
    }
    // Optional: username length
    if (!form.username || form.username.length < 3) {
      e.username = 'Username must be at least 3 characters.';
    }
    return e;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const normalizeErrorPayload = (data) => {
    const out = {};
    if (!data) return out;
    if (data.detail) {
      out.non_field = String(data.detail);
      return out;
    }
    Object.keys(data).forEach((k) => {
      const value = data[k];
      out[k === 'non_field_errors' ? 'non_field' : k] = Array.isArray(value) ? value.join(' ') : String(value);
    });
    return out;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    // Client-side validation
    const clientErrors = validateClientSide();
    if (Object.keys(clientErrors).length) {
      setErrors(clientErrors);
      // show the first client-side message as toast
      showToast(Object.values(clientErrors)[0], 'error');
      return;
    }

    setLoading(true);
    try {
      await axios.post('/auth/register/', form);
      showToast('Registration successful! Please log in.', 'success');
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      if (!err.response) {
        setErrors({ non_field: 'Network error. Please try again.' });
        showToast('Network error. Please try again.', 'error');
      } else {
        const normalized = normalizeErrorPayload(err.response.data);
        setErrors(normalized);

        if (normalized.email?.toLowerCase().includes('exist') || normalized.username?.toLowerCase().includes('exist')) {
          showToast('User with this email/username already exists.', 'error');
        } else if (normalized.non_field) {
          showToast(normalized.non_field, 'error');
        } else {
          const first = Object.values(normalized)[0];
          if (first) showToast(first, 'error');
          else showToast('Registration failed.', 'error');
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 flex items-center justify-center bg-gray-100 relative">
      {toast.message && (
        <div
          className={`fixed top-10 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-md text-white z-50 ${
            toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'
          }`}
        >
          {toast.message}
        </div>
      )}

      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-2">Create Your Account</h1>
        <p className="text-xs text-center text-gray-600 mb-6">Sign up to start using the DocAI.</p>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Sign Up</h2>

          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Username"
            required
            disabled={loading}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.username ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-500'
            }`}
          />
          {errors.username && <div className="text-sm text-red-600 mt-1">{errors.username}</div>}

          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            required
            disabled={loading}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.email ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-500'
            }`}
          />
          {errors.email && <div className="text-sm text-red-600 mt-1">{errors.email}</div>}

          <input
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            type="password"
            required
            disabled={loading}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.password ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-500'
            }`}
          />
          {errors.password && <div className="text-sm text-red-600 mt-1">{errors.password}</div>}

          {errors.non_field && <div className="text-sm text-red-600 mt-1">{errors.non_field}</div>}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 rounded-md transition duration-300 ${
              loading ? 'bg-blue-400 cursor-not-allowed text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Already have an account? <Link to="/" className="text-blue-600 hover:underline">Log In</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;