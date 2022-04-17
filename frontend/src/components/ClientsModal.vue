<template>
  <div id="open-modal" class="modal-window">
    <div>
      <div class="modal_head">
        {{ title }}
      </div>
      <div>
        <form>
          <div class="d-flex">
            <label>Name:</label>
            <input type="text" v-model="clientData.name" />
          </div>
          <div class="d-flex">
            <label>Email:</label>
            <input type="text" v-model="clientData.email" />
          </div>
          <div class="d-flex">
            <label>Phone:</label>
            <input type="text" v-model="clientData.phone" />
          </div>

          <div class="d-flex">
            <label>Providers:</label>
            <input type="text" v-model="provider.name" />
            <button class="btn primary" @click="addProvider">
              Add Provider
            </button>
          </div>

          <div class="providers_div">
            <div v-for="(provider, index) in providers" :key="index">
              <input
                type="checkbox"
                :checked="checkedProviders.includes(provider._id)"
                @change="selectProvider($event, provider._id)"
              />
              <span>{{ provider.name }}</span>
              <img
                src="../assets/icon/edit.png"
                alt="edit"
                class="action_icon"
              />
              <img
                src="@/assets/icon/delete.png"
                alt="edit"
                class="action_icon"
              />
            </div>
          </div>
        </form>
      </div>
      <div class="modal_footer d-flex_align_center justify_between">
        <button class="btn danger">Delete</button>

        <div class="d-flex">
          <button class="btn primary mr-15" @click="$emit('closeModal')">
            Cancel
          </button>
          <button class="btn primary" @click="saveClient">Save Client</button>
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
      providerService
        .addProvider(this.provider)
        .then(() => console.log('gggg'))
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
  background-color: rgba(49, 37, 37, 0.25);
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
  border: 2px solid rgb(194, 191, 191);
  background: rgb(245, 239, 239);
  width: 90%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 1em 0;
  overflow-y: scroll;
  border-radius: 0.3rem;
}
.modal_head {
  height: 35px;
  font-size: 1.2em;
  font-weight: bold;
  padding-left: 10px;
  border-bottom: 1px solid rgb(218, 216, 216);
}
.modal-close {
  color: #b2483c;
  line-height: 50px;
  font-size: 80%;
  position: absolute;
  right: 0;
  text-align: center;
  top: 0;
  width: 70px;
  text-decoration: none;
  cursor: pointer;
}
</style>
