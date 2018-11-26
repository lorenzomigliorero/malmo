import axios from 'axios';

export default ({
  headers,
  apiBaseUrl,
}) => {
  const instance = axios.create({
    baseURL: apiBaseUrl,
    headers: { common: headers },
  });

  return instance;
};
