import type { PrerenderData } from '../prerender/types';

declare module '*.css';

declare module '*.svg' {
  const content: string;
  export default content;
}

declare global {
  interface Window {
    __PRERENDER_DATA__?: PrerenderData;
  }
}
