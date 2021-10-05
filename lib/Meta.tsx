/* eslint-disable no-param-reassign */
/* eslint-disable react/prop-types */
import React, { FunctionComponent } from 'react';

// TODO add Yoast Query

type MetaProps = {
  canonicalUrl?: string;
  siteDescription?: string;
  keywords?: string;
  icon?: string;
  description?: string;
  ogTitle?: string;
  ogType?: string;
  ogLocale?: string;
  ogDescription?: string;
  ogUrl?: string;
  ogSiteName?: string;
  ogImage?: string;
};

export const siteUrl = 'https://victishealth.com';

const Meta: FunctionComponent<MetaProps> = ({
  canonicalUrl = siteUrl,
  keywords = 'victis, victis health, health, wellness, cbd, therapuetic cream, cream, crossfit',
  icon = '/favicon.ico',
  description = 'Our natural, pharmaceutical-grade CBD products are developed with the highest quality standards and advanced science for 0% THC and effective pain relief.',
  ogTitle = 'Victis Health',
  ogType = 'website',
  ogLocale = 'en_US',
  ogDescription = 'Our natural, pharmaceutical-grade CBD products are developed with the highest quality standards and advanced science for 0% THC and effective pain relief.',
  ogUrl = siteUrl,
  ogSiteName = 'Victis Health',
  ogImage = '/favicon.ico',
  children,
}) => {
  ogImage = ogImage != null ? ogImage : '/images/Victis_White_clr.png';
  return (
    <>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="keywords" content={keywords} key="metakeywords" />

      <link rel="icon" href={icon} key="metaicon" />
      <link rel="canonical" href={canonicalUrl} key="metacanonical" />
      <meta
        name="robots"
        content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        key="metarobots"
      />
      <meta name="description" content={description} key="metadescription" />

      <meta property="og:title" content={ogTitle} key="ogtitle" />
      <meta property="og:type" content={ogType} key="ogtype" />
      <meta property="og:locale" content={ogLocale} key="oglocale" />
      <meta
        property="og:description"
        content={ogDescription}
        key="ogdescription"
      />
      <meta property="og:url" content={ogUrl} key="ogurl" />
      <meta property="og:site_name" content={ogSiteName} key="ogsitename" />
      <meta
        property="og:image"
        content={`${siteUrl}${ogImage}`}
        key="ogimage"
      />

      <meta
        name="twitter:card"
        content="summary_large_image"
        key="twittercard"
      />
      <meta name="twitter:site" content="@victis_health" key="twittersite" />
      <meta
        name="twitter:creator"
        content="@victis_health"
        key="twittercreator"
      />

      {children}
    </>
  );
};

export default Meta;
