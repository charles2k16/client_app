import axios from 'axios';

export default {
  name: 'apiService',

  get(url, params = {}) {
    return axios
      .get(url, { params: params })
      .then(response => Promise.resolve(response.data))
      .catch(error => Promise.reject(error));
  },
  post(url, data) {
    return axios
      .post(url, data)
      .then(response => Promise.resolve(response.data))
      .catch(error => Promise.reject(error));
  },
  update(url, data) {
    return axios
      .put(url, data)
      .then(response => Promise.resolve(response.data))
      .catch(error => Promise.reject(error));
  },
  delete(url) {
    return axios
      .delete(url)
      .then(response => Promise.resolve(response.data))
      .catch(error => Promise.reject(error));
  },
};
