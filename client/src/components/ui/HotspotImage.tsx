import { faInfo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn';
import { Image } from './Image';

export const HotspotImage = () => {
  interface HotspotLink {
    slug: string;
    top: string;
    left: string;
    label: string;
  }

  const hotspotLinks: HotspotLink[] = [
    {
      slug: 'playgrounds',
      top: '18%',
      left: '38%',
      label: 'Playgrounds',
    },
    {
      slug: 'safety-surfacing',
      top: '58%',
      left: '69%',
      label: 'Safety Surfacing',
    },
    {
      slug: 'park-amenities',
      top: '89%',
      left: '30%',
      label: 'Park Amenities',
    },
  ];

  return (
    <div className="relative rounded-xl overflow-hidden shadow-lg">
      <Image
        src="/images/generic/products-image.jpg"
        alt="Playground with hotspots"
        className="w-full max-w-350 h-full object-cover relative z-10"
        priority
      />
      {hotspotLinks.map((link) => (
        <Link
          key={link.label}
          to={`/products/${link.slug}`}
          style={{ top: link.top, left: link.left }}
          className={cn(
            'absolute z-11 bg-brand-orange hover:bg-white hotspot',
            'hover:text-brand-orange transition p-2 rounded-4xl text-white',
          )}
        >
          <FontAwesomeIcon icon={faInfo} className="text-lg fa-icon" /> {link.label}
        </Link>
      ))}
    </div>
  );
};
