import { useEffect, useState, type FormEvent } from 'react';
import { Loading } from '../../components/ui/Loading';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import type { RegistrationFormValues } from '../../components/forms/types';
import { RegistrationForm } from '../../components/forms/RegistrationForm';
import { cn } from '../../utils/cn';
import { Image } from '../../components/ui/Image';
import { useAuth } from '../../contexts/AuthContext';
import type { AxiosError } from 'axios';

export const Register = () => {
  const [validating, setValidating] = useState(true);
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<RegistrationFormValues>({
    username: '',
    password: '',
    confirmPassword: '',
  });

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get('token');

  const { user, login, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const logoutActiveUser = async () => {
      await api.post('/auth/logout');
      logout();
    };

    if (token && user) logoutActiveUser();
  }, [user, logout, token]);

  useEffect(() => {
    if (!token) return;

    const validateToken = async () => {
      setError(null);

      try {
        const res = await api.get(`/auth/validate-registration-token?token=${token}`);

        setValidated(res.data.valid);
        setForm((prev) => ({ ...prev, username: res.data.email }));
      } catch (err) {
        console.error(err);
        setError('Error validating token.');
      } finally {
        setValidating(false);
      }
    };

    validateToken();
  }, [token]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (form.password !== form.confirmPassword) {
        setError('Passwords do not match.');
        return;
      }

      const data = { token, username: form.username, password: form.password };

      const res = await api.post('/auth/register', data);

      login(res.data.username, res.data.roleLevel);
      navigate('/portfolio');
    } catch (err: unknown) {
      console.error(err);

      let message = 'Something went wrong.';

      if ((err as AxiosError<{ error: string }>).isAxiosError) {
        const axiosErr = err as AxiosError<{ error: string }>;
        if (axiosErr.response?.data?.error === 'Username already exists.') {
          message = axiosErr.response.data.error;
        }
      }

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  if (!token) return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-24">
      <Image src="/logos/nwps-vertical-logo.svg" alt="NWPS Logo" className="h-42" />

      {validating ? (
        <div className="flex items-center gap-6 text-lg text-grey">
          Validating... <Loading />
        </div>
      ) : validated ? (
        <div className="flex flex-col items-center gap-4">
          <RegistrationForm form={form} setForm={setForm} handleSubmit={handleSubmit} loading={loading} error={error} />
          {error && <span className="text-[red]">{error}</span>}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-20">
          {error && <span className="text-[red]">{error}</span>}
          <div className="text-lg text-center space-y-4">
            <p>
              The registration link you used is no longer valid. It may have expired or already been used.
            </p>
            <p>If you need a new link, please contact the person who invited you.</p>
          </div>
          <Link
            to="/"
            className={cn(
              'p-2 bg-brand-blue hover:bg-brand-orange transition',
              'text-light font-bold rounded-lg active:scale-95 cursor-pointer',
              'w-80 text-center',
            )}
          >
            Home
          </Link>
        </div>
      )}
    </div>
  );
};
