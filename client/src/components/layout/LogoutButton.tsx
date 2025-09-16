import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import { useAuth } from '../../contexts/AuthContext';
import { scrollUp } from '../ui/ScrollToTop';

export const LogoutButton: React.FC<{ classes: string }> = ({ classes }) => {
	const { logout } = useAuth();
	const navigate = useNavigate();

	const handleLogout = async () => {
		try {
			await api.post('/auth/logout');
			logout();
			navigate('/');
            scrollUp();
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<button type='button' className={classes} onClick={handleLogout}>
			Logout
		</button>
	);
};
