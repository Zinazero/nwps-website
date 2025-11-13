import { useNavigate } from 'react-router-dom';
import { Pen } from '../../../components/ui/Pen';
import { ProviderGallery } from '../../../components/ui/ProviderGallery';
import { useAuth } from '../../../contexts/AuthContext';

export const AuthorizedDistributor = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <section>
      <div className="flex flex-col items-center justify-center bg-white mt-10 p-8 gap-8">
        <div className="flex items-center space-x-4">
          <h3 className="text-5xl font-bold text-center text-brand-orange">Authorized Distributor</h3>
          {user?.isSu && <Pen onClick={() => navigate('/admin/add-provider')} />}
        </div>
        <ProviderGallery />
      </div>
    </section>
  );
};
