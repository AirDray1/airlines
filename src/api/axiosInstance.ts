import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://679d13f487618946e6544ccc.mockapi.io/testove/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});
