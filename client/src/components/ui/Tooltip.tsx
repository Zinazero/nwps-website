export interface TooltipProps {
  message: string;
  className?: string;
}

export const Tooltip: React.FC<TooltipProps> = ({ message, className }) => {
  return (
    <div
      className={`${className} rounded-2xl border border-transparent-grey shadow-lg p-4 hover-vis transition`}
    >
      <p className="text-brand-orange!">{message}</p>
    </div>
  );
};
