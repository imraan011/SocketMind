import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AuthLayout from './AuthLayout';
import FormField from './FormField';
import PasswordField from './PasswordField';
import { loginUserApi, setStoredUser } from '../services/auth.service';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Field change par error clear karna
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
    if (apiError) setApiError('');
  };

  // Form input validation check kar rahe hain
  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm() || isLoading) return;

    setIsLoading(true);
    setApiError('');

    try {
      const data = await loginUserApi(formData.email.trim(), formData.password);
      if (data.user) setStoredUser(data.user);
      const redirectTo = location.state?.from?.pathname || '/chat';
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setApiError(err.message || 'Unable to sign in. Please verify your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="auth-header">
        <h1 className="auth-title">Welcome back</h1>
        <p className="auth-subtitle">Sign in to your account to continue chatting</p>
      </div>

      {apiError && (
        <div role="alert" className="auth-error-banner">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span>{apiError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="auth-form">
        <FormField
          id="email"
          label="Email address"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="name@example.com"
          error={errors.email}
          autoFocus
          required
          autoComplete="email"
          disabled={isLoading}
        />

        <PasswordField
          id="password"
          label="Password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          autoComplete="current-password"
          disabled={isLoading}
        />

        <button
          type="submit"
          disabled={isLoading}
          aria-busy={isLoading}
          className="auth-submit-btn"
        >
          {isLoading ? (
            <>
              <span className="btn-spinner" aria-hidden="true" />
              <span>Signing in...</span>
            </>
          ) : (
            'Sign in'
          )}
        </button>
      </form>

      <footer className="auth-footer">
        Don&apos;t have an account?{' '}
        <Link to="/register" className="auth-link">
          Create account
        </Link>
      </footer>
    </AuthLayout>
  );
}
