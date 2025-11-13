import { cn } from '../../../../utils/cn';
import { RequestQuoteButton } from '../../../ui/RequestQuoteButton';
import { VisitStoreButton } from '../../../ui/VisitStoreButton';

export const FooterContact = () => (
  <div
    className={cn(
      'flex flex-col border-transparent-grey px-8 pb-20 space-y-10',
      'md:w-1/4 md:border-l md:pb-0',
    )}
  >
    <div className={cn('flex flex-col items-center', 'md:inline')}>
      <h4 className="text-2xl font-semibold">CONTACT US</h4>
      <div className="w-10 border-b-2 border-brand-orange border-dotted mt-3"></div>
    </div>
    <div className="flex flex-col gap-4">
      <RequestQuoteButton />
      <VisitStoreButton />
    </div>
  </div>
);
