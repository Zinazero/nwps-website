import { AnimatePresence, motion } from 'framer-motion';
import { type FormEvent, useState } from 'react';
import api from '../../api/axios';
import { Image } from '../../components/ui/Image';
import { Loading } from '../../components/ui/Loading';
import { cn } from '../../utils/cn';

export const SendInvite = () => {
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const data = { email };

    try {
      const res = await api.post('/auth/invite', data);

      setIsSuccess(res.data.success);
      setEmail('');
    } catch (err) {
      console.error(err);
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-24 h-100">
        <Image src="/logos/nwps-vertical-logo.svg" alt="NWPS Logo" className="h-42" />

        <AnimatePresence mode="wait">
          {isSuccess ? (
            <motion.div
              key="success-div"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-lg text-grey flex flex-col items-center gap-10"
            >
              Invite sent.
              <button
                type="button"
                onClick={() => setIsSuccess(false)}
                className={cn(
                  'p-2 bg-brand-blue hover:bg-brand-orange transition',
                  'text-light font-bold rounded-lg active:scale-95 cursor-pointer',
                  'w-80',
                )}
              >
                Send Another
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="invite-form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col gap-10 w-80"
              onSubmit={handleSubmit}
            >
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
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
                  Send Invite
                </button>
              )}
            </motion.form>
          )}
        </AnimatePresence>

        {/* Error Message */}
        {error && <span className="text-[red]">{error}</span>}
      </div>
    </div>
  );
};
