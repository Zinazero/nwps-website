import { faFacebookF, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { faEnvelopeOpen, faLocationArrow, faPhoneFlip } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { cn } from '../../../../utils/cn';
import { Image } from '../../../ui/Image';

export const FooterInfo = () => (
  <div className={cn('flex flex-col items-center px-8 pb-20 space-y-10', 'md:items-start md:w-1/4')}>
    <Image src="/logos/nwps-vertical-logo.svg" alt="NWPS Logo" className="h-42" />
    <div className={cn('flex flex-col items-center gap-6', 'md:items-start')}>
      <span>
        <FontAwesomeIcon icon={faLocationArrow} /> Brantford, ON
      </span>
      <span>
        <FontAwesomeIcon icon={faEnvelopeOpen} /> info@nwps.ca
      </span>
      <span>
        <FontAwesomeIcon icon={faPhoneFlip} /> {'(519) 304-3437'}
      </span>
      <div className="flex items-center text-lg space-x-2">
        <div className="relative group space-y-3">
          <a href="https://www.facebook.com/newworldparksolutions/" target="_blank" rel="noopener noreferrer" aria-label="Visit our Facebook page">
            <div className="rounded-lg bg-grey/30 p-1 hover:bg-brand-blue transition cursor-pointer">
              <FontAwesomeIcon icon={faFacebookF} className="" />
            </div>
          </a>
          <span className="mt-2 absolute top-full left-1/2 -translate-x-1/2 text-xs text-transparent-grey opacity-0 group-hover:opacity-100 transition">
            Facebook
          </span>
        </div>
        <div className="relative group space-y-3">
          <a
            href="https://www.instagram.com/newworldparksolutions/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit our Instagram page"
          >
            <div className="rounded-lg bg-grey/30 p-1 hover:bg-brand-blue transition cursor-pointer">
              <FontAwesomeIcon icon={faInstagram} className="" />
            </div>
          </a>
          <span className="mt-2 absolute top-full left-1/2 -translate-x-1/2 text-xs text-transparent-grey opacity-0 group-hover:opacity-100 transition">
            Instagram
          </span>
        </div>
        <div className="relative group space-y-3">
          <a
            href="https://www.linkedin.com/company/new-world-park-solutions-inc/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit our LinkedIn page"
          >
            <div className="rounded-lg bg-grey/30 p-1 hover:bg-brand-blue transition cursor-pointer">
              <FontAwesomeIcon icon={faLinkedinIn} className="" />
            </div>
          </a>
          <span className="mt-2 absolute top-full left-1/2 -translate-x-1/2 text-xs text-transparent-grey opacity-0 group-hover:opacity-100 transition">
            LinkedIn
          </span>
        </div>
      </div>
    </div>
  </div>
);
