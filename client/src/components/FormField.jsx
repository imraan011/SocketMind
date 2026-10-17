// Reusable accessible text form field
export default function FormField({
  id,
  label,
  type = 'text',
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  required = false,
  autoFocus = false,
  disabled = false,
  autoComplete,
  optional = false,
  children,
}) {
  const errorId = `${id}-error`;

  return (
    <div className="form-field-group">
      <div className="form-label-row">
        <label htmlFor={id}>
          {label}
        </label>
        {optional && <span className="form-optional-tag font-mono">(optional)</span>}
      </div>

      <div className="form-input-wrapper">
        {children || (
          <input
            id={id}
            name={id}
            type={type}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            required={required}
            autoFocus={autoFocus}
            disabled={disabled}
            autoComplete={autoComplete}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? errorId : undefined}
            className={`form-input ${error ? 'form-input--error' : ''}`}
          />
        )}
      </div>

      {error && (
        <p id={errorId} role="alert" aria-live="polite" className="form-field-error">
          <svg viewBox="0 0 16 16" fill="currentColor" width="12" height="12" aria-hidden="true">
            <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm0 3.5a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 8 4.5zm0 7a.875.875 0 1 1 0-1.75.875.875 0 0 1 0 1.75z" />
          </svg>
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}
