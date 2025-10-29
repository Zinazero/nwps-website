import { faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import api from '../../api/axios';
import { Image } from '../../components/ui/Image';
import { Loading } from '../../components/ui/Loading';
import type { Provider } from '../types';

export const ProviderPage = () => {
  const { state } = useLocation();
  const [provider, setProvider] = useState<Provider>(state?.provider);
  const [loading, setLoading] = useState(true);

  const { provider: slug } = useParams<{ provider: string }>();

  useEffect(() => {
    const fetchProvider = async () => {
      try {
        const res = await api.get(`/providers/${slug}`);
        setProvider(res.data);
      } catch (err) {
        console.error('Error fetching provider:', err);
      } finally {
        setLoading(false);
      }
    };

    if (!provider) {
      fetchProvider();
    } else {
      setLoading(false);
    }
  }, [slug, provider]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      {loading ? (
        <Loading />
      ) : (
        <div className="flex flex-col p-8 space-y-16 max-w-350">
          {/* Hero */}
          <div className="flex justify-between space-x-12">
            <Image
              src={`/images/providers/${slug}/${slug}-1.jpg`}
              alt="Children playing in play structure"
              className="rounded-lg h-120"
              priority
            />
            <div className="flex flex-col space-y-24 max-w-2/5">
              <div className="flex flex-col space-y-2">
                <span className="text-brand-blue">We can help make your playground dreams a reality.</span>
                <h1 className="text-6xl font-bold">{provider.title}</h1>
              </div>
              <p className="text-2xl ">{provider.blurb}</p>
            </div>
          </div>

          {/* Links */}
          <div className="flex items-center justify-between space-x-8 text-center">
            <a href={provider.externalLink} target="_blank" rel="noopener noreferrer" className="w-1/2">
              <div className="p-6 border rounded-lg space-x-2 text-xl font-semibold hover:scale-105 active:scale-100 transition">
                <FontAwesomeIcon icon={faUpRightFromSquare} />
                <span>Visit Website</span>
              </div>
            </a>
            <Link
              to="/contact"
              className="w-1/2 p-6 bg-brand-blue hover:bg-brand-orange transition text-light rounded-lg text-xl font-semibold"
            >
              I'M INTERESTED IN THIS PRODUCT
            </Link>
          </div>

          {/* Blurb */}
          <div className="flex flex-col space-y-4 mt-30">
            <h3 className="text-4xl font-bold">{provider.title}</h3>
            <p className="text-xl/relaxed ">{provider.description}</p>
          </div>
        </div>
      )}
    </main>
  );
};
