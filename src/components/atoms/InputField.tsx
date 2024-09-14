import React from 'react';

interface InputFieldProps {
  type: string;
  id: string;
  value?: string;
  required?: boolean;
  checked?: boolean;
  error?: string;
  children: React.ReactNode;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

function InputField({
  type,
  id,
  value,
  required = true,
  checked,
  error,
  children,
  onChange = () => {},
}: InputFieldProps) {
  return (
    <fieldset className="fieldset">
      <label htmlFor={id} className="label">
        <span className="label-text">{children}</span>
        {type === 'checkbox' && <span className="switch" />}
      </label>

      <input
        type={type}
        id={id}
        name={id}
        value={value}
        required={required}
        checked={checked}
        aria-required={required}
        aria-invalid={!!error}
        className="input"
        onChange={onChange}
      />

      {error && <span className="error-alert">{error}</span>}
    </fieldset>
  );
}

export default InputField;
