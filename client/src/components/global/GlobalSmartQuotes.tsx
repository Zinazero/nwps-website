import { useEffect } from 'react';

export const GlobalSmartQuotes = () => {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;

      if (
        (target instanceof HTMLInputElement && target.type === 'text') ||
        target instanceof HTMLTextAreaElement
      ) {
        if (e.key === "'") {
          e.preventDefault();

          const start = target.selectionStart ?? 0;
          const end = target.selectionEnd ?? 0;

          const newValue = `${target.value.slice(0, start)}’${target.value.slice(end)}`;

          target.value = newValue;
          target.setSelectionRange(start + 1, start + 1);

          target.dispatchEvent(new Event('input', { bubbles: true }));
        }
      }
    };

    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  return null;
};
