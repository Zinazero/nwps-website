interface LoginFormProps {
	form: { username: string; password: string };
	setForm: React.Dispatch<
		React.SetStateAction<{ username: string; password: string }>
	>;
	handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

export const LoginForm: React.FC<LoginFormProps> = ({
	form,
	setForm,
	handleSubmit,
}) => {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	return (
		<form className='flex flex-col space-y-4 w-80' onSubmit={handleSubmit}>
			<input
				type='email'
				name='username'
				placeholder='Username'
				value={form.username}
				onChange={(e) => handleChange(e)}
				required
			/>
			<input
				type='password'
				name='password'
				placeholder='Password'
				value={form.password}
				onChange={(e) => handleChange(e)}
				required
			/>
			<button
				type='submit'
				className='p-2 bg-brand-orange hover:bg-brand-blue transition text-light font-bold rounded-lg active:scale-95 cursor-pointer'
			>
				Submit
			</button>
		</form>
	);
};
