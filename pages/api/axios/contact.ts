/* eslint-disable @typescript-eslint/restrict-template-expressions */
import axios from 'axios';

const base = process.env.NEXT_PUBLIC_WORDPRESS_URL;
const form = process.env.NEXT_PUBLIC_FORM;

export default axios.create({
  baseURL: `${base}/wp-json/contact-form-7/v1/contact-forms/${form}`,
  headers: { 'Content-type': 'multipart/form-data' },
});
