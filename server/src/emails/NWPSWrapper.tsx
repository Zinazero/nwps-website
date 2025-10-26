import { Body, Container, Head, Html, Img, pixelBasedPreset, Tailwind } from '@react-email/components';
import type { ReactNode } from 'react';
import { getLogoSrc } from './utils/getImageSrc';

const NWPSWrapper = ({ children }: { children: ReactNode }) => (
  <Tailwind
    config={{
      presets: [pixelBasedPreset],
      theme: {
        extend: {
          colors: {
            brandorange: '#f15b31',
            brandblue: '#00589c',
            brandgreen: '#cdda29',
            light: '#f6f6f6',
            dark: '#282c31',
            white: '#ffffff',
          },
        },
      },
    }}
  >
    <Html>
      <Head />
      <Body className="bg-white text-dark font-sans">
        <Container className="bg-light text-center rounded-3xl overflow-hidden px-12 py-8 !my-10 mx-auto">
          <Img src={getLogoSrc()} alt="NWPS Logo" className="mx-auto" />
          {children}
        </Container>
      </Body>
    </Html>
  </Tailwind>
);

export default NWPSWrapper;
