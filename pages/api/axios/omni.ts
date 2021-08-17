/* eslint-disable @typescript-eslint/restrict-template-expressions */
import axios from 'axios';

const base = process.env.NEXT_PUBLIC_OMNI_API;
const KEY = process.env.NEXT_PUBLIC_OMNI_API_KEY;

export default axios.create({
  baseURL: `${base}`,
  headers: { 'Content-type': 'application/json', 'x-api-key': `${KEY}` },
});
