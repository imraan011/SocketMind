import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from './AuthLayout';
import FormField from './FormField';
import PasswordField from './PasswordField';
import { registerUserApi, setStoredUser } from '../services/auth.service';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Field change par error reset
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
    if (apiError) setApiError('');
  };

  // Validation rules for registration form
  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Registration form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm() || isLoading) return;

    setIsLoading(true);
    setApiError('');

    try {
      const payloadFullname = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
      };
      const data = await registerUserApi(payloadFullname, formData.email.trim(), formData.password);
      if (data.user) setStoredUser(data.user);
      navigate('/chat', { replace: true });
    } catch (err) {
      setApiError(err.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="auth-header">
        <h1 className="auth-title">Create an account</h1>
        <p className="auth-subtitle">Experience instant intelligence with SocketMind</p>
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
        <div className="auth-row-2col">
          <FormField
            id="firstName"
            label="First name"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="John"
            error={errors.firstName}
            autoFocus
            required
            autoComplete="given-name"
            disabled={isLoading}
          />
          <FormField
            id="lastName"
            label="Last name"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Doe"
            optional
            autoComplete="family-name"
            disabled={isLoading}
          />
        </div>

        <FormField
          id="email"
          label="Email address"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="name@example.com"
          error={errors.email}
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
          autoComplete="new-password"
          showStrength
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
              <span>Creating account...</span>
            </>
          ) : (
            'Create account'
          )}
        </button>
      </form>

      <footer className="auth-footer">
        Already have an account?{' '}
        <Link to="/login" className="auth-link">
          Sign in
        </Link>
      </footer>
    </AuthLayout>
  );
}
