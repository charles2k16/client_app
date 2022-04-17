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
          <th class="d-flex_align_center">
            Name
            <img
              src="@/assets/icon/sort.png"
              alt="icon"
              class="sort_icon"
              @click="sortClients"
            />
          </th>
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
              <span
                v-for="(provider, index) in client.providers"
                :key="index"
                class="mr-10"
              >
                {{ provider.name }},
              </span>
            </div>

            <span v-else>No providers</span>
          </td>
          <td class="d-flex justify_end">
            <button class="btn warning mr-15" @click="editClient(client)">
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
      query: {},
    };
  },
  created() {
    this.getClients();
  },
  methods: {
    getClients() {
      clientService
        .getClients(this.query)
        .then(response => {
          this.clients = response.data;
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
    sortClients() {
      if (Object.keys(this.query).length === 0) {
        this.query.sort = '-1';
      } else {
        delete this.query.sort;
      }
      this.getClients();
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
  background-color: rgb(230, 241, 249);
  padding: 10px;
  height: 50px;
  border-top: 1px solid #ddd;
  border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;
}
.table_header .name {
  color: rgb(46, 85, 184);
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
  background-color: #e4e2e2;
  color: rgb(80, 78, 78);
}
.sort_icon {
  width: 15px;
  margin-left: 5px;
}
</style>
