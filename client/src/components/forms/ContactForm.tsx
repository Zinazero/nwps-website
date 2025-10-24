import { cn } from '../../utils/cn';
import { Loading } from '../ui/Loading';
import { Message } from './components/Message';
import { ContactFieldSet } from './fieldsets/ContactFieldset';
import type { ContactFormValues } from './types';

interface ContactFormProps {
  form: ContactFormValues;
  setForm: React.Dispatch<React.SetStateAction<ContactFormValues>>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  loading: boolean;
}

export const ContactForm = ({ form, setForm, handleSubmit, loading }: ContactFormProps) => {
  const handleChange = (name: string, value: string) => {
    setForm({ ...form, [name]: value });
  };

  return (
    <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
      {/* Contact Info */}
      <ContactFieldSet form={form} onChange={handleChange} />

      {/* Message */}
      <Message form={form} onChange={handleChange} />

      {/* Hidden honeypot for spam */}
      <input
        type="text"
        name="website"
        autoComplete="off"
        tabIndex={-1}
        className="sr-only"
        aria-hidden="true"
      />

      {/* Submit */}
      {loading ? (
        <Loading />
      ) : (
        <button
          type="submit"
          className={cn(
            'p-2 bg-brand-orange hover:bg-brand-blue transition',
            'text-light font-bold rounded-lg active:scale-95 cursor-pointer',
          )}
        >
          Submit
        </button>
      )}
    </form>
  );
};
