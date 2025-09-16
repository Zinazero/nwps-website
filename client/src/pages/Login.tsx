import { useState } from 'react';
import api from '../api/axios';
import { LoginForm } from '../components/forms/LoginForm';
import nwpsVerticalLogo from '@/assets/logos/nwps-vertical-logo.svg';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface LoginForm {
	username: string;
	password: string;
}

export const Login = () => {
	const [form, setForm] = useState<LoginForm>({
		username: '',
		password: '',
	});
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const { login } = useAuth();
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		setError(null);

		try {
			const res = await api.post('/auth/login', form);
			console.log('Login successful', res.data.username);

			login(res.data.username);
			navigate('/');
		} catch (err: any) {
			console.error(err);
			setError(err.response?.data?.error || 'Something went wrong');
		} finally {
			setLoading(false);
		}
	};

	return (
		<main className='min-h-screen flex items-center justify-center'>
			<div className='flex flex-col items-center space-y-24'>
				<img src={nwpsVerticalLogo} alt='NWPS Logo' className='h-42' />
				<LoginForm form={form} setForm={setForm} handleSubmit={handleSubmit} />
				<span className='text-[red]'>{error && error}</span>
			</div>
		</main>
	);
};
