import { cn } from '../../utils/cn';
import { Loading } from '../ui/Loading';
import type { LoginFormValues } from './types';
import { PasswordInput } from '../ui/PasswordInput';

interface LoginFormProps {
  form: LoginFormValues;
  setForm: React.Dispatch<React.SetStateAction<LoginFormValues>>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  loading: boolean;
}

export const LoginForm: React.FC<LoginFormProps> = ({ form, setForm, handleSubmit, loading }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <form className="flex flex-col space-y-4 w-80" onSubmit={handleSubmit}>
      <input
        type="email"
        name="username"
        placeholder="Username"
        value={form.username}
        onChange={(e) => handleChange(e)}
        required
      />
      <PasswordInput value={form.password} onChange={handleChange} />
      {loading ? (
        <Loading />
      ) : (
        <button
          type="submit"
          className={cn(
            'p-2 bg-brand-orange hover:bg-brand-blue transition',
            'text-light font-bold rounded-lg active:scale-95 cursor-pointer',
          )}
        >
          Submit
        </button>
      )}
    </form>
  );
};
