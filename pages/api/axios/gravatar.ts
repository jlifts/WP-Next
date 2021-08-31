import axios from 'axios';

const base = 'https://www.gravatar.com/avatar';

export default axios.create({
  baseURL: `${base}`,
  headers: {
    'Content-type': 'application/json',
  },
});
