import { faEnvelope, faHouse, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { cn } from '../../../utils/cn';

export const ContactBanner = () => {
  const address = 'Brantford, ON';
  const phoneNumber = '(519) 304-3437';
  const emailAddress = 'info@nwps.ca';

  const bubbleClasses = cn(
    'rounded-full w-20 h-20 bg-blue-washed flex',
    'items-center justify-center text-white text-2xl',
  );

  const colClasses = cn(
    'flex flex-col items-center text-center gap-4',
    '[&:not(:last-child)]:border-r border-dashed border-brand-orange',
  );

  const textContainerClasses = cn('space-y-2');
  const headerClasses = cn('text-white font-bold text-xl');
  const pClasses = cn('text-light!');

  return (
    <section className="w-full flex justify-center">
      <div className={cn('grid grid-cols-3 bg-brand-blue py-6 rounded-4xl w-250', 'shadow-lg')}>
        {/* Reach Us */}
        <div className={colClasses}>
          <div className={bubbleClasses}>
            <FontAwesomeIcon icon={faHouse} />
          </div>

          <div className={textContainerClasses}>
            <h3 className={headerClasses}>Reach Us</h3>
            <p className={pClasses}>{address}</p>
          </div>
        </div>

        {/* Call Us */}
        <div className={colClasses}>
          <div className={bubbleClasses}>
            <FontAwesomeIcon icon={faPhone} />
          </div>

          <div className={textContainerClasses}>
            <h3 className={headerClasses}>Call Us</h3>
            <p className={pClasses}>{phoneNumber}</p>
          </div>
        </div>

        {/* Email Us */}
        <div className={colClasses}>
          <div className={bubbleClasses}>
            <FontAwesomeIcon icon={faEnvelope} />
          </div>

          <div className={textContainerClasses}>
            <h3 className={headerClasses}>Email Us</h3>
            <p className={pClasses}>{emailAddress}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
