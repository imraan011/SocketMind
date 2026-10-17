import { useState } from 'react';
import FormField from './FormField';

// Password strength calculate karne ka helper function
function getPasswordStrength(password) {
  if (!password) return { score: 0, label: '' };
  let score = 0;
  if (password.length >= 6) score += 1;
  if (password.length >= 8 && /[0-9]/.test(password)) score += 1;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  const labels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
  const variants = ['', 'weak', 'fair', 'good', 'strong'];
  return { score, label: labels[score], variant: variants[score] };
}

export default function PasswordField({
  id = 'password',
  label = 'Password',
  value,
  onChange,
  onBlur,
  placeholder = '••••••••',
  error,
  disabled = false,
  autoComplete = 'current-password',
  showStrength = false,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const strength = showStrength ? getPasswordStrength(value) : null;
  const errorId = `${id}-error`;

  return (
    <div className="form-field-group">
      <FormField
        id={id}
        label={label}
        error={error}
      >
        <input
          id={id}
          name={id}
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete={autoComplete}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={`form-input ${error ? 'form-input--error' : ''}`}
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
          className="password-toggle-btn"
          tabIndex={0}
        >
          {showPassword ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
              <line x1="1" y1="1" x2="23" y2="23" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          )}
        </button>
      </FormField>

      {/* Password strength visual indicator */}
      {showStrength && value && (
        <div className="password-strength-box">
          <div className="strength-bars">
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className={`strength-segment ${
                  step <= strength.score ? `strength-segment--${strength.variant}` : ''
                }`}
              />
            ))}
          </div>
          <div className="strength-label-text">
            <span>Security hint:</span>
            <span className="strength-status">{strength.label}</span>
          </div>
        </div>
      )}
    </div>
  );
}
