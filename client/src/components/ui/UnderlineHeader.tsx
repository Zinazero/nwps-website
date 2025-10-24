import innerPageHeaderArrow from '@/assets/icons/inner-page-header-arrow.png';
import { Image } from './Image';

interface UnderlineHeaderProps {
  text: string;
  fontColorClass?: string;
  withArrow?: boolean;
}

export const UnderlineHeader: React.FC<UnderlineHeaderProps> = ({
  text,
  fontColorClass = 'text-dark',
  withArrow = false,
}) => {
  return (
    <div className="flex flex-col items-center space-y-12">
      <div className="relative">
        <h1 className={`underline-header text-5xl font-bold ${fontColorClass}`}>{text}</h1>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 500 150"
          preserveAspectRatio="none"
          className="absolute top-1/2 -translate-y-1/2 mt-2"
        >
          <title>Orange swooping underline</title>
          <path d="M8.1,146.2c0,0,240.6-55.6,479-13.8" />
        </svg>
      </div>
      {withArrow && <Image src={innerPageHeaderArrow} alt="Spiral Arrow" />}
    </div>
  );
};
