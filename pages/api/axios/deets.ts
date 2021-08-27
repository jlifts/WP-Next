/* eslint-disable @typescript-eslint/restrict-template-expressions */
import axios from 'axios';

const base = process.env.NEXT_PUBLIC_WORDPRESS_URL;

export default axios.create({
  baseURL: `${base}/wp-json/deets/v1/posts`,
  headers: {
    'Content-type': 'application/json',
  },
});
