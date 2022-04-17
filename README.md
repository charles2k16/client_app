# Client Test App

A web app for CRUD-ing through clients and providers with a swagger docs

### Project setup

Once you clone the app from the repo,you will see two folders names **Api** & **Frontend**

The following steps below will assist you in running the app locally on your machine.

---

### Frontend

1. Navigae to frontend directory
 ```cd frontend```

2. Initialize git (Optional)
   ```git init```

3. Install packages
  ```npm i```

4. Build the project so you can serve your statis file to a dist folder. A dist folder should be created after a successfull build.
   ```npm run build```

> **Thats all for the frontend work, we will now head over to our api folder and follow the steps <span style="color: yellow">  1 - 3 above <span>**

After successfully installing your modules in the api project

#### Create an env file

You should create your own env file in the config folder and name the file config.env

> create a config.env file  <br> <span style="color: yellow"> config/config.env <span>

#### Content of env file

NODE_ENV=development
PORT=5000

MONGO_URL= mongodb://127.0.0.1:27017/testdb

---

If you do not have mongo db installed on your local machine, you can do so here See [Install MongoDB locally](https://www.mongodb.com/docs/guides/server/install/).

If you are all set, you can run the dev script to run your node server locally.

```npm run dev```

The server should be running on

> <http://127.0.0.1:5000>

#### Seed DB

If you wish to seed some data before hand for testing purposes. Run the seed command below to populate the db with clients and providers

```node seeder -i```

#### Swagger Docs

To access the docs, you can visit it here

> <http://127.0.0.1:5000/api-docs/#/>
