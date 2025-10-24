import { useNavigate } from 'react-router-dom';

interface AddCardButtonProps {
  navigationRoute: string;
  className?: string;
}

export const AddCardButton = ({ navigationRoute, className }: AddCardButtonProps) => {
  const navigate = useNavigate();

  const classes = `
        ${className} border-1 border-dashed border-brand-green text-brand-green 
        hover:scale-105 active:scale-100 rounded-xl text-4xl transition
    `;

  return (
    <button type="button" onClick={() => navigate(navigationRoute)} className={classes}>
      +
    </button>
  );
};
