import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';
import type { Provider } from '../../pages/types';
import { chunkArray } from '../../utils/chunkArray';
import { cn } from '../../utils/cn';
import { useIsMobile } from '../../utils/useIsMobile';
import { ProviderBubble } from './ProviderBubble';

export const ProviderGallery = () => {
  const [providers, setProviders] = useState<Provider[]>([]);

  const isMobile = useIsMobile();

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const res = await api.get<Provider[]>('/providers');

        const providerArray = [];
        for (const provider of res.data) {
          const slug = provider.slug;
          const logo = `/images/providers/${slug}/${slug}-logo.jpg`;

          provider.logoSrc = logo;
          provider.slug = slug;
          providerArray.push(provider);
        }

        setProviders(providerArray);
      } catch (err) {
        console.error('Error fetching providers:', err);
      }
    };

    fetchProviders();
  }, []);

  const checkDirectLink = (provider: Provider) => {
    if (!provider || !provider.blurb || !provider.description) {
      return true;
    }

    return false;
  };

  const columnKey: Record<number, string> = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
  };

  const topRowLength = isMobile ? 2 : 4;
  const providerRows = chunkArray(providers, topRowLength);

  return (
    <div className="md:space-y-6">
      {providerRows.map((providerRow, i) => (
        <div
          key={`${providerRow[0].title} Row`}
          className={cn('grid', columnKey[providerRow.length], i % 2 === 0 ? 'md:gap-12' : 'mx-24')}
        >
          {providerRow.map((provider) =>
            checkDirectLink(provider) ? (
              <a key={provider.title} href={provider.externalLink} target="_blank" rel="noopener noreferrer">
                <ProviderBubble provider={provider} />
              </a>
            ) : (
              <Link key={provider.title} to={`/providers/${provider.slug}`} state={{ provider }}>
                <ProviderBubble provider={provider} />
              </Link>
            ),
          )}
        </div>
      ))}
    </div>
  );
};
