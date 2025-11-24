import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, type ChangeEvent } from 'react';
import { cn } from '../../utils/cn';

interface PasswordInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  inputId?: string;
  name?: string;
  placeholder? : string;
  errorCondition?: boolean;
}

export const PasswordInput = ({ value, onChange, inputId, name, placeholder, errorCondition }: PasswordInputProps) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <div className="w-full relative">
      <input
        type={passwordVisible ? 'text' : 'password'}
        id={inputId}
        name={name || 'password'}
        placeholder={placeholder || 'Password'}
        value={value}
        onChange={(e) => onChange(e)}
        required
        className={cn('w-full', errorCondition && 'border-[red]!')}
      />
      <button
        type="button"
        tabIndex={-1}
        onClick={() => setPasswordVisible(!passwordVisible)}
        aria-label={passwordVisible ? 'Hide password' : 'Show password'}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-grey"
      >
        {passwordVisible ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
      </button>
    </div>
  );
};
