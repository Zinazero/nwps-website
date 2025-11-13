interface HeroVideoProps {
  videoSrc: string;
  poster?: string;
  title: string;
  subtitle?: string;
  ctaText?: string;
  onCtaClick?: () => void;
}

export const HeroVideo: React.FC<HeroVideoProps> = ({
  videoSrc,
  poster,
  title,
  subtitle,
  ctaText,
  onCtaClick,
}) => {
  return (
    <section className="relative w-full h-full overflow-hidden">
      {/* Background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
        src={videoSrc}
        poster={poster}
        aria-hidden
      />

      {/* Dark overlay for contrast */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/50" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 text-white">
        <h1 className="text-5xl font-bold text-brand-orange">{title}</h1>
        {subtitle && <h2 className="mt-2 text-2xl text-gray-300">{subtitle}</h2>}
        {ctaText && (
          <button
            type="button"
            onClick={onCtaClick}
            className="mt-4 rounded-lg p-2 bg-brand-blue text-light font-semibold w-60 text-center hover:bg-brand-orange transition"
          >
            {ctaText}
          </button>
        )}
      </div>
    </section>
  );
};
