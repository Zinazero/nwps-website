import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

export const PageTransition = ({ children }: { children: ReactNode }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    {children}
  </motion.div>
);
