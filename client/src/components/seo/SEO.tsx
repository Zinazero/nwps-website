interface SEOProps {
  title: string;
  description: string;
  pathname: string;
  image?: string;
  imageWidth?: number;
  imageHeight?: number;
  canonical?: string;
}

export const SEO = ({
  title,
  description,
  pathname,
  image = '/social/nwps-logo-social',
  imageWidth = 1200,
  imageHeight = 630,
  canonical,
}: SEOProps) => {
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical || `https://www.newworldparksolutions.ca/${pathname}`} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content={imageWidth.toString()} />
      <meta property="og:image:height" content={imageHeight.toString()} />
      <meta property="og:url" content={`https://www.newworldparksolutions.ca/${pathname}`} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="New World Park Solutions" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={title} />
    </>
  );
};
