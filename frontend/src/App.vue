<template>
  <div class="container">
    <h3>List of Clients</h3>

    <div>
      <div class="d-flex_align_center justify_between table_header">
        <h3 class="name">Clients</h3>

        <button class="btn primary" @click="addNewClient">New Clients</button>
      </div>
      <table class="clients_table">
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Providers</th>
          <th></th>
        </tr>
        <tr v-for="(client, index) in clients" :key="index">
          <td>{{ client.name }}</td>
          <td>{{ client.email }}</td>
          <td>{{ client.phone }}</td>
          <td>
            <div v-if="client.providers.length > 0">
              <span v-for="(provider, index) in client.providers" :key="index">
                {{ provider.name }}
              </span>
            </div>

            <span v-else>No providers</span>
          </td>
          <td>
            <button class="btn primary mr-15" @click="editClient(client)">
              Edit
            </button>
            <button class="btn danger" @click="deleteClient(client._id)">
              Delete
            </button>
          </td>
        </tr>
      </table>
    </div>

    <ClientsModal
      v-if="showModal"
      @closeModal="closeModal"
      :type="modalType"
      :client="clientDetails"
    />
  </div>
</template>

<script>
import clientService from '@/services/clients';
import ClientsModal from '@/components/ClientsModal';

export default {
  name: 'App',
  components: {
    ClientsModal,
  },
  data() {
    return {
      showModal: false,
      clients: [],
      clientDetails: {},
      modalType: 'add',
    };
  },
  created() {
    this.getClients();
  },
  methods: {
    getClients() {
      clientService
        .getClients()
        .then(response => {
          this.clients = response.data;
          console.log(this.clients);
        })
        .catch(errors => {
          console.log(errors);
        });
    },
    addNewClient() {
      this.modalType = 'add';
      this.showModal = true;
    },
    editClient(clientDetails) {
      this.clientDetails = clientDetails;
      this.modalType = 'edit';
      this.showModal = true;
    },
    deleteClient(clientId) {
      clientService
        .deleteClient(clientId)
        .then(() => this.getClients())
        .catch(errors => {
          console.log(errors);
        });
    },
    closeModal() {
      this.showModal = false;
      this.getClients();
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
}
.clients_table {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}
.table_header {
  background-color: rgb(236, 247, 240);
  padding: 10px;
}
.table_header .name {
  color: rgb(167, 171, 167);
}
.clients_table td,
.clients_table th {
  border: 1px solid #ddd;
  padding: 8px;
}

.clients_table tr:nth-child(even) {
  background-color: #f2f2f2;
}

.clients_table tr:hover {
  background-color: #ddd;
}

.clients_table th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #04aa6d;
  color: white;
}
</style>
