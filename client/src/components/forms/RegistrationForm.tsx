import { useId, type Dispatch, type FormEvent, type SetStateAction } from 'react';
import type { RegistrationFormValues } from './types';
import { Loading } from '../ui/Loading';
import { cn } from '../../utils/cn';

interface RegistrationFormProps {
  form: RegistrationFormValues;
  setForm: Dispatch<SetStateAction<RegistrationFormValues>>;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  loading: boolean;
}

export const RegistrationForm = ({ form, setForm, handleSubmit, loading }: RegistrationFormProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const usernameId = useId();
  const passwordId = useId();
  const confirmPasswordId = useId();

  const labelClasses = 'text-lg font-bold mb-1';

  return (
    <form className="flex flex-col space-y-4 w-80" onSubmit={handleSubmit}>

      {/* Username */}
      <label htmlFor={usernameId} className={labelClasses}>Username</label>
      <input
        id={usernameId}
        type="email"
        name="username"
        placeholder="Username"
        value={form.username}
        onChange={(e) => handleChange(e)}
        required
      />

      {/* Password */}
      <label htmlFor={passwordId} className={labelClasses}>Password</label>
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => handleChange(e)}
        required
      />

      {/* Confirm Password */}
      <label htmlFor={confirmPasswordId} className={labelClasses}>Confirm Password</label>
      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        value={form.confirmPassword}
        onChange={(e) => handleChange(e)}
        required
      />
      {loading ? (
        <Loading />
      ) : (
        <button
          type="submit"
          className={cn(
            'p-2 bg-brand-orange hover:bg-brand-blue transition',
            'text-light font-bold rounded-lg active:scale-95 cursor-pointer',
            'mt-24'
          )}
        >
          Register
        </button>
      )}
    </form>
  );
};
