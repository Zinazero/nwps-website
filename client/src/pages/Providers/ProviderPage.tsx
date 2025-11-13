import { faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import api from '../../api/axios';
import { Image } from '../../components/ui/Image';
import { Loading } from '../../components/ui/Loading';
import { usePrerender } from '../../contexts/PrerenderContext';
import { cn } from '../../utils/cn';
import type { Provider } from '../types';

export const ProviderPage = () => {
  const { state } = useLocation();

  const { provider: slug } = useParams<{ provider: string }>();
  const prerenderData = usePrerender();
  const prProvider = prerenderData?.prProviders?.find((p) => p.slug === slug);
  const [provider, setProvider] = useState<Provider>(prProvider || state?.provider);
  const [loading, setLoading] = useState(!prProvider);

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
    <div className="min-h-screen flex flex-col items-center justify-center">
      {loading ? (
        <Loading />
      ) : (
        <div className="flex flex-col p-8 gap-16 max-w-350">
          {/* Hero */}
          <div className={cn('flex flex-col gap-x-12 gap-y-6', 'md:flex-row')}>
            <Image
              src={`/images/providers/${slug}/${slug}-1.jpg`}
              alt="Children playing in play structure"
              className="rounded-lg w-full"
              priority
            />
            <div className={cn('flex flex-col gap-8', 'md:max-w-2/5 md:gap-24')}>
              <div className={cn('flex flex-col-reverse gap-2 text-center', 'md:text-left')}>
                <h1 className="text-6xl font-bold">{provider.title}</h1>
                <h2 className="text-brand-blue">We can help make your playground dreams a reality.</h2>
              </div>
              <p className="text-2xl ">{provider.blurb}</p>
            </div>
          </div>

          {/* Links */}
          <div className={cn('flex flex-col-reverse items-center gap-8 text-center', 'md:flex-row')}>
            <a
              href={provider.externalLink}
              target="_blank"
              rel="noopener noreferrer"
              className="md:w-1/2"
              aria-label={`Visit ${provider.title}'s Website`}
            >
              <div
                className={cn(
                  'p-6 border rounded-lg space-x-2 text-xl font-semibold hover:scale-105',
                  'active:scale-100 transition',
                )}
              >
                <FontAwesomeIcon icon={faUpRightFromSquare} />
                <span>Visit Website</span>
              </div>
            </a>
            <Link
              to="/contact"
              className={cn(
                'p-6 bg-brand-blue hover:bg-brand-orange transition text-light rounded-lg',
                'text-xl font-semibold',
                'md:w-1/2',
              )}
            >
              I'M INTERESTED IN THIS PRODUCT
            </Link>
          </div>

          {/* Blurb */}
          <div className={cn('flex flex-col gap-4', 'md:mt-30')}>
            <h3 className={cn('text-4xl font-bold hidden', 'md:inline')}>{provider.title}</h3>
            <p className="text-xl/relaxed ">{provider.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};
