import React from 'react';
import classNames from '../../utils/classNames';

interface ButtonProps {
  type?: 'button' | 'submit';
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

function Button({
  type = 'button',
  disabled = false,
  className = '',
  children,
  onClick,
}: ButtonProps) {
  return (
    <button
      type={type === 'button' ? 'button' : 'submit'}
      onClick={onClick}
      disabled={disabled}
      className={classNames('btn', className)}
    >
      {children}
    </button>
  );
}

export default Button;
