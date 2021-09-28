/* eslint-disable @typescript-eslint/restrict-template-expressions */
import axios from 'axios';

// Dev
// const base = process.env.NEXT_PUBLIC_WORDPRESS_URL;
// Staging
const base = process.env.NEXT_PUBLIC_WORDPRESS_URL_STAGING;

export default axios.create({
  baseURL: `${base}/wp-json/faqs/v1`,
  headers: {
    'Content-type': 'application/json',
  },
});
