import { cn } from '../../../../utils/cn';

export const FooterNewsletter = () => (
  <div
    className={cn(
      'flex flex-col border-transparent-grey px-8 pb-20 space-y-10',
      'md:w-1/4 md:border-l md:pb-0',
    )}
  >
    <div className={cn('flex flex-col items-center', 'md:inline')}>
      <h5 className="text-2xl font-semibold">NEWSLETTER</h5>
      <div className="w-10 border-b-2 border-brand-orange border-dotted mt-3"></div>
    </div>
    <span className={cn('text-lg text-center', 'md:text-left')}>
      Sign up for exclusive offers and the best deals.
    </span>
    <form className="space-y-4">
      <label className="flex flex-col text-transparent-grey">
        Email
        <input className="rounded-lg bg-white text-dark p-2 mt-1" />
      </label>
      <button
        type="submit"
        className="cursor-pointer rounded-lg bg-brand-blue hover:bg-brand-orange transition py-2 px-6 text-lg font-bold"
      >
        Submit
      </button>
    </form>
  </div>
);
