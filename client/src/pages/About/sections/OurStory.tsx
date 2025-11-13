import { UnderlineHeader } from '../../../components/ui/UnderlineHeader';
import { cn } from '../../../utils/cn';

export const OurStory = () => {
  return (
    <section>
      <div
        className="relative bg-cover bg-center"
        style={{ backgroundImage: 'url(/images/generic/our-story-image.jpg)' }}
      >
        <div className="text-light bg-black/70 py-10 space-y-12">
          <div className="max-w-350 mx-auto flex flex-col items-center text-center p-10 space-y-12">
            <div className="relative">
              <UnderlineHeader text="Our Story" level={3} fontColorClass="text-light" />
            </div>
            <p className={cn('text-xl/loose text-light!', 'md:w-2/3')}>
              {`New World Park Solutions is in our 18th year of business (est. 2008) 
                and looking forward to continuing the great relationships we
						    have developed with municipalities, school boards and landscape
						    architects throughout Ontario. We are pleased to be the exclusive
						    authorized dealer for Playworld, which is a recognized industry
						    leader having been in the play equipment manufacturing business
						    since 1971. Playworld strongly believes that play is for everyone,
						    regardless of ability. That’s why we make inclusion a priority—not
						    an option.`}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
