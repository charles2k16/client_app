import apiService from './api';
import config from '../config';

export default {
  name: 'providerService',
  components: {
    apiService,
  },

  getProviders() {
    return apiService
      .get(config.PROVIDERS_URL)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },
  getProvider(id) {
    let url = config.PROVIDERS_URL + '/' + id;
    return apiService
      .get(url)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },
  addProvider(providerData) {
    let url = config.PROVIDERS_URL;
    return apiService
      .post(url, providerData)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },
  updateProvider(providerData) {
    let url = config.PROVIDERS_URL + '/' + providerData.id;
    return apiService
      .update(url, providerData)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },
  deleteProvider(id) {
    let url = config.PROVIDERS_URL + '/' + id;
    return apiService
      .delete(url)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },
};
