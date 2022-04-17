<template>
  <div id="open-modal" class="modal-window">
    <div>
      <div class="modal_head">
        {{ title }}
      </div>
      <div class="d-flex justify-center mt-15">
        <form>
          <div class="d-flex mb-15">
            <label>Name:</label>
            <input type="text" v-model="clientData.name" />
          </div>
          <div class="d-flex mb-15">
            <label>Email:</label>
            <input type="text" v-model="clientData.email" />
          </div>
          <div class="d-flex mb-15">
            <label>Phone:</label>
            <input type="text" v-model="clientData.phone" />
          </div>

          <div class="d-flex mb-15">
            <label>Providers:</label>
            <input type="text" v-model="provider.name" class="mr-15" />
            <button class="btn warning" @click="addProvider">
              Add Provider
            </button>
          </div>

          <div class="providers_div">
            <div
              v-for="(provider, index) in providers"
              :key="index"
              class="d-flex_align_center justify_between"
            >
              <div>
                <input
                  class="mr-15"
                  type="checkbox"
                  :checked="checkedProviders.includes(provider._id)"
                  @change="selectProvider($event, provider._id)"
                />
                <span>{{ provider.name }}</span>
              </div>
              <div>
                <img
                  src="../assets/icon/edit.png"
                  alt="edit"
                  class="action_icon"
                  @click="editProvider(provider)"
                />
                <img
                  @click="deleteProvider(provider._id)"
                  src="@/assets/icon/delete.png"
                  alt="edit"
                  class="action_icon"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
      <div class="modal_footer d-flex_align_center justify_between">
        <button class="btn danger" v-if="type == 'edit'" @click="deleteClient">
          Delete</button
        >.
        <div style="d-flex justify_end">
          <button class="btn warning mr-15" @click="$emit('closeModal')">
            Cancel
          </button>
          <button class="btn warning" @click="saveClient">Save Client</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import providerService from '@/services/providers';
import clientService from '@/services/clients';

export default {
  name: 'ClientsModal',
  props: {
    client: {
      type: Object,
      required: true,
      default: () => ({
        id: '',
        name: '',
        email: '',
        phone: '',
        providers: [],
      }),
    },
    type: {
      type: String,
      required: true,
      default: 'add',
    },
  },
  data() {
    return {
      title: 'New Client',
      clientData: {
        name: '',
        email: '',
        phone: '',
        providers: [],
      },
      provider: {
        name: '',
      },
      providers: [],
      providerAction: 'add',
    };
  },
  computed: {
    checkedProviders() {
      if (this.clientData.providers.length > 0) {
        return this.clientData.providers.map(provider => provider._id);
      }
      return '';
    },
  },
  created() {
    if (this.type == 'edit') {
      this.clientData = this.client;
      this.title = 'Edit Client';
    }
    this.getProviders();
  },
  methods: {
    getProviders() {
      providerService
        .getProviders()
        .then(response => {
          this.providers = response.data;
        })
        .catch(errors => {
          console.log(errors);
        });
    },
    addProvider() {
      if (this.providerAction == 'edit') {
        providerService
          .updateProvider(this.provider)
          .then(() => {
            this.providerAction = 'add';
            this.provider = {
              name: '',
            };
            this.getProviders();
          })
          .catch(errors => {
            console.log(errors);
          });
      } else {
        providerService
          .addProvider(this.provider)
          .then(() => {
            this.getProviders();
            this.provider = {
              name: '',
            };
          })
          .catch(errors => {
            console.log(errors);
          });
      }
    },
    editProvider(provider) {
      this.provider = provider;
      this.providerAction = 'edit';
    },
    deleteProvider(providerId) {
      providerService
        .deleteProvider(providerId)
        .then(() => this.getProviders())
        .catch(errors => {
          console.log(errors);
        });
    },
    deleteClient() {
      clientService
        .deleteClient(this.clientData._id)
        .then(() => this.$emit('closeModal'))
        .catch(errors => {
          console.log(errors);
        });
    },
    saveClient() {
      if (this.type === 'add') {
        clientService
          .addClient(this.clientData)
          .then(() => this.$emit('closeModal'))
          .catch(errors => {
            console.log(errors);
          });
      } else {
        clientService
          .updateClient(this.clientData)
          .then(() => this.$emit('closeModal'))
          .catch(errors => {
            console.log(errors);
          });
      }
    },
    selectProvider(event, providerId) {
      if (event.target.checked) {
        this.clientData.providers.push(providerId);
      } else {
        this.clientData.providers.splice(
          this.clientData.providers.indexOf(providerId),
          1
        );
      }
    },
  },
};
</script>

<style scoped>
label {
  font-weight: bold;
}
.action_icon {
  width: 20px;
}
.modal-window {
  position: fixed;
  background-color: rgba(232, 224, 224, 0.25);
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
  visibility: visible;
  opacity: 1;
  pointer-events: auto;
  transition: all 0.3s;
}
.modal-window > div {
  max-width: 650px;
  border: 1px solid rgb(194, 191, 191);
  background: rgb(255, 255, 255);
  width: 90%;
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 1em 0;
  overflow-y: scroll;
  border-radius: 0.3rem;
}
.modal_head {
  color: rgb(46, 85, 184);
  height: 35px;
  font-size: 1.2em;
  font-weight: bold;
  padding-left: 10px;
  border-bottom: 1px solid rgb(218, 216, 216);
}
.modal_footer {
  border-top: 1px solid rgb(218, 216, 216);
  margin-top: 30px;
  padding: 15px 15px 5px 15px;
  height: 25px;
}
.providers_div {
  margin-left: 100px;
  width: 240px;
  padding: 5px 5px;
  border: 1px solid grey;
  border-radius: 3px;
}
</style>
