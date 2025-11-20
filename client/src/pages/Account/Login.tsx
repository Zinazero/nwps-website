import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import { LoginForm } from '../../components/forms/LoginForm';
import type { LoginFormValues } from '../../components/forms/types';
import { Image } from '../../components/ui/Image';
import { useAuth } from '../../contexts/AuthContext';

export const Login = () => {
  const [form, setForm] = useState<LoginFormValues>({
    username: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await api.post('/auth/login', form);
      console.log('Login successful', res.data.username);

      login(res.data.username, res.data.roleLevel);
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <meta name="robots" content="noindex, nofollow" />
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-24">
          <Image src="/logos/nwps-vertical-logo.svg" alt="NWPS Logo" className="h-42" />
          <LoginForm form={form} setForm={setForm} handleSubmit={handleSubmit} loading={loading} />

          {/* Error Message */}
          {error && <span className="text-[red]">{error}</span>}
        </div>
      </div>
    </>
  );
};
