import { useId } from 'react';
import { cn } from '../../../utils/cn';
import type { MessageValue } from '../types';

interface MessageProps {
  form: MessageValue;
  onChange: <K extends keyof MessageValue>(name: K, value: MessageValue[K]) => void;
}

export const Message = ({ form, onChange }: MessageProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.name as keyof MessageValue, e.target.value);
  };

  const messageId = useId();

  return (
    <div className={cn('flex flex-col')}>
      <label htmlFor={messageId} className={cn('font-bold mb-1')}>
        Special requests or notes
      </label>
      <textarea rows={10} id={messageId} name="message" value={form.message} onChange={handleChange} />
    </div>
  );
};
