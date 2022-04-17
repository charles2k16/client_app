import apiService from './api';
import config from '../config';

export default {
  name: 'clientService',
  components: {
    apiService,
  },

  getClients() {
    return apiService
      .get(config.CLIENTS_URL)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },
  getClient(id) {
    let url = config.CLIENTS_URL + '/' + id;
    return apiService
      .get(url)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },
  addClient(clientData) {
    let url = config.CLIENTS_URL;
    return apiService
      .post(url, clientData)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },
  updateClient(clientData) {
    let url = config.CLIENTS_URL + '/' + clientData._id;
    return apiService
      .update(url, clientData)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },
  deleteClient(id) {
    let url = config.CLIENTS_URL + '/' + id;
    return apiService
      .delete(url)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },
};
